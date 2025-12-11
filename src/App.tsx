import { Navbar } from "./components/Navbar";
import { Header } from "./components/Header";
import { ToastContainer } from "./components/Toast/ToastContainer";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useToast } from "./hooks/useToast";

import { useRef } from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Championships } from "./pages/Championships";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { MyTeam } from "./pages/MyTeam";
import { ChampionshipsCRUD } from "./pages/ChampionshipsCRUD";
function App() {
  const backgroundOverlayRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { toasts, removeToast } = useToast();
  
  const isAuthPage = 
    location.pathname === "/login" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password";

  function closeMenuDrawer() {
    if (!backgroundOverlayRef.current || !navbarRef.current) return;
    backgroundOverlayRef.current.removeAttribute("data-open");
    navbarRef.current.removeAttribute("data-open");
  }

  function handleOpenMenu() {
    if (!backgroundOverlayRef.current || !navbarRef.current) return;
    backgroundOverlayRef.current.setAttribute("data-open", "true");
    navbarRef.current.setAttribute("data-open", "true");
  }

  if (isAuthPage) {
    return (
      <>
        <div className="login-wrapper">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </div>
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  return (
    <div className="wrapper">
      <div
        className="background-overlay"
        ref={backgroundOverlayRef}
        onClick={closeMenuDrawer}
      ></div>
      <Navbar closeMenuDrawer={closeMenuDrawer} navbarRef={navbarRef} />

      <main>
        <Header handleOpenMenu={handleOpenMenu} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/championships" element={<Championships />} />
          <Route 
            path="/my-team" 
            element={
              <ProtectedRoute>
                <MyTeam />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/championships-settings" 
            element={
              <ProtectedRoute>
                <ChampionshipsCRUD />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
