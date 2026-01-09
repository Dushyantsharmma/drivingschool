import { useState } from "react";
import { MapPin, Phone, Clock, FileText, CreditCard, User, FileBadge, Map } from "lucide-react";
import SEO from "../SEO";
import VillageMap from "../VillageMap";

export default function RTOInfo() {
  const [tab, setTab] = useState("process");

  const rto = {
    name: "Registering & Licensing Authority (SDM) Karsog",
    code: "HP-30",
    address: "Mini Secretariat, SDM Office, Karsog, Mandi, Himachal Pradesh – 175011",
    phone: "01907-222236",
    timings: "10:00 AM – 5:00 PM (Lunch 1:30 – 2:00 PM)",
  };

  return (
    <div className="bg-[#f6f4ea] min-h-screen p-4 md:p-10">
      <SEO
        title="Karsog RTO (HP-30) – Driving License & Learner License Guide"
        description="Complete HP-30 Karsog RTO guide – process, documents, fees, test route & driving license help for villages of Karsog."
        canonical="https://rajannrajdrivingschool.com/rto"
      />
      <SEO
        title="Karsog RTO (HP-30) Driving License Guide"
        description="Official HP-30 RTO guide for Learning License, Driving Test & Fees in Karsog."
      />
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">
            Karsog RTO <span className="text-amber-600">(HP-30)</span>
          </h1>
          <p className="text-slate-600 mt-2">
            Official Driving License & Learner License Guide
          </p>
        </div>

        {/* RTO CARD */}
        <div className="bg-white rounded-xl shadow p-6 grid md:grid-cols-4 gap-4 mb-8 text-sm">
          <div><MapPin className="inline text-amber-600"/> {rto.address}</div>
          <div><Phone className="inline text-amber-600"/> {rto.phone}</div>
          <div><Clock className="inline text-amber-600"/> {rto.timings}</div>
          <div><FileText className="inline text-amber-600"/> SDM Office Karsog</div>
        </div>

        {/* TABS */}
        <div className="flex gap-3 flex-wrap mb-6">
          {["process","documents","fees","route"].map(t=>(
            <button
              key={t}
              onClick={()=>setTab(t)}
              className={`px-5 py-2 rounded-full font-semibold ${
                tab===t ? "bg-amber-500 text-black" : "bg-white text-slate-600"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="bg-white p-6 rounded-xl shadow">
          {tab==="process" && (
            <div>
              <h2 className="font-bold text-xl mb-4">
                <FileText className="inline text-amber-600"/> Learner License Process
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-sm">
                <li>Apply online at parivahan.gov.in</li>
                <li>Upload Aadhaar & address proof</li>
                <li>Pay LL fee online</li>
                <li>Book slot at HP-30 Karsog</li>
                <li>Visit SDM Office for verification</li>
                <li>Appear for computer test</li>
                <li>Download Learning License</li>
              </ol>
            </div>
          )}

          {tab==="documents" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3 flex gap-2">
                  <User className="text-amber-600"/> Learner License
                </h3>
                <ul className="list-disc pl-6 text-sm">
                  <li>Aadhaar / Age Proof</li>
                  <li>Address Proof</li>
                  <li>2 Passport Photos</li>
                  <li>Medical Form 1A (if above 40)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 flex gap-2">
                  <FileBadge className="text-green-600"/> Driving License
                </h3>
                <ul className="list-disc pl-6 text-sm">
                  <li>Valid Learner’s License</li>
                  <li>Form-4 Printout</li>
                  <li>RC, Insurance & PUC</li>
                  <li>Driving School Certificate (Form-5)</li>
                </ul>
              </div>
            </div>
          )}

          {tab==="fees" && (
            <table className="w-full text-sm border">
              <tbody>
                {[
                  ["Learner License","₹150"],
                  ["LL Test","₹50"],
                  ["Driving License","₹200"],
                  ["Smart Card","₹200"],
                  ["Driving Test","₹300"],
                ].map(([n,v])=>(
                  <tr key={n} className="border-b">
                    <td className="p-3">{n}</td>
                    <td className="p-3 font-bold text-green-700">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab==="route" && (
            <div className="text-center">
              <img src="/symbols/Driving Test Route.png" className="mx-auto max-h-[400px]" />
              <p className="text-sm text-slate-500 mt-2">
                Official Karsog RTO Driving Test Track
              </p>
            </div>
          )}
        </div>

        {/* VILLAGE COVERAGE */}
        <VillageMap />

      </div>
    </div>
  );
}
