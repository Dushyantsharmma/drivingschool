import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Printer,
  Maximize2,
  X,
  AlertTriangle,
  Ban,
  Info,
  FileText
} from "lucide-react";
import SEO from "./SEO";

/* =====================
  DATA (Auto-loaded from /public/symbols)
===================== */

const ROAD_SIGN_SECTIONS = [
  {
    key: "mandatory",
    title: "Mandatory Signs",
    icon: Ban,
    color: "text-red-600",
    description:
      "These road signals and signs are used to make road users aware of specific laws. Mandatory signs, as the name implies, give orders that must be obeyed to prevent legal action.",
  },
  {
    key: "cautionary",
    title: "Cautionary Signs",
    icon: AlertTriangle,
    color: "text-amber-600",
    description:
      "These traffic and road safety signs are used to warn road users about potential dangers or safety hazards on the road. This gives the driver enough time to take the necessary steps and handle emerging situations.",
  },
  {
    key: "informatory",
    title: "Informatory Signs",
    icon: Info,
    color: "text-blue-600",
    description:
      "Informatory road signs are used to provide important information. These signs are meant to provide information on direction, destination, roadside facilities, etc. to the road user. Following informative road signs helps a driver in saving time, reaching destination without wandering around. These signs are generally facilitators to the driver.",
  },
];

const sortByFilename = (a, b) => {
  const aNum = a.number ?? Number.POSITIVE_INFINITY;
  const bNum = b.number ?? Number.POSITIVE_INFINITY;
  if (aNum !== bNum) return aNum - bNum;
  return a.file.localeCompare(b.file);
};

const ROAD_SIGN_META = {
  mandatory: {
    1: { name: "No Entry", desc: "Restricted area ahead; do not enter." },
    2: { name: "One Way", desc: "Traffic is allowed only in the indicated direction." },
    3: { name: "One Way", desc: "Oncoming entry is restricted; follow the permitted direction." },
    4: {
      name: "Vehicles prohibited in both directions",
      desc: "No vehicle movement is allowed beyond this point.",
    },
    5: { name: "All motor vehicles prohibited", desc: "No motor vehicles are allowed." },
    6: {
      name: "Truck prohibited",
      desc: "Trucks / heavy motor vehicles are not allowed.",
    },
    7: {
      name: "Bullock & hand cart prohibited",
      desc: "Bullock carts and hand carts are not allowed.",
    },
    8: { name: "Bullock cart prohibited", desc: "Bullock carts are not allowed." },
    9: { name: "Tongas prohibited", desc: "Tongas / horse carts are not allowed." },
    10: { name: "Hand cart prohibited", desc: "Hand carts are not allowed." },
    11: { name: "Cycle prohibited", desc: "Cycles are not allowed." },
    12: { name: "Pedestrians prohibited", desc: "Pedestrian movement is not allowed." },
    13: { name: "Right turn prohibited", desc: "Turning right is not allowed." },
    14: { name: "Left turn prohibited", desc: "Turning left is not allowed." },
    15: { name: "U-turn prohibited", desc: "U-turns are not allowed at this point." },
    16: { name: "Overtaking prohibited", desc: "Overtaking is not allowed here." },
    17: { name: "Horn prohibited", desc: "Silence zone; do not use horn." },
    18: { name: "No parking", desc: "Parking is not allowed; vehicles may be towed." },
    19: { name: "Speed limit", desc: "Do not exceed the speed shown on the sign." },
    20: {
      name: "No stopping or standing",
      desc: "Stopping / waiting is not allowed to keep traffic flowing.",
    },
    21: { name: "Load limit", desc: "Vehicles above the specified load are not permitted." },
    22: {
      name: "Restriction end sign",
      desc: "The earlier restriction ends from this point onward.",
    },
    23: { name: "Compulsory left turn", desc: "You must turn left (often due to diversion)." },
    24: { name: "Compulsory turn right ahead", desc: "You must turn right ahead." },
    25: { name: "Compulsory ahead only", desc: "Go straight only; no left or right turn." },
    26: { name: "Compulsory ahead or turn right", desc: "Go straight or turn right." },
    27: { name: "Compulsory ahead or turn left", desc: "Go straight or turn left." },
    28: { name: "Compulsory keep left", desc: "Keep to the left lane / side." },
    29: { name: "Compulsory cycle track", desc: "Lane/track is meant for cycles only." },
    30: { name: "Compulsory sound horn", desc: "Blowing horn is compulsory at this point." },
    31: { name: "Stop", desc: "Come to a complete stop here." },
    32: { name: "Give Way", desc: "Give priority to the traffic on the main road." },
  },
  cautionary: {
    1: { name: "Right hand curve", desc: "Right curve ahead; slow down." },
    2: { name: "Left hand curve", desc: "Left curve ahead; slow down." },
    3: { name: "Right hair pin bend", desc: "Sharp right turn ahead." },
    4: { name: "Left hair pin bend", desc: "Sharp left turn ahead." },
    5: { name: "Right reverse bend", desc: "Zig-zag bend starting to the right." },
    6: { name: "Left reverse bend", desc: "Zig-zag bend starting to the left." },
    7: { name: "Steep ascent", desc: "Steep uphill road ahead." },
    8: { name: "Steep descent", desc: "Steep downhill road ahead." },
    9: { name: "Narrow road ahead", desc: "Road narrows ahead; be cautious." },
    10: { name: "Road widens ahead", desc: "Road width increases ahead." },
    11: { name: "Narrow bridge", desc: "Narrow bridge ahead; proceed carefully." },
    12: { name: "Slippery road", desc: "Slippery surface ahead; avoid sudden braking." },
    13: { name: "Cycle crossing", desc: "Cycle path crossing ahead." },
    14: { name: "Pedestrian crossing", desc: "Pedestrian / zebra crossing ahead." },
    15: { name: "School ahead", desc: "School zone ahead; drive slowly." },
    16: { name: "Men at work", desc: "Road work ahead; follow instructions." },
    17: { name: "Cattle", desc: "Cattle may cross or stray onto the road." },
    18: { name: "Falling rocks", desc: "Falling rocks possible (common in hills)." },
    19: { name: "Ferry", desc: "Ferry service ahead for river crossing." },
    20: { name: "Cross road", desc: "Intersection / cross road ahead." },
    21: { name: "Gap in median", desc: "Opening in the divider ahead." },
    22: { name: "Side road right", desc: "Side road joins from the right." },
    23: { name: "Y-intersection", desc: "Y-shaped junction ahead." },
    24: { name: "Y-intersection", desc: "Y-shaped junction ahead." },
    25: { name: "Y-intersection", desc: "Y-shaped junction ahead." },
    26: { name: "Staggered intersection", desc: "Staggered junction ahead; watch for turning traffic." },
    27: { name: "Staggered intersection", desc: "Staggered junction ahead; watch for turning traffic." },
    28: { name: "Side road left", desc: "Side road joins from the left." },
    29: { name: "T-intersection", desc: "T-junction ahead; you must turn left or right." },
    30: { name: "Major road ahead", desc: "Approaching a major road; be prepared to give way." },
    31: { name: "Roundabout", desc: "Roundabout ahead; reduce speed." },
    32: { name: "Dangerous dip", desc: "Dip/low spot ahead; slow down." },
    33: { name: "Hump or rough road", desc: "Hump/uneven surface ahead." },
    34: { name: "Barrier ahead", desc: "Barrier / toll point ahead." },
    35: { name: "Loose gravel", desc: "Loose gravel on road; maintain control." },
    36: { name: "Speed breaker", desc: "Speed breaker ahead; slow down." },
  },
  informatory: {
    1: { name: "Public Telephone", desc: "Public telephone facility available nearby." },
    2: { name: "Petrol Pump", desc: "Fuel station ahead." },
    3: { name: "Hospital", desc: "Hospital facility nearby." },
    4: { name: "First Aid Post", desc: "First-aid facility available nearby." },
    5: { name: "Eating Place", desc: "Eating place / restaurant nearby." },
    6: { name: "Light Refreshment", desc: "Light refreshment available nearby." },
    7: { name: "Resting Place", desc: "Resting place / lodge facility nearby." },
    8: { name: "No Through Road", desc: "Dead end / no exit ahead." },
    9: { name: "No Through Side Road", desc: "No exit side road; proceed accordingly." },
    10: { name: "Park this Side", desc: "Parking permitted / indicated on this side." },
    11: { name: "Parking Both sides", desc: "Parking available on both sides." },
    12: { name: "Parking Scooters & Motorcycles", desc: "Parking area for two-wheelers." },
    13: { name: "Parking Lot Cycles", desc: "Cycle parking area." },
    14: { name: "Taxi Stand", desc: "Taxi stand location." },
    15: { name: "Auto Rickshaw Stand", desc: "Auto rickshaw stand location." },
    16: { name: "Cycle Rickshaw Stand", desc: "Cycle rickshaw stand location." },
    17: { name: "Flood Gauge", desc: "Water level indicator near bridge/river." },
    18: { name: "Destination Sign", desc: "Shows direction and distance to destinations." },
    19: { name: "Direction Sign", desc: "Shows route direction and distance." },
  },
};

const toSigns = (modules, sectionKey) => {
  const sectionMeta = ROAD_SIGN_META[sectionKey] || {};
  const entries = Object.entries(modules).map(([path, url]) => {
    const file = (path.split("/").pop() || "").trim();
    const base = file.replace(/\.[^.]+$/, "");
    const numMatch = base.match(/^\d+$/);
    const number = numMatch ? Number(base) : null;
    const meta = number ? sectionMeta[number] : null;
    const name = meta?.name || (numMatch ? `Sign ${base}` : base || "Sign");
    const desc = meta?.desc || "Click to view details.";

    return {
      img: url,
      name,
      desc,
      file,
      number,
    };
  });

  return entries.sort(sortByFilename);
};

// Build-time glob: includes every image inside /public/symbols/*
const ROAD_SIGN_IMAGES = {
  mandatory: import.meta.glob(
    "../../public/symbols/mandatory/*.{jpg,jpeg,png,webp,svg}",
    { eager: true, as: "url" }
  ),
  cautionary: import.meta.glob(
    "../../public/symbols/cautionary/*.{jpg,jpeg,png,webp,svg}",
    { eager: true, as: "url" }
  ),
  informatory: import.meta.glob(
    "../../public/symbols/informatory/*.{jpg,jpeg,png,webp,svg}",
    { eager: true, as: "url" }
  ),
};

const ROAD_SIGN_LISTS = {
  mandatory: toSigns(ROAD_SIGN_IMAGES.mandatory, "mandatory"),
  cautionary: toSigns(ROAD_SIGN_IMAGES.cautionary, "cautionary"),
  informatory: toSigns(ROAD_SIGN_IMAGES.informatory, "informatory"),
};

/* =====================
   COMPONENT
===================== */
const DrivingSymbols = () => {
  // State for Chart Zoom
  const [isChartExpanded, setIsChartExpanded] = useState(false);
  const [activeSign, setActiveSign] = useState(null);

  // Print Functionality
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Indian Road Signs Chart - IRC:67-1977</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif; }
            img { max-width: 100%; max-height: 95vh; }
            .header { position: absolute; top: 20px; text-align: center; width: 100%; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Official Indian Road Signs Chart (IRC:67-1977)</h2>
          </div>
          <img src="${window.location.origin}/symbols/Symbol-Raj-Ann-Raj-Bhanthal-Karsog-Mandi1indian-road-signs.webp" />
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };

  return (
    <section id="driving-symbols" className="py-16 bg-white overflow-hidden">
      <SEO
        title="Indian Road Signs Chart & RTO Test Prep"
        description="Official Indian road signs chart (IRC:67-1977) and interactive learning guide for Mandatory, Cautionary and Informatory signs."
        canonical="https://rajannrajdrivingschool.com/#driving-symbols"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =====================
            PART 1: HEADER
        ===================== */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Indian <span className="text-amber-500">Road Signs</span>
          </h2>
          <p className="text-slate-500 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
            Essential visual guide for your RTO Learning License Exam (IRC:67-1977).
            Study the official chart below or explore individual signs.
          </p>
        </div>

        {/* =====================
            PART 2: CHART & CHEAT SHEET
        ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20 border-b border-slate-100 pb-16">
          
          {/* Left: The Chart Display */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-slate-50 rounded-3xl p-2 shadow-xl border border-slate-200 group relative">
              
              {/* Toolbar */}
              <div className="absolute top-6 right-6 z-20 flex gap-2">
                <button
                  onClick={handlePrint}
                  className="bg-white/90 backdrop-blur text-slate-900 p-2.5 rounded-xl shadow-sm hover:bg-slate-900 hover:text-white transition-all border border-slate-200"
                  title="Print Chart"
                >
                  <Printer size={18} />
                </button>
                <a
                  href="/symbols/Symbol-Raj-Ann-Raj-Bhanthal-Karsog-Mandi1indian-road-signs.webp"
                  download
                  className="bg-white/90 backdrop-blur text-slate-900 p-2.5 rounded-xl shadow-sm hover:bg-green-600 hover:text-white transition-all border border-slate-200"
                  title="Download Image"
                >
                  <Download size={18} />
                </a>
              </div>

              {/* Image Container */}
              <div
                onClick={() => setIsChartExpanded(true)}
                className="relative overflow-hidden rounded-2xl bg-white cursor-zoom-in border border-slate-100"
              >
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300 z-10 flex items-center justify-center pointer-events-none">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <Maximize2 size={16} /> Click to Expand
                  </div>
                </div>

                <img
                  src="/symbols/Symbol-Raj-Ann-Raj-Bhanthal-Karsog-Mandi1indian-road-signs.webp"
                  alt="Indian Road Signs Chart for RTO Test"
                  width="1357"
                  height="824"
                  loading="lazy"
                  className="w-full h-auto object-contain max-h-[500px]"
                />
              </div>

              <div className="mt-3 px-2 flex justify-between items-center text-xs text-slate-500 font-medium uppercase tracking-wide">
                <span>Source: IRC:67-1977</span>
                <span className="flex items-center gap-1">
                  <FileText size={12} /> High Resolution
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Quick Guide */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Pro Tip Box */}
            <div className="bg-slate-900 p-4 rounded-xl text-white text-center shadow-lg shadow-slate-900/20">
              <p className="text-sm opacity-90">
                💡 <strong>Tip:</strong> 90% of RTO exam questions are based on
                these shapes. Memorize them first!
              </p>
            </div>
          </motion.div>
        </div>

        {/* =====================
          PART 3: DETAILED STUDY (All Signs)
        ===================== */}
        <div className="scroll-mt-24" id="detailed-signs">
          
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900">
              Study Individual Signs
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              All available signs are shown below in separate categories.
            </p>
          </div>

          {ROAD_SIGN_SECTIONS.map((section) => {
            const SectionIcon = section.icon;
            const signs = ROAD_SIGN_LISTS[section.key] || [];

            return (
              <div key={section.key} className="mb-14">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-6 text-left max-w-5xl"
                >
                  <h3 className={`text-xl sm:text-2xl font-bold ${section.color}`}>
                    {section.title}
                  </h3>
                  <p className="mt-2 text-slate-700 text-sm sm:text-base leading-relaxed">
                    {section.description}
                  </p>
                </motion.div>

                {signs.length === 0 ? (
                  <div className="text-center text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    No images found in <span className="font-mono">/public/symbols/{section.key}</span>.
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
                  >
                    {signs.map((sign) => (
                      <div
                        key={`${section.key}-${sign.file}`}
                        onClick={() => setActiveSign({ ...sign, sectionTitle: section.title })}
                        className="group cursor-pointer bg-white border border-slate-200 rounded-xl p-4 text-center hover:shadow-lg hover:border-amber-400 transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="h-24 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <img
                            src={sign.img}
                            alt={sign.name}
                            className="max-w-full max-h-full object-contain drop-shadow-sm"
                            loading="lazy"
                          />
                        </div>
                        <p className="text-xs font-bold text-slate-700 group-hover:text-slate-900">
                          {sign.name}
                        </p>

                        {/* Hover overlay effect (like your example) */}
                        <div className="absolute inset-0 bg-slate-900/85 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="w-full p-4 text-left">
                            <p className="text-sm font-bold leading-snug">{sign.name}</p>
                            <p className="mt-1 text-xs text-white/90 leading-snug">{sign.desc}</p>
                            <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold text-amber-300">
                              Click for full view <span aria-hidden="true">→</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* =====================
            MODALS
        ===================== */}

        <AnimatePresence>
          {/* 1. CHART EXPAND MODAL */}
          {isChartExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={() => setIsChartExpanded(false)}
            >
              <button
                onClick={() => setIsChartExpanded(false)}
                className="absolute top-6 right-6 text-white hover:text-amber-400 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
              >
                <X size={24} />
              </button>

              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src="/symbols/Symbol-Raj-Ann-Raj-Bhanthal-Karsog-Mandi1indian-road-signs.webp"
                alt="Indian Road Signs Full Screen"
                className="max-w-full max-h-[90vh] rounded-lg shadow-2xl bg-white"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}

          {/* 2. SIGN DETAIL MODAL */}
          {activeSign && (
            <div
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-[2px]"
              onClick={() => setActiveSign(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                    onClick={() => setActiveSign(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
                >
                    <X size={20} />
                </button>

                <div className="bg-slate-50 rounded-xl p-6 mb-4 inline-block">
                  <img
                    src={activeSign.img}
                    alt={activeSign.name}
                    className="w-32 h-32 object-contain"
                  />
                </div>
                
                <h4 className="text-xl font-bold text-slate-900">
                  {activeSign.name}
                </h4>
                {activeSign.sectionTitle && (
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    {activeSign.sectionTitle}
                  </p>
                )}
                <div className="h-1 w-12 bg-amber-500 mx-auto my-3 rounded-full"></div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeSign.desc}
                </p>

                <button
                  onClick={() => setActiveSign(null)}
                  className="mt-6 w-full py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition shadow-lg shadow-slate-900/20"
                >
                  Close
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default DrivingSymbols;