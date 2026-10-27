"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Lock,
  Unlock,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Check,
  RotateCcw,
  Camera,
  Award,
  KeyRound,
  Download,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Certificate } from "@/data/defaultCertificates";

export default function AdminModal() {
  const {
    certificates,
    avatarUrl,
    isAuthenticated,
    isOwnerModalOpen,
    activeAdminTab,
    setIsOwnerModalOpen,
    setActiveAdminTab,
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
  } = usePortfolio();

  // Auth form state
  const [pinInput, setPinInput] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [authError, setAuthError] = useState(false);

  // New Certificate state
  const [newTitle, setNewTitle] = useState("");
  const [newIssuer, setNewIssuer] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [isUploadingCert, setIsUploadingCert] = useState(false);
  const [certSuccessMsg, setCertSuccessMsg] = useState("");

  // Edit Certificate state
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editIssuer, setEditIssuer] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);

  // Avatar state
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarSuccessMsg, setAvatarSuccessMsg] = useState("");

  // Settings state
  const [newPin, setNewPin] = useState("");
  const [pinSuccessMsg, setPinSuccessMsg] = useState("");

  const certFileInputRef = useRef<HTMLInputElement>(null);
  const editCertFileInputRef = useRef<HTMLInputElement>(null);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOwnerModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(pinInput);
    if (success) {
      setAuthError(false);
      setPinInput("");
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 3000);
    }
  };

  const handleCertFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertFile(file);
      const url = URL.createObjectURL(file);
      setNewImagePreview(url);
    }
  };

  const handleEditCertFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditFile(file);
      const url = URL.createObjectURL(file);
      setEditImagePreview(url);
    }
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newIssuer.trim()) return;

    setIsUploadingCert(true);
    try {
      let imageUrl = "/assets/cert_c_training.png";
      if (certFile) {
        imageUrl = await uploadMedia(certFile, "cert");
      } else if (newImagePreview) {
        imageUrl = newImagePreview;
      }

      await addCertificate({
        title: newTitle.trim(),
        issuer: newIssuer.trim(),
        date: newDate.trim() || new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
        image: imageUrl,
      });

      setNewTitle("");
      setNewIssuer("");
      setNewDate("");
      setNewImagePreview(null);
      setCertFile(null);
      setCertSuccessMsg("Certificate added successfully!");
      setTimeout(() => setCertSuccessMsg(""), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploadingCert(false);
    }
  };

  const startEditCert = (cert: Certificate) => {
    setEditingCertId(cert.id);
    setEditTitle(cert.title);
    setEditIssuer(cert.issuer);
    setEditDate(cert.date);
    setEditImagePreview(cert.image);
    setEditFile(null);
  };

  const handleSaveEditCert = async () => {
    if (!editingCertId) return;
    setIsUploadingCert(true);
    try {
      let imageUrl = editImagePreview || undefined;
      if (editFile) {
        imageUrl = await uploadMedia(editFile, "cert");
      }

      await updateCertificate(editingCertId, {
        title: editTitle.trim(),
        issuer: editIssuer.trim(),
        date: editDate.trim(),
        ...(imageUrl ? { image: imageUrl } : {}),
      });

      setEditingCertId(null);
      setCertSuccessMsg("Certificate updated successfully!");
      setTimeout(() => setCertSuccessMsg(""), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploadingCert(false);
    }
  };

  const handleSaveAvatar = async () => {
    if (!avatarFile && !avatarPreview) return;
    setIsUploadingAvatar(true);
    try {
      let finalUrl = avatarPreview || avatarUrl;
      if (avatarFile) {
        finalUrl = await uploadMedia(avatarFile, "avatar");
      }
      updateAvatar(finalUrl);
      setAvatarSuccessMsg("Profile photo updated successfully!");
      setTimeout(() => setAvatarSuccessMsg(""), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      changePin(newPin.trim());
      setNewPin("");
      setPinSuccessMsg("Owner PIN updated successfully!");
      setTimeout(() => setPinSuccessMsg(""), 3500);
    }
  };

  const exportCertificatesJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(certificates, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "dilip_certificates.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOwnerModalOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-[#09090b] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              {isAuthenticated ? <Unlock size={20} /> : <Lock size={20} />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Owner Control Portal
                {isAuthenticated && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20 font-medium">
                    Verified
                  </span>
                )}
              </h2>
              <p className="text-xs text-zinc-300">
                {isAuthenticated
                  ? "Manage certificates & update your profile photo"
                  : "Private access — edits are strictly reserved for Dilip"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <button
                onClick={logout}
                className="text-xs text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-1.5"
                title="Lock admin session"
              >
                <Lock size={14} />
                Lock
              </button>
            )}
            <button
              onClick={() => setIsOwnerModalOpen(false)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isAuthenticated ? (
            /* PIN Verification Form */
            <div className="py-12 flex flex-col items-center justify-center max-w-md mx-auto text-center">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                <Lock size={36} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Owner Authentication</h3>
              <p className="text-zinc-300 text-sm mb-8 leading-relaxed">
                To prevent unauthorized edits from public visitors, please enter your Owner PIN to unlock photo editing and certificate uploads.
              </p>

              <form onSubmit={handleLogin} className="w-full space-y-4">
                <div className="relative">
                  <input
                    type={showPin ? "text" : "password"}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Enter PIN (e.g. 1234 or dilip2026)"
                    className={`w-full bg-white/5 border ${
                      authError ? "border-red-500/80 ring-2 ring-red-500/30" : "border-white/15 focus:border-white/40"
                    } rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 text-center tracking-widest text-lg font-mono focus:outline-none transition-all`}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {authError && (
                  <p className="text-xs text-red-400 flex items-center justify-center gap-1.5 animate-shake">
                    <AlertCircle size={14} />
                    Incorrect PIN. Try 1234 or dilip2026.
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-black bg-white hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Unlock size={18} />
                  Unlock Owner Controls
                </button>
              </form>

              <div className="mt-8 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-400">
                <span className="text-white font-medium">Tip:</span> Default owner PIN is <code className="text-white bg-white/10 px-1.5 py-0.5 rounded font-mono">1234</code> or <code className="text-white bg-white/10 px-1.5 py-0.5 rounded font-mono">dilip2026</code>. You can change this in settings after unlocking.
              </div>
            </div>
          ) : (
            /* Authenticated Admin Interface */
            <div>
              {/* Navigation Tabs */}
              <div className="flex border-b border-white/10 mb-6 gap-2">
                <button
                  onClick={() => setActiveAdminTab("certificates")}
                  className={`pb-3 px-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-all ${
                    activeAdminTab === "certificates"
                      ? "border-white text-white"
                      : "border-transparent text-zinc-400 hover:text-white"
                  }`}
                >
                  <Award size={18} />
                  Certificates ({certificates.length})
                </button>
                <button
                  onClick={() => setActiveAdminTab("avatar")}
                  className={`pb-3 px-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-all ${
                    activeAdminTab === "avatar"
                      ? "border-white text-white"
                      : "border-transparent text-zinc-400 hover:text-white"
                  }`}
                >
                  <Camera size={18} />
                  Edit Profile Photo
                </button>
                <button
                  onClick={() => setActiveAdminTab("settings")}
                  className={`pb-3 px-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-all ${
                    activeAdminTab === "settings"
                      ? "border-white text-white"
                      : "border-transparent text-zinc-400 hover:text-white"
                  }`}
                >
                  <KeyRound size={18} />
                  Security & Settings
                </button>
              </div>

              {/* TAB 1: CERTIFICATES */}
              {activeAdminTab === "certificates" && (
                <div className="space-y-8">
                  {certSuccessMsg && (
                    <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm flex items-center gap-2">
                      <Check size={18} />
                      {certSuccessMsg}
                    </div>
                  )}

                  {/* Upload / Add New Certificate Box */}
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Plus size={20} />
                      Upload New Certificate
                    </h3>

                    <form onSubmit={handleAddCertificate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Certificate Image File Picker */}
                        <div className="space-y-2">
                          <label className="block text-xs font-medium text-zinc-300">
                            Certificate Image (PNG, JPG, WebP)
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            ref={certFileInputRef}
                            onChange={handleCertFileChange}
                            className="hidden"
                          />

                          <div
                            onClick={() => certFileInputRef.current?.click()}
                            className="border-2 border-dashed border-white/15 hover:border-white/40 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] transition-all min-h-[140px] text-center"
                          >
                            {newImagePreview ? (
                              <div className="relative w-full h-28">
                                <Image
                                  src={newImagePreview}
                                  alt="Preview"
                                  fill
                                  unoptimized
                                  className="object-contain"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center space-y-2">
                                <Upload size={24} className="text-zinc-400" />
                                <span className="text-xs text-white font-medium">Click to choose image file</span>
                                <span className="text-[10px] text-zinc-400">or drag and drop here</span>
                              </div>
                            )}
                          </div>
                          {newImagePreview && (
                            <button
                              type="button"
                              onClick={() => {
                                setNewImagePreview(null);
                                setCertFile(null);
                              }}
                              className="text-xs text-zinc-400 hover:text-white underline"
                            >
                              Clear selected image
                            </button>
                          )}
                        </div>

                        {/* Title, Issuer, Date */}
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-zinc-300 mb-1">
                              Certificate Title *
                            </label>
                            <input
                              type="text"
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              placeholder="e.g. AWS Certified Solutions Architect"
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-zinc-300 mb-1">
                              Issuer / Organization *
                            </label>
                            <input
                              type="text"
                              value={newIssuer}
                              onChange={(e) => setNewIssuer(e.target.value)}
                              placeholder="e.g. Amazon Web Services, IIT Bombay"
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-zinc-300 mb-1">
                              Completion Date (e.g. March 2026)
                            </label>
                            <input
                              type="text"
                              value={newDate}
                              onChange={(e) => setNewDate(e.target.value)}
                              placeholder="e.g. March 2026"
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          disabled={isUploadingCert || !newTitle.trim()}
                          className="px-5 py-2.5 rounded-xl font-semibold text-black bg-white hover:bg-zinc-200 transition-all text-sm flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-md"
                        >
                          <Plus size={16} />
                          {isUploadingCert ? "Uploading..." : "Save Certificate"}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* List of Existing Certificates */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-white">
                        Existing Certificates ({certificates.length})
                      </h3>
                      <button
                        onClick={resetCertificates}
                        className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                        title="Restore original default certificates"
                      >
                        <RotateCcw size={12} />
                        Reset to Defaults
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {certificates.map((cert) => {
                        const isEditing = editingCertId === cert.id;

                        return (
                          <div
                            key={cert.id}
                            className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                          >
                            {isEditing ? (
                              /* Inline Edit Form */
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-[11px] text-zinc-300 mb-1">Title</label>
                                  <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] text-zinc-300 mb-1">Issuer</label>
                                  <input
                                    type="text"
                                    value={editIssuer}
                                    onChange={(e) => setEditIssuer(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] text-zinc-300 mb-1">Date</label>
                                  <input
                                    type="text"
                                    value={editDate}
                                    onChange={(e) => setEditDate(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                                  />
                                </div>

                                <div>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    ref={editCertFileInputRef}
                                    onChange={handleEditCertFileChange}
                                    className="hidden"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => editCertFileInputRef.current?.click()}
                                    className="text-xs text-zinc-300 hover:text-white underline"
                                  >
                                    Replace Certificate Image
                                  </button>
                                </div>

                                <div className="flex gap-2 pt-2">
                                  <button
                                    type="button"
                                    onClick={handleSaveEditCert}
                                    className="px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingCertId(null)}
                                    className="px-3 py-1.5 rounded-lg border border-white/10 text-zinc-300 text-xs hover:text-white"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              /* Standard View */
                              <div className="flex items-start gap-4">
                                <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-black/40 border border-white/10 flex-shrink-0">
                                  <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    fill
                                    unoptimized
                                    className="object-contain"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-bold text-white truncate">{cert.title}</h4>
                                  <p className="text-xs text-zinc-300 truncate">{cert.issuer}</p>
                                  <p className="text-[11px] text-zinc-400 mt-0.5">{cert.date}</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={() => startEditCert(cert)}
                                    className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                                    title="Edit certificate details"
                                  >
                                    <Edit2 size={15} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (confirm(`Delete certificate "${cert.title}"?`)) {
                                        deleteCertificate(cert.id);
                                      }
                                    }}
                                    className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                                    title="Delete certificate"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROFILE PHOTO */}
              {activeAdminTab === "avatar" && (
                <div className="space-y-8 max-w-xl mx-auto py-4">
                  {avatarSuccessMsg && (
                    <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm flex items-center gap-2">
                      <Check size={18} />
                      {avatarSuccessMsg}
                    </div>
                  )}

                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative w-44 h-44 rounded-full p-2 bg-gradient-to-tr from-zinc-700 via-white/40 to-zinc-700 shadow-2xl">
                      <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                        <Image
                          src={avatarPreview || avatarUrl}
                          alt="Dilip Profile Photo"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => avatarFileInputRef.current?.click()}
                        className="absolute bottom-2 right-2 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-zinc-200 transition-all cursor-pointer"
                        title="Upload new photo"
                      >
                        <Camera size={20} />
                      </button>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      ref={avatarFileInputRef}
                      onChange={handleAvatarFileChange}
                      className="hidden"
                    />

                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">Update Profile Photo</h4>
                      <p className="text-xs text-zinc-300 max-w-md">
                        Upload a photo from your computer. It will immediately update the main Hero section on your portfolio.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                      <button
                        type="button"
                        onClick={() => avatarFileInputRef.current?.click()}
                        className="px-5 py-2.5 rounded-xl font-medium text-sm bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all flex items-center gap-2"
                      >
                        <Upload size={16} />
                        Choose Photo
                      </button>

                      {avatarPreview && (
                        <button
                          type="button"
                          onClick={handleSaveAvatar}
                          disabled={isUploadingAvatar}
                          className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-white text-black hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
                        >
                          <Check size={16} />
                          {isUploadingAvatar ? "Saving..." : "Apply & Save Photo"}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={resetAvatar}
                        className="px-4 py-2.5 rounded-xl font-medium text-sm text-zinc-400 hover:text-white border border-white/5 hover:border-white/15 transition-all flex items-center gap-1.5"
                      >
                        <RotateCcw size={15} />
                        Reset Default
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SETTINGS & SECURITY */}
              {activeAdminTab === "settings" && (
                <div className="space-y-6 max-w-lg mx-auto py-4">
                  {pinSuccessMsg && (
                    <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm flex items-center gap-2">
                      <Check size={18} />
                      {pinSuccessMsg}
                    </div>
                  )}

                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <KeyRound size={18} />
                      Change Owner PIN
                    </h3>
                    <p className="text-xs text-zinc-300">
                      Update the PIN code used to access this Owner Control Portal.
                    </p>

                    <form onSubmit={handleUpdatePin} className="space-y-3">
                      <input
                        type="text"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        placeholder="Enter new 4+ digit PIN"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 font-mono"
                      />
                      <button
                        type="submit"
                        disabled={newPin.trim().length < 4}
                        className="px-5 py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all disabled:opacity-50"
                      >
                        Update PIN
                      </button>
                    </form>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Download size={18} />
                      Backup & Export
                    </h3>
                    <p className="text-xs text-zinc-300">
                      Download your current certificates data as a JSON file backup.
                    </p>
                    <button
                      onClick={exportCertificatesJson}
                      className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center gap-2 transition-all"
                    >
                      <Download size={15} />
                      Download Certificates JSON
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
