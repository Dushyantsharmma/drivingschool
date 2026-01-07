import { useState } from "react";
import { Info, AlertCircle, XCircle, Gauge } from "lucide-react";

const DASHBOARD_SIGNS = [
  // Precise calibration for dashboard-base.webp.png
  {
    id: "seatbelt",
    label: "Seat Belt Reminder",
    meaning: "Driver or passenger seat belt not fastened.",
    action: "Fasten seat belt immediately for safety.",
    position: { top: "37%", left: "15%" },
    type: "critical" // Red in image
  },
  {
    id: "abs",
    label: "ABS Warning",
    meaning: "Anti-lock Braking System malfunction.",
    action: "Brakes will work but without anti-lock feature. Drive carefully to garage.",
    position: { top: "50%", left: "29%" },
    type: "warning" // Yellow in image
  },
  {
    id: "oil",
    label: "Low Oil Pressure",
    meaning: "Engine oil pressure is dangerously low.",
    action: "Stop the car immediately and check oil level. Do not drive.",
    position: { top: "60%", left: "20%" },
    type: "critical" // Red in image
  },
  {
    id: "brake",
    label: "Brake System",
    meaning: "Handbrake engaged or low brake fluid.",
    action: "Release handbrake. If light stays on, checking brake fluid is urgent.",
    position: { top: "68%", left: "24%" },
    type: "critical" // Red in image
  },
  {
    id: "door",
    label: "Door Open",
    meaning: "One or more doors or trunk are not closed.",
    action: "Pull over safelely and ensure all doors are securely shut.",
    position: { top: "32%", left: "38%" },
    type: "critical" // Red in image
  },
  {
    id: "security",
    label: "Security System",
    meaning: "Immobilizer or security system active/fault.",
    action: "If car won't start, try spare key or contact dealer.",
    position: { top: "32%", left: "50%" },
    type: "info" // Blue in image
  },
  {
    id: "temp",
    label: "High Temperature",
    meaning: "Engine coolant is overheating.",
    action: "Stop immediately! Allow engine to cool before checking coolant.",
    position: { top: "50%", left: "52%" },
    type: "critical" // Red in image
  },
  {
    id: "steering",
    label: "Power Steering / General",
    meaning: "Power steering failure or general system alert.",
    action: "Steering may become very heavy. Visit workshop.",
    position: { top: "65%", left: "41%" },
    type: "critical" // Red exclamation in image
  },
  {
    id: "engine",
    label: "Check Engine",
    meaning: "Engine malfunction or emission system issue.",
    action: "Drive moderately and visit a service center immediately.",
    position: { top: "65%", left: "58%" },
    type: "warning" // Yellow block in image
  },
  {
    id: "fuel",
    label: "Low Fuel",
    meaning: "Fuel level is getting low.",
    action: "Refuel at the nearest petrol pump.",
    position: { top: "65%", left: "86%" },
    type: "info" // Blue in image
  }
];

const DashboardTrainer = () => {
  const [active, setActive] = useState(null);

  // Helper to get icon based on type
  const getIcon = (type) => {
    switch (type) {
      case 'critical': return <XCircle className="text-red-500" />;
      case 'warning': return <AlertCircle className="text-amber-500" />;
      default: return <Info className="text-blue-500" />;
    }
  };

  return (
    <section className="bg-white rounded-3xl p-6 md:p-8 glow-card">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Gauge className="text-amber-500" /> Interactive Car Dashboard
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Tap on the blinking lights to learn what they mean.
          </p>
        </div>
        <div className="flex gap-4 text-xs font-bold bg-slate-50 p-2 rounded-lg">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Critical</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Warning</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Info</span>
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-[#1a1a1a] border-4 border-slate-800">
        <img
          src={`${import.meta.env.BASE_URL}dashboard/dashboard-base.webp.png`}
          alt="Car Dashboard Visualization"
          className="w-full opacity-80"
        />

        {DASHBOARD_SIGNS.map((sign) => (
          <button
            key={sign.id}
            onClick={() => setActive(sign)}
            className={`absolute w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.5)] transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 focus:scale-125 focus:outline-none focus:ring-4 ring-white/30 
            ${sign.type === 'critical' ? 'bg-red-500 animate-pulse' :
                sign.type === 'warning' ? 'bg-amber-500 animate-pulse' : 'bg-blue-500 animate-bounce-slow'}`}
            style={{ top: sign.position.top, left: sign.position.left }}
            aria-label={`View details for ${sign.label}`}
          >
            <span className="sr-only">{sign.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 min-h-[120px]">
        {active ? (
          <div className={`p-6 rounded-2xl border-l-4 transition-all duration-300 animate-in slide-in-from-bottom-4 ${active.type === 'critical' ? 'bg-red-50 border-red-500' :
              active.type === 'warning' ? 'bg-amber-50 border-amber-500' : 'bg-blue-50 border-blue-500'
            }`}>
            <div className="flex items-start gap-4">
              <div className={`mt-1 p-2 rounded-full bg-white shadow-sm ${active.type === 'critical' ? 'text-red-500' :
                  active.type === 'warning' ? 'text-amber-500' : 'text-blue-500'
                }`}>
                {getIcon(active.type)}
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">{active.label}</h4>
                <p className="text-slate-700 mb-3 text-sm leading-relaxed">{active.meaning}</p>
                <div className="bg-white/60 p-3 rounded-lg inline-block">
                  <p className={`text-sm font-bold flex items-center gap-2 ${active.type === 'critical' ? 'text-red-700' :
                      active.type === 'warning' ? 'text-amber-700' : 'text-blue-700'
                    }`}>
                    <span className="uppercase text-[10px] tracking-wider border border-current px-1 rounded">Action</span>
                    {active.action}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-2xl p-6 border border-slate-100 border-dashed">
            <Info size={32} className="mb-2 opacity-50" />
            <p>Tap on any blinking light above to see its meaning and required action.</p>
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-slate-400 italic">
          *Dashboard layouts vary by car model. These positions are for educational purposes.
        </p>
      </div>
    </section>
  );
};

export default DashboardTrainer;