
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import EnquiryFab from './components/EnquiryFab';

const HomePage = lazy(() => import("./pages/HomePage"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const StudentCornerPage = lazy(() => import("./pages/StudentCornerPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f6f4ec] text-slate-900 transition-colors duration-300">
      <Navigation />
      <ScrollToTop />
      {/* Main Content */}
      <main className="flex-1 pt-[64px] lg:pt-0">
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/student-corner" element={<StudentCornerPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <EnquiryFab />
      <Footer />
    </div>
  );
}

export default App;
