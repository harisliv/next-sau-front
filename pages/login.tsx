import { getSession, signIn } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import classes from "./Form.module.scss";
import email from "../assets/icons/email.png";
import password from "../assets/icons/password.png";
import FormButton from "../layout/buttons/FormButton";
import LinkButton from "../layout/buttons/LinkButton";
import EmptySpace from "../layout/util/EmptySpace";
import { useFormik } from "formik";
import * as yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

interface signInResult {
  error: string | undefined;
  status: number;
  ok: boolean;
  url: string | null;
}

interface userInfoInterface {
  email: string;
  password: string;
}

const initialValues: userInfoInterface = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
});

const Login: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [wrongPass, setWrongPass] = useState(false);
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      }).then((result) => {
        if (result) {
          setWrongPass(false);
          if (!result['error']) {
            router.replace("/");
            resetForm();
          } else {
            setWrongPass(true);
          }
        }
      });
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className={classes.section_form}>
      {wrongPass && <h1>Wrong Credentials</h1>}
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <h1 className="title">Welcome back</h1>
        <p className={classes.description}>Log in using your account details</p>
        <EmptySpace pixels="1.8rem" />
        <label className={classes.label} htmlFor="email">
          Email
        </label>
        <div
          className={`${classes.inputContainer} ${classes.inputContainerWithImg}`}
        >
          <div className={classes.img_container}>
            <Image src={email} alt="icon" />
          </div>
          <input
            id="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.email && Boolean(formik.errors.email)}
        {formik.touched.email && formik.errors.email}
        <EmptySpace pixels="1.8rem" />
        <label className={classes.label} htmlFor="password">
          Password
        </label>
        <div
          className={`${classes.inputContainer} ${classes.inputContainerWithImg}`}
        >
          <div className={classes.img_container}>
            <Image src={password} alt="icon" />
          </div>
          <input
            id="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.password && Boolean(formik.errors.password)}
        {formik.touched.password && formik.errors.password}
        <div>
          <Link href="/">
            <a className={classes.forgot_pass}>Forgot Pass</a>
          </Link>
        </div>
        <EmptySpace pixels="0.8rem" />
        <FormButton modifier="button--red" buttonType="submit" title="Log In" />
        <LinkButton
          url="/register"
          modifier="button--grey"
          text="Create account"
        />
      </form>
    </section>
  );
};

export default Login;
