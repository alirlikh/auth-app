import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useAuth } from "../_lib/authContext";

interface LoginFormValues {
  phone: string;
  password: string;
}

export function useLoginForm() {
  const { setUser } = useAuth();
  const router = useRouter();

  const validationSchema = Yup.object({
    password: Yup.string().min(4, "Password too short").required("Password is required"),
    phone: Yup.string()
      .matches(/^09\d{9}$/, "Phone number must be 11 digits and start with 09")
      .required("Phone number is required"),
  });

  return useFormik<LoginFormValues>({
    initialValues: {  password: "", phone: "" },
    validationSchema,
    onSubmit: async (_values) => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
        const data = await res.json();
        const userData = data.results[0];

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        router.push("/dashboard");
      } catch (err) {
        console.error(err);
        alert("Login failed");
      }
    },
  });
}
