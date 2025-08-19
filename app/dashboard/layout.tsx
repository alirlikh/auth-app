"use client";

import { redirect, useRouter } from "next/navigation";
import { useAuth } from "../_lib/authContext";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  const { user } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter()

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; 

  if (!user) {
   router.push("/auth")
  }
   
  return (
    <section>
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <main>{children}</main>
    </section>
  );
}