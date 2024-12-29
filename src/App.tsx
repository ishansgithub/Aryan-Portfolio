import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import { Terminal } from "./components/Terminal";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dasboard";
import Login from "./components/Login";

const MainContent: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleToggleNavbar = () => setShowNavbar(true);
    const handleHideNavbar = () => setShowNavbar(false);

    document.addEventListener("toggleNavbar", handleToggleNavbar);
    document.addEventListener("hideNavbar", handleHideNavbar);

    return () => {
      document.removeEventListener("toggleNavbar", handleToggleNavbar);
      document.removeEventListener("hideNavbar", handleHideNavbar);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {showNavbar && <Navbar />}{" "}
      {/* Keep your original navbar without auth elements */}
      <div className="min-h-screen flex flex-col justify-center">
        <Hero />
        <div className="container mx-auto px-4 py-12 mt-8">
          <Terminal />
        </div>
      </div>
      <About />
      <Blog />
      <Contact />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/admin-login" element={<Login />} />{" "}
          {/* Changed to a less obvious route */}
          <Route
            path="/admin-dashboard/*" // Changed to a less obvious route
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
