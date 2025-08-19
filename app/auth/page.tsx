import { Metadata } from "next";
import LoginForm from "../component/LoginForm/LoginForm"

export const metadata: Metadata = {
  title: 'my App | login',
};

const page = () => {
  return (
    <LoginForm />
  )
}
export default page