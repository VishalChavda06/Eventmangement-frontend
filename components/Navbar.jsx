"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

  const isActive = (href) => pathname === href;

  const syncAuthState = () => {
    if (typeof window === "undefined") return;
    const token = window.localStorage.getItem("token");
    const user = window.localStorage.getItem("user");
    setAuth(Boolean(token));
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setUserName(parsed.name || parsed.email || "");
        setProfileData(parsed);
      } catch {
        setUserName("");
        setProfileData(null);
      }
    } else {
      setUserName("");
      setProfileData(null);
    }
  };

  useEffect(() => {
    syncAuthState();
    const handleStorage = () => syncAuthState();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("local-storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("local-storage", handleStorage);
    };
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      document.cookie = "authToken=; path=/; max-age=0";
      window.dispatchEvent(new Event("local-storage"));
      setAuth(false);
      setUserName("");
      setProfileData(null);
      router.push("/");
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfileData((prev) => ({ ...prev, profileImage: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!profileData) return;
    const token = typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
    setSavingProfile(true);
    setProfileMessage("");
    try {
      if (token) {
        const profilePayload = { ...profileData };

        if (typeof profilePayload.profileImage === "string" && profilePayload.profileImage.startsWith("data:")) {
          const uploadResponse = await fetch("http://localhost:9090/api/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ image: profilePayload.profileImage }),
          });
          const uploadData = await uploadResponse.json();
          if (!uploadResponse.ok) {
            throw new Error(uploadData.message || "Image upload failed");
          }
          profilePayload.profileImage = uploadData.data.url;
        }

        const response = await fetch("http://localhost:9090/api/auth/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profilePayload),
        });
        const data = await response.json();
        const saved = data.data ?? data.user ?? profilePayload;
        window.localStorage.setItem("user", JSON.stringify(saved));
        setProfileData(saved);
        setUserName(saved.name || saved.email || "");
        setProfileMessage("Profile updated successfully.");
        window.dispatchEvent(new Event("local-storage"));
      }
    } catch (error) {
      setProfileMessage("Unable to save profile right now.");
    } finally {
      setSavingProfile(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#e7e5e4] shadow-sm">
      <div className="container-max flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="font-playfair text-2xl font-bold text-[#0f172a] hover:text-[#b8960c] transition-colors duration-200">
          Eventra
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-source font-medium transition-all duration-200 pb-1 border-b-2 ${
                isActive(link.href)
                  ? "text-[#b8960c] border-[#b8960c]"
                  : "text-gray-700 border-transparent hover:text-[#b8960c] hover:border-[#b8960c]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex gap-4 items-center relative">
          {auth ? (
            <>
              {userName && <span className="font-source text-sm text-gray-700">Hello, {userName}</span>}
              {profileData?.role === "organizer" && (
                <Link href="/organizer/create-event" className="btn-primary">
                  Create Event
                </Link>
              )}
              {profileData?.role === "admin" && (
                <Link href="/admin" className="btn-primary">
                  Admin Panel
                </Link>
              )}
              <button onClick={() => setProfileOpen((prev) => !prev)} className="btn-outline">
                Profile
              </button>
              <button onClick={handleLogout} className="btn-outline">
                Logout
              </button>
              {profileOpen && profileData && (
                <div className="absolute right-0 top-full mt-3 w-80 rounded-lg border border-[#e7e5e4] bg-white p-4 shadow-lg z-50">
                  <h4 className="font-semibold mb-3">Profile</h4>
                  <form onSubmit={handleProfileSave} className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Full name</label>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name || ""}
                        onChange={handleProfileChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={profileData.phone || ""}
                        onChange={handleProfileChange}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Profile image</label>
                      <input type="file" accept="image/*" onChange={handleProfileImage} />
                    </div>
                    {profileData.profileImage && (
                      <div className="relative w-20 h-20 rounded-full overflow-hidden">
                        <img src={profileData.profileImage} alt="avatar" className="object-cover w-full h-full" />
                      </div>
                    )}
                    {profileMessage && <p className="text-sm text-green-600">{profileMessage}</p>}
                    <button type="submit" className="btn-primary w-full" disabled={savingProfile}>
                      {savingProfile ? "Saving..." : "Save profile"}
                    </button>
                  </form>
                </div>
              )}
            </>
          ) : (
            <>
              <Link href="/login" className="btn-outline">
                Login
              </Link>
              <Link href="/register" className="btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#0f172a]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-[#e7e5e4] md:hidden">
            <div className="container-max flex flex-col gap-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-source font-medium ${
                    isActive(link.href) ? "text-[#b8960c]" : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {auth ? (
                <>
                  {userName && <div className="font-source text-sm text-gray-700">Hello, {userName}</div>}
                  {profileData?.role === "organizer" && (
                    <Link href="/organizer/create-event" className="btn-primary text-center" onClick={() => setIsMenuOpen(false)}>
                      Create Event
                    </Link>
                  )}
                  {profileData?.role === "admin" && (
                    <Link href="/admin" className="btn-primary text-center" onClick={() => setIsMenuOpen(false)}>
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={() => { setProfileOpen((prev) => !prev); setIsMenuOpen(false); }} className="btn-outline text-center">
                    Profile
                  </button>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="btn-outline text-center">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn-outline text-center">
                    Login
                  </Link>
                  <Link href="/register" className="btn-primary text-center">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
