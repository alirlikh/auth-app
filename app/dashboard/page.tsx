import { Metadata } from "next";
import Dashboard from "../component/Dashboard/Dashboard"

export const metadata: Metadata = {
  title: 'my App',
};

const page = () => {
  return (
   <Dashboard />
  )
}
export default page