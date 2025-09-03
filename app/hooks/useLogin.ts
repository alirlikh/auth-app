import { useFormik } from "formik";
import { RandomUserResponse, useAuth } from "../_lib/authContext";
import { object, string } from "yup";

interface LoginFormValues {
  phone: string;
  password: string;
}

export function useLoginForm() {
  const { login  } = useAuth();

  const validationSchema = object({
    password: string().min(4, "Password too short").required("Password is required"),
    phone: string()
      .matches(/^09\d{9}$/, "Phone number must be 11 digits and start with 09")
      .required("Phone number is required"),
  });

  return useFormik<LoginFormValues>({
    initialValues: {  password: "", phone: "" },
    validationSchema,
    onSubmit: async () => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
        const data:RandomUserResponse  = await res.json();
        const userData = data.results[0];
        const myUser = {...userData , role:"admin"}
        login(myUser)

      } catch (err) {
        console.error(err);
        alert("Login failed");
      }
    },
  });
}
