import type { NextPage } from "next";
import React, { useContext, useRef, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import config from "../../config";
import { AuthContext } from "../_app";
import { AccountInfoType, getAccountInfo } from "../../helper/account";

const Login: NextPage = () => {
  const [loginError, setLoginError] = useState("");
  const { isauth, setAuth } = useContext(AuthContext);

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  if (isauth) {
    getAccountInfo()
      .then((res: AccountInfoType) => {
        setAuth(true);
        window.location.href = "/";
      })
      .catch((err: AxiosError) => {
        sessionStorage.removeItem("access_token");
        setAuth(false);
        window.location.reload();
      });
  }
  type LoginResponse = {
    access_token: string;
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    axios
      .post(`${config.apiUrl}/login`, {
        username: username.current?.value,
        password: password.current?.value,
      })
      .then((res: AxiosResponse<LoginResponse>) => {
        // console.log(res.data.access_token);
        sessionStorage.setItem("access_token", res.data.access_token);
        setLoginError("");
        setAuth(true);
      })
      .catch((err: AxiosError<string>) => {
        if (err.response) {
          // console.log(err.response.data);
          setLoginError(err.response.data);
        }
      });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        {!isauth ? (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm shadow-md md:pl-10 px-5"
          >
            <h1 className="text-[2rem] text-center text-blue-900 font-semibold mb-5">
              Login
            </h1>
            <div className="md:flex md:items-center mb-6">
              <div className="md:1/3">
                <label
                  htmlFor="username"
                  className="text-blue-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  username
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  ref={username}
                  className="bg-gray-100 border border-gray-200 rounded w-full py-2 px-4 text-blue-700 focus:outline-none focus:bg-white focus:border-blue-500"
                  id="username"
                  type="text"
                  placeholder="username"
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:1/3">
                <label
                  htmlFor="password"
                  className="text-blue-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  password
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  ref={password}
                  className="bg-gray-100 border border-gray-200 rounded w-full py-2 px-4 text-blue-700 focus:outline-none focus:bg-white focus:border-blue-500"
                  id="password"
                  type="password"
                  placeholder="password"
                  required
                />
              </div>
            </div>
            {loginError != "" ? (
              <div className="text-center pb-5">
                <p className="text-red-500">{loginError}</p>
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex mb-6 justify-center">
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-400 rounded">
                Login
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <h1 className="text-[2rem] text-center text-blue-900 font-semibold mb-5">
              You are already logged in
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
