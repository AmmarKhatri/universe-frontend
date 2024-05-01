"use client";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseDispatch, useDispatch } from "react-redux";
import { loginUser } from "../redux/states/userReducer";
export default function SignIn(){
  const router = useRouter();
  const {toast} = useToast()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestBody = {
      email,
      password,
    };
    axios.post(`${process.env.NEXT_PUBLIC_APIURL}/users/login`, requestBody)
      .then(response => {
        console.log("Sign up successful:", response.data);
        if (response.data.error == 0){
          toast({
            title: "Signed In!",
            description: "Welcome Back! User",
          })
          dispatch(loginUser({access_token: response.data.access_token, refresh_token: response.data.refresh_token}));
          //successfully route to login
          router.push('/dashboard')
        } else {
          toast({
            title: "Could not login",
            description: response.data.message,
          })
        }
      })
      .catch(error => {
        console.error("Error signing up:", error);
        if (error.response.data.error == 1){
          toast({
            title: "Error",
            variant: "destructive",
            description: error.response.data.message,
          })
        } else {
          toast({
            title: "Internal Server Error",
            variant: "destructive",
            description: "Something is wrong with the server",
          })
        }
      });
    };
    return(
    <>
          <div className="flex min-h-full h-screen bg-white flex-1">
            <div className="flex flex-1 flex-col justify-center px-4 py-8 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
              <div className="mx-auto w-full max-w-sm lg:w-96">
                <div>
                  <img
                    className="h-200 w-auto"
                    src="/universe0logo.webp"
                    alt="Universe"
                  />
                  <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Not a member?{' '}
                    <a href="/signup" className="font-semibold text-gray-600 hover:text-gray-500">
                      Sign up now!
                    </a>
                  </p>
                </div>
    
                <div className="mt-10">
                  <div>
                    <form action="#" method="POST" onSubmit={handleSignIn} className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            onChange={handleEmailChange}
                            className="block w-full px-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset text-black ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
    
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                          Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            onChange={handlePasswordChange}
                            className="block w-full px-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset text-black ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
    
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-600"
                          />
                          <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                            Remember me
                          </label>
                        </div>
    
                        <div className="text-sm leading-6">
                          <a href="#" className="font-semibold text-gray-600 hover:text-gray-500">
                            Forgot password?
                          </a>
                        </div>
                      </div>
    
                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
    
                  
                </div>
              </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                alt=""
              />
            </div>
          </div>
        </>
      )
}