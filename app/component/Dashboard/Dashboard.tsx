"use client";

import { useAuth } from "@/app/_lib/authContext";
import styles from "./Dashboard.module.scss";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className={styles.dashboardWrapper}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.welcome}>
        Hi {user?.name.first} {user?.name.last} — Welcome to the admin dashboard. You are logged in.
      </p>
    </div>
  );
}
