import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
import { useAuthStore } from "./store/useAuthStore.ts";
import { Loader } from "lucide-react";

const App: React.FC = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  console.log(authUser);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    return authUser ? children : <Navigate to={"/login"} />;
  };

  const UnauthenticatedRoute = ({
    children,
  }: {
    children: React.ReactElement;
  }) => {
    return !authUser ? children : <Navigate to={"/"} />;
  };

  return (
    <div>
      <Navbar />
      <Routes>
        {/* Authenticated Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />

        {/* Unauthenticated Routes */}
        <Route
          path="/login"
          element={
            <UnauthenticatedRoute>
              <Login />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <UnauthenticatedRoute>
              <SignUp />
            </UnauthenticatedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
