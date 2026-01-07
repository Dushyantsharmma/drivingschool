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
import SEO from "../SEO";


/* =====================
  DATA (Auto-loaded from /symbols)
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

    // Handle images relative to base path
    const safeUrl = (typeof url === 'string' && url.startsWith('/') && !url.startsWith(import.meta.env.BASE_URL))
      ? `${import.meta.env.BASE_URL}${url.substring(1)}`
      : url;

    return {
      img: safeUrl,
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
    "../../../public/symbols/mandatory/*.{jpg,jpeg,png,webp,svg}",
    { eager: true, as: "url" }
  ),
  cautionary: import.meta.glob(
    "../../../public/symbols/cautionary/*.{jpg,jpeg,png,webp,svg}",
    { eager: true, as: "url" }
  ),
  informatory: import.meta.glob(
    "../../../public/symbols/informatory/*.{jpg,jpeg,png,webp,svg}",
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
  const [activeTab, setActiveTab] = useState('mandatory');
  const [activeSign, setActiveSign] = useState(null);

  return (
    <div id="driving-symbols" className="bg-white overflow-hidden p-6 md:p-8">
      <SEO
        title="Indian Road Signs Chart & RTO Test Prep"
        description="Official Indian road signs chart (IRC:67-1977) and interactive learning guide for Mandatory, Cautionary and Informatory signs."
        canonical="https://rajannrajdrivingschool.com/#driving-symbols"
      />

      <div className="max-w-full mx-auto">
        
        {/* =====================
            PART 1: HEADER
        ===================== */}
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Indian <span className="text-amber-500">Road Signs</span>
          </h2>
          <p className="text-slate-500 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
            Essential visual guide for your RTO Learning License Exam (IRC:67-1977).
          </p>
          
          <div className="mt-8 flex justify-center">
            <img 
              src={`${import.meta.env.BASE_URL}symbols/Symbol-Raj-Ann-Raj-Bhanthal-Karsog-Mandi1indian-road-signs.webp`}
              alt="Indian Road Signs Chart - Raj Ann Raj Driving School" 
              className="max-w-full h-auto rounded-xl shadow-lg border border-slate-100"
              loading="lazy"
            />
          </div>

          {/* Download Action */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                
                const link = document.createElement('a');
                link.href = '/symbols/Symbol-Raj-Ann-Raj-Bhanthal-Karsog-Mandi1indian-road-signs.webp';
                link.download = 'Raj-Ann-Raj-Indian-Road-Signs.webp';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <Download size={20} />
              Download Chart
            </button>
          </div>
        </div>

        {/* =====================
            PART 2: TABS
        ===================== */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
            {ROAD_SIGN_SECTIONS.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveTab(section.key)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border ${
                  activeTab === section.key
                    ? 'bg-navy text-white border-navy shadow-lg shadow-navy/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-navy hover:text-navy'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Active Tab Description */}
          <motion.p 
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-slate-600 text-sm leading-relaxed max-w-2xl text-center px-4"
          >
            {ROAD_SIGN_SECTIONS.find(s => s.key === activeTab)?.description}
          </motion.p>
        </div>

        {/* =====================
            PART 3: GRID CONTENT
        ===================== */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {ROAD_SIGN_LISTS[activeTab].map((sign, index) => (
                <motion.button
                  key={`${activeTab}-${index}`}
                  layoutId={`sign-${activeTab}-${index}`}
                  onClick={() => setActiveSign(sign)}
                  className="group bg-slate-50 hover:bg-white border border-slate-100 hover:border-amber-200 rounded-xl p-4 flex flex-col items-center text-center transition-all hover:shadow-lg"
                >
                  <div className="w-20 h-20 mb-3 flex items-center justify-center">
                    <img 
                      src={sign.img} 
                      alt={sign.name}
                      className="max-w-full max-h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xs font-bold text-slate-700 group-hover:text-slate-900 line-clamp-2">
                    {sign.name}
                  </h3>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =====================
            PART 4: MODAL
        ===================== */}
        <AnimatePresence>
          {activeSign && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setActiveSign(null)}>
              <motion.div
                layoutId={`sign-${activeTab}-${ROAD_SIGN_LISTS[activeTab].indexOf(activeSign)}`}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <button 
                  onClick={() => setActiveSign(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <X size={20} className="text-slate-600" />
                </button>

                <div className="flex flex-col items-center text-center pt-4">
                  <div className="w-32 h-32 mb-6 flex items-center justify-center bg-slate-50 rounded-2xl p-4">
                    <img 
                      src={activeSign.img} 
                      alt={activeSign.name}
                      className="max-w-full max-h-full object-contain drop-shadow-md"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {activeSign.name}
                  </h3>
                  
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${
                    activeTab === 'mandatory' ? 'bg-red-100 text-red-700' :
                    activeTab === 'cautionary' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {activeTab} Sign
                  </div>

                  <p className="text-slate-600 leading-relaxed">
                    {activeSign.desc}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default DrivingSymbols;