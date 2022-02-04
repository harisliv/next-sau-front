import { signIn } from "next-auth/react";
import { FC, useContext } from "react";
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
import { createUser } from "../lib/auth";

interface signInResult {
  error: string | undefined;
  status: number;
  ok: boolean;
  url: string | null;
}

interface userInfoInterface {
  email: string;
  password: string;
  name: string;
  surname: string;
}

const initialValues: userInfoInterface = {
  email: "",
  password: "",
  name: "",
  surname: "",
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
  name: yup
    .string()
    .min(4, "name should be of minimum 4 characters length")
    .required("name is required"),
  surname: yup
    .string()
    .min(4, "surname should be of minimum 4 characters length")
    .required("surname is required"),
});

const Register: FC = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      createUser(values.email, values.password, values.name, values.surname)
      .then((result) =>{
        resetForm();
        console.log(result)
        router.replace("/login");
      }
      );
    },
  });

  return (
    <section className={classes.section_form}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <h1 className="title">Register</h1>
        <p className={classes.description}>Create an account on Newsportal</p>
        <EmptySpace pixels="1.8rem" />
        <label className={classes.label} htmlFor="name">
          Name
        </label>
        <div className={classes.inputContainer}>
          <input
            id="name"
            type="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.name && Boolean(formik.errors.name)}
        {formik.touched.name && formik.errors.name}
        <EmptySpace pixels="1.8rem" />
        <label className={classes.label} htmlFor="surname">
          Surname
        </label>
        <div className={classes.inputContainer}>
          <input
            id="surname"
            type="surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.surname && Boolean(formik.errors.surname)}
        {formik.touched.surname && formik.errors.surname}
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
        <EmptySpace pixels="0.8rem" />
        <FormButton
          modifier="button--red"
          buttonType="submit"
          title="Register"
        />
        <LinkButton
          url="/login"
          modifier="button--grey"
          text="I have an account"
        />
      </form>
    </section>
  );
};

export default Register;
