import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Car,
  ShieldCheck,
  Users,
  Award,
} from "lucide-react";

const ContactPage = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#f6f4ec] to-[#ebe7d8]">
      {/* ================= HERO ================= */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center sm:text-left">
            Contact <span className="block sm:inline text-amber-500 ml-0 sm:ml-2">Us</span>
          </h1>

          <p className="mt-4 max-w-3xl text-gray-600 text-lg">
            <span className="font-semibold">
              Raj Ann Raj Driving Training School
            </span>{" "}
            is based in <b>Karsog, Mandi (Himachal Pradesh)</b>, offering
            professional driving training on real hill roads with safety,
            confidence, and discipline.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://wa.me/91XXXXXXXXXX"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow"
            >
              <MessageCircle size={18} />
              WhatsApp Chat
            </a>

            <a
              href="tel:+91XXXXXXXXXX"
              className="inline-flex items-center gap-2 bg-white border hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold"
            >
              <Phone size={18} />
              Call Now
            </a>

            <a
              href="mailto:example@gmail.com"
              className="inline-flex items-center gap-2 bg-white border hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold"
            >
              <Mail size={18} />
              Send Email
            </a>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ================= LEFT ================= */}
          <div className="space-y-8">
            <InfoCard icon={<MapPin />} title="Training Center Address">
              Bhanthal, Karsog <br />
              District Mandi, Himachal Pradesh – <b>175011</b>
              <a
                href="https://maps.google.com"
                className="block mt-2 text-green-700 font-medium hover:underline"
              >
                View on Google Maps →
              </a>
            </InfoCard>

            <InfoCard icon={<Clock />} title="Opening Hours (7 Days)">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day) => (
                <DayRow key={day} day={day} time="08:00 AM – 07:00 PM" />
              ))}
              <DayRow day="Sunday" time="Closed" closed />
            </InfoCard>

            <InfoCard icon={<Car />} title="Training Coverage Area">
              Pickup & driving practice available in:
              <ul className="mt-2 list-disc list-inside font-medium">
                <li>Bhanthal</li>
                <li>Karsog</li>
                <li>Sanarli</li>
                <li>Mandi</li>
                <li>Nearby villages</li>
              </ul>

              <span className="inline-block mt-4 bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold">
                Real hill-road & test-track training
              </span>
            </InfoCard>
          </div>

{/* ================= RIGHT ================= */}
<div className="flex flex-col gap-6 h-full">

  {/* MAP CARD */}
  <div className="bg-white rounded-3xl shadow-md border overflow-hidden flex-1">
    <iframe
      title="Raj Ann Raj Driving School Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.53242739644!2d77.2141896!3d31.404287999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3905a08da5cd688b%3A0x13721873736c3e1b!2sRaj%20%22Ann%22%20Raj%20Driving%20Training%20School%20Bhanthal!5e1!3m2!1sen!2sin!4v1767853031635!5m2!1sen!2sin"
      className="w-full h-full min-h-[360px]"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>

  {/* MINI CARDS CARD */}
  <div className="bg-white rounded-3xl shadow-md border p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <MiniCard
        icon={<ShieldCheck />}
        title="Safety First"
        text="Dual-control vehicles & safety-focused training"
      />
      <MiniCard
        icon={<Users />}
        title="Personal Training"
        text="One-to-one guidance for every learner"
      />
      <MiniCard
        icon={<Award />}
        title="License Support"
        text="LL & DL test preparation with high success rate"
      />
      <MiniCard
        icon={<Clock />}
        title="Quick Response"
        text="Fast call & WhatsApp support"
      />
    </div>
  </div>

</div>


        </div>
      </div>
    </section>
  );
};

/* ================= COMPONENTS ================= */

const InfoCard = ({ icon, title, children }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border">
    <div className="flex items-start gap-3">
      <div className="text-green-600 mt-1">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  </div>
);

const DayRow = ({ day, time, closed }) => (
  <div className="flex justify-between text-sm md:text-base">
    <span>{day}</span>
    <span
      className={`font-semibold ${
        closed ? "text-red-600" : "text-green-700"
      }`}
    >
      {time}
    </span>
  </div>
);

const MiniCard = ({ icon, title, text }) => (
  <div className="bg-white rounded-xl p-4 border shadow-sm h-full">
    <div className="flex items-start gap-3">
      <div className="text-green-600 mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold text-sm md:text-base">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
      </div>
    </div>
  </div>
);

export default ContactPage;
