import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface AuthState {
  authUser: string | null;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  isSigningUp: boolean;
  isLogingIn: boolean;
  isUpdatingProfile: boolean;
  signup: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  // loading states
  isSigningUp: false,
  isLogingIn: false,
  isUpdatingProfile: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (err: any) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data: any) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Internal server error.");
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (err: any) {
      toast.error(err.response.data.message || "Internal server error");
    }
  },
}));
