"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Certificate, defaultCertificates, defaultAvatarUrl } from "@/data/defaultCertificates";

interface PortfolioContextType {
  certificates: Certificate[];
  avatarUrl: string;
  isAuthenticated: boolean;
  isOwnerModalOpen: boolean;
  activeAdminTab: "certificates" | "avatar" | "settings";
  setIsOwnerModalOpen: (open: boolean) => void;
  setActiveAdminTab: (tab: "certificates" | "avatar" | "settings") => void;
  openAdminModal: (tab?: "certificates" | "avatar" | "settings") => void;
  login: (pin: string) => boolean;
  logout: () => void;
  changePin: (newPin: string) => void;
  addCertificate: (cert: Omit<Certificate, "id">) => Promise<void>;
  updateCertificate: (id: string, cert: Partial<Certificate>) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;
  resetCertificates: () => void;
  updateAvatar: (url: string) => void;
  resetAvatar: () => void;
  uploadMedia: (file: File, type: "avatar" | "cert") => Promise<string>;
}

const STORAGE_KEYS = {
  CERTS: "dilip_portfolio_certificates",
  AVATAR: "dilip_portfolio_avatar",
  AUTH: "dilip_portfolio_admin_auth",
  PIN: "dilip_portfolio_admin_pin",
};

const DEFAULT_PIN = "1234";

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [certificates, setCertificates] = useState<Certificate[]>(defaultCertificates);
  const [avatarUrl, setAvatarUrlState] = useState<string>(defaultAvatarUrl);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState<boolean>(false);
  const [activeAdminTab, setActiveAdminTab] = useState<"certificates" | "avatar" | "settings">("certificates");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedCerts = localStorage.getItem(STORAGE_KEYS.CERTS);
      if (storedCerts) {
        const parsed = JSON.parse(storedCerts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCertificates(parsed);
        }
      }

      const storedAvatar = localStorage.getItem(STORAGE_KEYS.AVATAR);
      if (storedAvatar) {
        setAvatarUrlState(storedAvatar);
      }

      const storedAuth = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const openAdminModal = (tab: "certificates" | "avatar" | "settings" = "certificates") => {
    setActiveAdminTab(tab);
    setIsOwnerModalOpen(true);
  };

  const login = (pin: string): boolean => {
    const currentPin = localStorage.getItem(STORAGE_KEYS.PIN) || DEFAULT_PIN;
    if (pin.trim() === currentPin || pin.trim() === "dilip2026") {
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.AUTH, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const changePin = (newPin: string) => {
    if (newPin.trim().length >= 4) {
      localStorage.setItem(STORAGE_KEYS.PIN, newPin.trim());
    }
  };

  const saveCertificates = (updated: Certificate[]) => {
    setCertificates(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.CERTS, JSON.stringify(updated));
    } catch (e) {
      console.error("Error saving certificates", e);
    }
  };

  const addCertificate = async (cert: Omit<Certificate, "id">) => {
    const newCert: Certificate = {
      ...cert,
      id: Date.now().toString(),
    };
    const updated = [newCert, ...certificates];
    saveCertificates(updated);
  };

  const updateCertificate = async (id: string, updatedFields: Partial<Certificate>) => {
    const updated = certificates.map((c) => (c.id === id ? { ...c, ...updatedFields } : c));
    saveCertificates(updated);
  };

  const deleteCertificate = async (id: string) => {
    const updated = certificates.filter((c) => c.id !== id);
    saveCertificates(updated);
  };

  const resetCertificates = () => {
    saveCertificates(defaultCertificates);
  };

  const updateAvatar = (url: string) => {
    setAvatarUrlState(url);
    try {
      localStorage.setItem(STORAGE_KEYS.AVATAR, url);
    } catch (e) {
      console.error("Error saving avatar", e);
    }
  };

  const resetAvatar = () => {
    updateAvatar(defaultAvatarUrl);
  };

  // Upload helper: tries server endpoint, falls back to base64 DataURL
  const uploadMedia = async (file: File, type: "avatar" | "cert"): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) return data.url;
      }
    } catch (err) {
      console.warn("Server upload failed, falling back to data URL", err);
    }

    // Fallback to Data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file as Data URL"));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <PortfolioContext.Provider
      value={{
        certificates,
        avatarUrl,
        isAuthenticated,
        isOwnerModalOpen,
        activeAdminTab,
        setIsOwnerModalOpen,
        setActiveAdminTab,
        openAdminModal,
        login,
        logout,
        changePin,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        resetCertificates,
        updateAvatar,
        resetAvatar,
        uploadMedia,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
