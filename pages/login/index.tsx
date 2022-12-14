import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getTokenFromStorage, setTokenToStorage } from "../../utils/token";

type IRoles = "user" | "admin";

interface ILoginForm {
  email: string;
  password: string;
  role: IRoles;
}

const LoginIndex = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<ILoginForm>({
    email: "",
    password: "",
    role: "user"
  });

  const roles = ["user", "admin"];

  const proceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.role === "user") {
      setTokenToStorage("user");
      router.push("/shapes");
    } else {
      Cookies.set("email", loginData.email);
      setTokenToStorage("admin");
      router.push("/admin");
    }
  };

  return (
    <div className="login-page">
      <form className="login-container">
        <h1 className="title">Login</h1>

        <label htmlFor="loginName">Email address</label>
        <input
          type="email"
          value={loginData.email}
          id="loginName"
          className="login-input"
          onChange={e => setLoginData({ ...loginData, email: e.target.value })}
        />

        <label htmlFor="loginPW" className="login-password">
          Password
        </label>
        <input
          type="password"
          className="login-input"
          value={loginData.password}
          id="loginPW"
          onChange={e =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />

        <div className="login-roles-radios">
          {roles?.map(role => (
            <div className="login-role-radio" key={role}>
              <input
                type="radio"
                name="role"
                id={role}
                checked={loginData?.role === role}
                onChange={() =>
                  setLoginData({ ...loginData, role: role as IRoles })
                }
              />
              <label htmlFor={role}>{role}</label>
            </div>
          ))}
        </div>

        <button
          className="login-btn"
          onClick={proceed}
          disabled={!loginData.email || !loginData.password}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { req } = context;
  const { cookie } = req.headers;

  if (getTokenFromStorage(cookie) === "user") {
    return {
      redirect: {
        permanent: false,
        destination: "/shapes"
      }
    };
  } else if (getTokenFromStorage(cookie) === "admin") {
    return {
      redirect: {
        permanent: false,
        destination: "/admin"
      }
    };
  } else {
    return {
      props: {}
    };
  }
};

export default LoginIndex;
