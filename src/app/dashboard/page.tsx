'use client'
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import AdminDashboard from "./adminDashboard";

export default function Dashboard(){
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
    if (!user.loggedIn) {
        // PUSH TO LOGIN SCREEN
        router.push('/signin');
    }
    if (user.role == "ADMIN" || user.role == "SUPERADMIN"){
        // PUSH TO ADMIN DASHBOARD
        return (
            <AdminDashboard />
        );
    } else {
        // PUSH TO USER DASHBOARD
        router.push('/communities')
    }
}