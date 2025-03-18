import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "Password minimum length 8 characters")
    .required("Password is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case Character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password does not match")
    .required("Confirm Password is Required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is Required")
    .email("Invalid Email Format"),
  password: Yup.string().required("Password is Required"),
});

export const EmailSchema = Yup.object().shape({
  email: Yup.string().required().email(),
});

export const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password minimum length 8 characters")
    .required("Password is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case Character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password does not match")
    .required("Confirm Password is Required"),
});
