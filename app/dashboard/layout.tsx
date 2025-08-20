"use client";

import {  useRouter } from "next/navigation";
import { useAuth } from "../_lib/authContext";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  const { user } = useAuth();
  const router = useRouter()


   useEffect(() => {
    if (!user) {
      router.replace("/auth"); 
    }
  }, [user, router]);

  if (!user) return null;
   
  return (
    <section>
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <main>{children}</main>
    </section>
  );
}