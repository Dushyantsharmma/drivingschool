import { useState } from "react";
import { Search, Gavel, AlertTriangle, ShieldAlert } from "lucide-react";

export const TRAFFIC_FINES = [
  { offense: "Driving without License", fine: "₹5,000", section: "181" },
  { offense: "Unauthorized use of vehicles without License", fine: "₹5,000", section: "180" },
  { offense: "Driving when mentally or physically unfit to drive", fine: "First: ₹1,000\nSecond: ₹2,000", section: "186" },
  { offense: "Driving at excessive speed (LMV)", fine: "₹1,000 - ₹2,000", section: "183" },
  { offense: "Driving at excessive speed (Medium/Heavy Vehicle)", fine: "₹2,000 - ₹4,000 + License Seizure", section: "183" },
  { offense: "Dangerous/Rash Driving", fine: "First: ₹1,000 - ₹5,000 + 6-12 mo imprisonment\nSecond: ₹10,000 + 2 yr imprisonment", section: "184" },
  { offense: "Drunken Driving", fine: "₹10,000 + 6 mo imprisonment", section: "185" },
  { offense: "Racing and Trials of Speed", fine: "First: ₹5,000\nSecond: ₹10,000", section: "189" },
  { offense: "Vehicle without Permit", fine: "₹10,000", section: "192A" },
  { offense: "Aggregators (Violation of licencing conditions)", fine: "₹25,000 to ₹1,00,000", section: "193" },
  { offense: "Overloading", fine: "₹20,000 + ₹2,000 per extra tonne", section: "194" },
  { offense: "Overloading of passengers", fine: "₹1,000 per extra passenger", section: "194A" },
  { offense: "Not wearing seat belt", fine: "₹1,000", section: "194B" },
  { offense: "Overloading of two-wheelers (Tripling)", fine: "₹2,000 + Disqualification for 3 months", section: "194C" },
  { offense: "Not wearing helmet (Rider & Pillion)", fine: "₹1,000 + Disqualification for 3 months", section: "194D" },
  { offense: "Not providing way for emergency vehicles", fine: "₹10,000", section: "194E" },
  { offense: "Driving without Insurance", fine: "First: ₹2,000\nSecond: ₹4,000", section: "196" },
  { offense: "Offences by Juveniles", fine: "Rs. 25,000 with 3 yrs imprisonment to guardian + Cancellation of RC for 1 yr", section: "199A" },
  { offense: "Disobedience of orders of Authorities", fine: "₹2,000", section: "179" },
  { offense: "Violation of Road Rules/Regulations", fine: "₹500 - ₹1,000", section: "177A" },
  { offense: "Using Horn in Silence Zones", fine: "First: ₹1,000\nSecond: ₹2,000", section: "194F" },
  { offense: "Using Mobile Phone while Driving", fine: "₹5,000", section: "184(c)" },
];

const TrafficFines = () => {
  const [query, setQuery] = useState("");

  const filtered = TRAFFIC_FINES.filter(item =>
    item.offense.toLowerCase().includes(query.toLowerCase()) || 
    item.section.includes(query)
  );

  return (
    <section className="bg-[#EFEDE0] rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
            <Gavel className="text-red-500" /> Traffic Penalties (India)
          </h3>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
             <AlertTriangle size={14} className="text-amber-500" /> 
             As per <strong className="text-slate-700">Motor Vehicles (Amendment) Act, 2019</strong>.
          </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search offense (e.g. 'helmet', 'license', '184')..."
          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="bg-red-50 rounded-t-xl border border-red-100 p-4 flex justify-between items-center text-red-800 text-xs font-bold uppercase tracking-wider">
            <span>Offense Description</span>
            <span className="hidden sm:inline">Section & Penalty</span>
        </div>
        
        <div className="overflow-y-auto max-h-[500px] border-x border-b border-slate-100 rounded-b-xl scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {filtered.length > 0 ? (
              <table className="w-full text-sm text-left">
              <tbody className="divide-y divide-slate-100">
                  {filtered.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-4 align-top">
                          <p className="font-bold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">{row.offense}</p>
                          <span className="inline-flex sm:hidden items-center text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                              Sec {row.section}
                          </span>
                          <div className="sm:hidden mt-2 font-bold text-red-600 bg-red-50 p-2 rounded-lg text-xs">
                              {row.fine}
                          </div>
                      </td>
                      <td className="p-4 align-top w-[40%] text-right hidden sm:table-cell">
                          <div className="flex flex-col items-end gap-1">
                              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full mb-1">
                                  Section {row.section}
                              </span>
                              <span className="font-bold text-red-600 whitespace-pre-line text-right">
                                  {row.fine}
                              </span>
                          </div>
                      </td>
                  </tr>
                  ))}
              </tbody>
              </table>
          ) : (
             <div className="p-12 text-center text-slate-400">
                <ShieldAlert className="mx-auto mb-3 opacity-50" size={32} />
                <p>No fines found for "{query}"</p>
                <button 
                  onClick={() => setQuery('')}
                  className="text-blue-500 font-bold text-sm mt-2 hover:underline"
                >
                  Clear Search
                </button>
             </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              * Fines may vary by state. Consult local traffic police for latest challan rates.
          </p>
      </div>
    </section>
  );
};

export default TrafficFines;