"use client";

import styles from "./LoginForm.module.scss";
import BaseInput from "../BaseInput/BaseInput";
import BaseButton from "../BaseButton/BaseButton";
import { useLoginForm } from "@/app/hooks/useLogin";


export default function LoginForm() {
   const formik = useLoginForm();

  return (
      <form onSubmit={formik.handleSubmit} className={styles.form}>
      <BaseInput
        label="Phone Number"
        name="phone"
        placeholder="09123456789"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phone && !!formik.errors.phone}
      />
      {formik.touched.phone && formik.errors.phone && (
        <p className={styles.error}>{formik.errors.phone}</p>
      )}

      <BaseInput
        label="Password"
        type="password"
        name="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && !!formik.errors.password}
      />
      {formik.touched.password && formik.errors.password && (
        <p className={styles.error}>{formik.errors.password}</p>
      )}

      <BaseButton type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Logging in..." : "Login"}
      </BaseButton>
    </form>
  );
}
