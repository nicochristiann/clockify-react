import Cookies from "js-cookie";

export const login = async (user) => {
  const res = await fetch(
    "https://clocklify-api.onrender.com/api/v1/user/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }
  );
  const response = res.ok;
  const data = await res.json();

  if (!response) {
    const errorMessage = data.errors.message;
    return [errorMessage, response];
  }

  // // Simpan token ke cookies (berlaku selama 1 hari)
  Cookies.set("token", data.token, { expires: 1 });
  return ["", response];
};

export const register = async (
  { email, password, confirmPassword },
  setStatus
) => {
  const res = await fetch(
    "https://clocklify-api.onrender.com/api/v1/user/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, confirmPassword }),
    }
  );
  // console.log(res);
  const response = res.ok;
  const data = await res.json();

  if (!response) {
    const errorMessage = data.errors.email.msg;
    return [errorMessage, response];
  }

  setStatus(data.status);
  return ["", response];
};

export const verifyEmail = async (location, setIsVerified) => {
  const params = new URLSearchParams(location.search);
  const emailToken = params.get("emailToken");
  const res = await fetch(
    `https://clocklify-api.onrender.com/api/v1/user/verifyemail`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailToken }),
    }
  );
  const data = await res.json();

  if (data.status === "success") {
    setIsVerified("Your Email Has Been Verified!");
  }
};

export const forgotPassword = async (email) => {
  const res = await fetch(
    "https://clocklify-api.onrender.com/api/v1/user/forgotpassword",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  );
  const data = await res.json();
  console.log(data);
};

export const resetPassword = async (
  resetToken,
  newPassword,
  confirmPassword
) => {
  const res = await fetch(
    "https://clocklify-api.onrender.com/api/v1/user/resetpassword",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetToken, newPassword, confirmPassword }),
    }
  );
  const data = await res.json();
  console.log(data);
  return;
};
