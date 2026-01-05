import React, { Suspense, lazy } from "react";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Footer from "./components/Footer";
import LazyMount from "./components/LazyMount";

// Core sections (important for trust)
import About from "./components/About";
import Courses from "./components/Courses";
import Safety from "./components/Safety";

// Lazy sections (engagement tools)
const MockTest = lazy(() => import("./components/MockTest"));
const RTOInfo = lazy(() => import("./components/RTOInfo"));
const DrivingSymbols = lazy(() => import("./components/DrivingSymbols"));
const Gallery = lazy(() => import("./components/Gallery"));
const GoogleReviews = lazy(() => import("./components/GoogleReviews"));
const FAQ = lazy(() => import("./components/FAQ"));
const EnquiryForm = lazy(() => import("./components/EnquiryForm"));
const Contact = lazy(() => import("./components/Contact"));

/* Calm, non-distracting loader */
const SectionSkeleton = ({ height = "300px" }) => (
  <div
    className="w-full animate-pulse bg-slate-100 rounded-xl my-12"
    style={{ height }}
  />
);

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* LCP */}
        <Home />

        {/* Trust-building sections (eager) */}
        <About />
        <Courses />
        <Safety />

        {/* Engagement sections (lazy but anchorable) */}
        <LazyMount anchorId="mock-test">
          <Suspense fallback={<SectionSkeleton height="280px" />}>
            <MockTest />
          </Suspense>
        </LazyMount>

        <LazyMount anchorId="rto-info">
          <Suspense fallback={<SectionSkeleton height="280px" />}>
            <RTOInfo />
          </Suspense>
        </LazyMount>

        <LazyMount anchorId="driving-symbols">
          <Suspense fallback={<SectionSkeleton height="340px" />}>
            <DrivingSymbols />
          </Suspense>
        </LazyMount>

        <LazyMount anchorId="gallery">
          <Suspense fallback={<SectionSkeleton height="360px" />}>
            <Gallery />
          </Suspense>
        </LazyMount>

        <LazyMount anchorId="reviews">
          <Suspense fallback={<SectionSkeleton height="360px" />}>
            <GoogleReviews />
          </Suspense>
        </LazyMount>

        <LazyMount anchorId="faq">
          <Suspense fallback={<SectionSkeleton height="300px" />}>
            <FAQ />
          </Suspense>
        </LazyMount>

        <LazyMount anchorId="enquiry">
          <Suspense fallback={<SectionSkeleton height="300px" />}>
            <EnquiryForm />
          </Suspense>
        </LazyMount>

        <LazyMount anchorId="contact">
          <Suspense fallback={<SectionSkeleton height="300px" />}>
            <Contact />
          </Suspense>
        </LazyMount>
      </main>

      <Footer />
    </div>
  );
}

export default App;
