import { create } from "zustand";
import {axiosInstance} from '../lib/axios'

interface AuthState {
  authUser: string | null;
  isCheckingAuth: boolean;
  checkAuth : any
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  // loading states
  isSigningIn : false,
  isLogingIn : false,
  isUpdatingProfile : false,
  checkAuth : async () => {
    try{
        const res = axiosInstance.get("/auth/check")
        set({authUser: (await res).data})
    } catch(error:any){
        set({authUser : null})
    } finally{
        set({isCheckingAuth: false})
    }
  }
}));