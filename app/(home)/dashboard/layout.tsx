import DashboardHeader from "@/app/component/DashboardHeader/DashboardHeader";
import DashboardSidebar from "@/app/component/DashboardSidebar/DashboardSidebar";
import { ReactNode } from "react";

export const metadata = {
  title: 'Dashboard - my app',
  description: 'Dashboard area',
};

export default function DashboardLayout({ children }:{children :  ReactNode}) {
  return (
    <div className=" bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}