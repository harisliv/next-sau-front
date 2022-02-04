import { FC } from "react";
import classes from "./Form.module.scss";
import FormButton from "../layout/buttons/FormButton";
import EmptySpace from "../layout/util/EmptySpace";
import { useFormik } from "formik";
import * as yup from "yup";
import { changePassword } from "../lib/auth";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";


interface userInfoInterface {
  oldPassword: string;
  newPassword: string;
}

const initialValues: userInfoInterface = {
  oldPassword: "",
  newPassword: "",
};

const validationSchema = yup.object({
    oldPassword: yup
    .string()
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
    newPassword: yup
    .string()
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
});

const Admin: FC = () => {

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).then((result) => {
        resetForm();
        console.log(result);
      });
    },
  });

  return (
    <section className={classes.section_form}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <h1 className="title">Change password</h1>
        <EmptySpace pixels="1.8rem" />
        <label className={classes.label} htmlFor="oldPassword">
          Old Password
        </label>
        <div className={classes.inputContainer}>
          <input
            id="oldPassword"
            type="password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
        {formik.touched.oldPassword && formik.errors.oldPassword}
        <EmptySpace pixels="1.8rem" />
        <label className={classes.label} htmlFor="newPassword">
          New Password
        </label>
        <div className={classes.inputContainer}>
          <input
            id="newPassword"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        {formik.touched.newPassword && formik.errors.newPassword}

        <EmptySpace pixels="0.8rem" />
        <FormButton modifier="button--red" buttonType="submit" title="Submit" />
      </form>
    </section>
  );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });
    if(!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      }
    }
  
    return {
      props: {session}
    }
  }
