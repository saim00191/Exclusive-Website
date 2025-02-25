"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const adminInfo = useSelector((state: RootState) => state.adminSlice.adminInfo);
  const router = useRouter();

  useEffect(() => {
    if (!adminInfo) {
      router.replace("/adminLogin"); // Redirect to login if not authenticated
    }
  }, [adminInfo, router]);

  if (!adminInfo) return null; // Prevent rendering while redirecting

  return <>{children}</>;
};

export default AdminGuard;
