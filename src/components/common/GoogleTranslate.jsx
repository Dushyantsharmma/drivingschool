import { useEffect, useRef, useState } from 'react';

const GT_SCRIPT_ID = 'google-translate-script';

const readLangCookie = () => {
  const match = document.cookie.match(/googtrans=\/\w+\/(\w+)/);
  return match?.[1] || 'en';
};

const loadGoogleTranslateScript = () =>
  new Promise((resolve) => {
    if (document.getElementById(GT_SCRIPT_ID)) {
      resolve();
      return;
    }

    window.googleTranslateElementInit = () => resolve();

    const script = document.createElement('script');
    script.id = GT_SCRIPT_ID;
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  });

const GoogleTranslate = () => {
  const [lang, setLang] = useState('en');
  const selectRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      setLang(readLangCookie());

      await loadGoogleTranslateScript();
      if (cancelled) return;

      try {
        if (!document.querySelector('.goog-te-combo')) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,hi',
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }

        // Capture select safely
        const interval = setInterval(() => {
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            selectRef.current = select;
            clearInterval(interval);
          }
        }, 100);

        setTimeout(() => clearInterval(interval), 3000);
      } catch (e) {
        console.error('Google Translate init error', e);
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  // Sync language state with cookie
  useEffect(() => {
    const interval = setInterval(() => {
      const cookieLang = readLangCookie();
      if (cookieLang !== lang) {
        setLang(cookieLang);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [lang]);

  const setLanguage = (targetLang) => {
    if (lang === targetLang || !selectRef.current) return;

    selectRef.current.value = targetLang;
    selectRef.current.dispatchEvent(new Event('change'));
    setLang(targetLang);
  };

  return (
    <>
      {/* Language Toggle */}
      <div className="inline-flex rounded-full border border-slate-300 overflow-hidden text-sm font-medium">
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-1 transition ${
            lang === 'en'
              ? 'bg-slate-800 text-white'
              : 'bg-white text-slate-800'
          }`}
        >
          English
        </button>

        <button
          onClick={() => setLanguage('hi')}
          className={`px-4 py-1 transition ${
            lang === 'hi'
              ? 'bg-slate-800 text-white'
              : 'bg-white text-slate-800'
          }`}
        >
          हिन्दी
        </button>
      </div>

      {/* Hidden Google Translate Node */}
      <div id="google_translate_element" aria-hidden />

      {/* Google UI Kill Switch */}
      <style>{`
        .goog-te-banner-frame.skiptranslate,
        body > .skiptranslate,
        .goog-tooltip,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        .goog-logo-link,
        .goog-te-spinner-pos {
          display: none !important;
        }
        body { top: 0 !important; }
        #google_translate_element { display: none !important; }
        font { background: none !important; box-shadow: none !important; }
      `}</style>
    </>
  );
};

export default GoogleTranslate;
