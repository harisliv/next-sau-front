import { FC } from "react";
import "./Form.scss";
import email from "../assets/icons/email.png";
import password from "../assets/icons/password.png";
import FormButton from "../layout/buttons/FormButton";
import LinkButton from "../layout/buttons/LinkButton";
import EmptySpace from "../layout/util/EmptySpace";
import { useFormik } from "formik";
import * as yup from "yup";
import Image from "next/image";

type newUser = {
  email: string;
  password: string;
  name: string;
  surname: string;
};

const initialValues: newUser = {
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
    .min(4, "Name should be of minimum 4 characters length")
    .required("Name is required"),
  surname: yup
    .string()
    .min(4, "Surname should be of minimum 4 characters length")
    .required("Surname is required"),
});

const RegistrationForm: FC = () => {

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      registerHandler({
        email: values.email,
        password: values.password,
        name: values.name,
        surname: values.surname,
      });
    },
  });

  const registerHandler = async (newUser: newUser) => {
    const response = await fetch("https://localhost:5000/api/users/signup", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(response.ok) {
      console.log("Success");
    }
    const data = await response.json();
    console.log(data);
  };

  return (
    <section className="section_form top_margin_big">
      <form onSubmit={formik.handleSubmit} className="form" autoComplete="off">
        <h1 className="form__title">Welcome back</h1>
        <p className="form__description top_margin_small">
          Log in using your account details
        </p>
        <EmptySpace pixels="1.8rem" />
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <div className="form__container form__container--withImg">
          <Image src={email} alt="icon" />
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
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <div className="form__container form__container--withImg">
          <Image src={password} alt="icon" />
          <input
            id="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.password && Boolean(formik.errors.password)}
        {formik.touched.password && formik.errors.password}
        <EmptySpace pixels="1.8rem" />
        <label className="form__label" htmlFor="name">
          Name
        </label>
        <div className="form__container">
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
        <label className="form__label" htmlFor="surname">
          Surname
        </label>
        <div className="form__container">
          <input
            id="surname"
            type="surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.surname && Boolean(formik.errors.surname)}
        {formik.touched.surname && formik.errors.surname}
        
        <EmptySpace pixels="0.8rem" />
        <FormButton
          modifier="form__button--red"
          buttonType="submit"
          title="Log In"
        />
        <LinkButton modifier="form__button--grey" />
      </form>
    </section>
  );
};

export default RegistrationForm;
