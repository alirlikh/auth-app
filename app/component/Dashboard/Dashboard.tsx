"use client";

import { useAuth } from "@/app/_lib/authContext";
import BaseButton from "../BaseButton/BaseButton";
import styles from "./Dashboard.module.scss";

export default function DashboardPage() {
  const { user , logout} = useAuth();

  return (
    <div className={styles.dashboardWrapper}>
      <h1 className={styles.title}>Dashboard</h1>
       {user ? (
        <>
          <p>
            Hi {user.name.first} {user.name.last}, welcome to the dashboard.
          </p>
          <BaseButton onClick={logout}>Logout</BaseButton>
        </>
      ) : (
        <p>Please login.</p>
      )}
    </div>
  );
}
