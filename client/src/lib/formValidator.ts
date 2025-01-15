import toast from "react-hot-toast"

interface SignupProp {
    fullName : string;
    email : string;
    password : string;
}

export const signUpFormValidator = (data: SignupProp) => {
if(!data.fullName.trim()) return toast.error("Full name is required")
if(!data.email.trim()) return toast.error("Email is required")
if(!/\S+@\S+\.\S+/.test(data.email)) return toast.error("Invalid email format")
if(!data.password) return toast.error("Password is required")
if(data.password.length < 6) return toast.error("Password must be at least 6 characters")

return true;
}