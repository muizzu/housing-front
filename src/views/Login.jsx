import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";

export default function Login() {
  // const { signIn } = useAuth();
  let navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onClickShowPassword = (e) => {
    e.preventDefault();
    setPasswordShow(!passwordShow);
  };



  const onClickSignIn = async (e) => {
    e.preventDefault();
    if (email && password) {

      try {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: new URLSearchParams({ email: email, password: password })
        };

        // fetch('http://localhost:4000/token', options)
        //   .then(response => response.json())
        //   .then(response => {
        //     if(response.)
        //     try {
        //       navigate("/");
        //     } catch (error) {
        //       console.log(`🚀 ~ signIn error`, error);
        //     }
        //   })
        //   .catch(err => console.error(err));

        const response = await fetch('https://housing-api.stag.mpao.mv/auth/signin', options);
        if (response.ok) {
          const result = await response.json();
          localStorage.setItem("token", result.access_token);
          try {
            navigate("/");
          } catch (error) {
            console.log(`🚀 ~ signIn error`, error);
          }
        } else {
          setError(`Error! status: ${response.status}`);

        }

      } catch (error) {
        setError(error.message);

      }
    }
  };

  return (
    <>
      <MainLayout>
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>

          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="py-8 px-4 sm:rounded-lg sm:px-10">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={(e) => {
                        e.preventDefault();
                        setEmail(e.target.value);
                      }}
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative mt-1 flex items-center">
                    <input
                      id="password"
                      name="password"
                      type={passwordShow ? "text" : "password"}
                      autoComplete="current-password"
                      onChange={(e) => {
                        e.preventDefault();
                        setPassword(e.target.value);
                      }}
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                      <button
                        onClick={(e) => {
                          onClickShowPassword(e);
                        }}
                        className="inline-flex items-center rounded px-2 font-sans text-sm font-medium text-gray-400"
                      >
                        {passwordShow ? (
                          <EyeIcon className="h-6 w-6 text-blue-500" />
                        ) : (
                          <EyeSlashIcon className="h-6 w-6 text-blue-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="mt-2 text-sm text-gray-700">
                    {error}
                  </p>
                </div>

                <div>
                  <button
                    onClick={(e) => {
                      onClickSignIn(e);
                    }}
                    className="flex-shrink-0 px-4 py-2 border border-transparent text-lg font-bold rounded-lg shadow-sm text-white bg-spblue/50 hover:bg-spblue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-spblue w-full"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
