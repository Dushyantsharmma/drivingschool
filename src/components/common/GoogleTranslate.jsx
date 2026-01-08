import React, { useEffect, useState } from "react";
import { Languages, ChevronDown, Check } from "lucide-react";

const GoogleTranslate = () => {
  const [selectedLang, setSelectedLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "hi", label: "Hindi", flag: "🇮🇳" },
  ];

  // 1. Initialize State from Cookie on Mount
  useEffect(() => {
    setIsMounted(true);
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const cookieValue = getCookie("googtrans");
    if (cookieValue) {
      // Cookie format is usually /auto/en or /en/hi
      const langCode = cookieValue.split("/").pop();
      if (langCode === "en" || langCode === "hi") {
        setSelectedLang(langCode);
      }
    }
  }, []);

  // 2. Load Google Translate Script
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Define the global callback if it doesn't exist
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // Check if script is already injected
    const existingScript = document.getElementById("google-translate-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      // If script exists, manually trigger init (rare edge case)
      window.googleTranslateElementInit();
    }
  }, []);

  // 3. Handle Language Change
  const changeLanguage = (langCode) => {
    setSelectedLang(langCode);
    setIsOpen(false);

    // Set cookies for Google Translate to pick up
    // We set it for both root path and domain to be safe
    const cookieValue = `/en/${langCode}`;
    
    document.cookie = `googtrans=${cookieValue}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

    // Force reload to apply translation
    window.location.reload();
  };

  // Prevent Hydration Mismatch
  if (!isMounted) return null;

  return (
    <div className="relative z-50">
      {/* Hidden Google Widget Container */}
      <div
        id="google_translate_element"
        className="absolute w-0 h-0 overflow-hidden"
        style={{ visibility: "hidden" }} 
        //  - conceptually hidden
      />

      {/* CSS to Hide Google's Top Banner & Tooltips */}
        <style>{`
          .goog-te-banner-frame.skiptranslate, #goog-gt-tt, .goog-te-balloon-frame, .goog-te-menu-frame, .goog-te-menu-value, .goog-te-gadget-icon, .goog-te-gadget-simple, .goog-te-gadget, body > .skiptranslate, html > body > .skiptranslate {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            width: 0 !important;
            min-height: 0 !important;
            min-width: 0 !important;
            max-height: 0 !important;
            max-width: 0 !important;
            overflow: hidden !important;
            position: absolute !important;
            top: -9999px !important;
            left: -9999px !important;
            z-index: -9999 !important;
          }
          html body { top: 0px !important; }
          .goog-tooltip { display: none !important; }
          .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
          /* Hide Google Translate top bar in all browsers */
          iframe.goog-te-banner-frame { display: none !important; }
          body { position: static !important; top: 0px !important; }
        `}</style>

      {/* Custom Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/10 text-slate-200 hover:text-white hover:bg-white/20 transition-all"
      >
        <Languages size={16} />
        <span className="text-sm font-medium">
            {languages.find((l) => l.code === selectedLang)?.label || "English"}
        </span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-[#0f172a] border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                  selectedLang === lang.code
                    ? "bg-amber-500/10 text-amber-500"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{lang.flag}</span>
                  {lang.label}
                </span>
                {selectedLang === lang.code && <Check size={14} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GoogleTranslate;