'use client'
// Import necessary modules
import React, { useState } from "react";
import axios from 'axios';
import RoleSelect from "@/components/roleSelect";
import { CalendarDate } from "@/components/ui/DatePicker";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

// Define the list of roles
const roles = [
  { id: 'SPONSOR', name: 'Sponsor' },
  { id: 'TEACHER', name: 'Teacher' },
  { id: 'ALUMNI', name: 'Alumni' },
  { id: 'STUDENT', name: 'Student' },
];

// Define the SignUp component
export default function SignUp() {
  // State variables
  const {toast} = useToast();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [selectedRole, setSelectedRole] = useState(roles[3]);
  const router = useRouter();
  // Event handlers
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestBody = {
      email,
      password,
      username,
      dateOfBirth: dateOfBirth ? dateOfBirth.toISOString() : "",
      role: selectedRole.id
    };
    axios.post(`${process.env.NEXT_PUBLIC_APIURL}/users/register`, requestBody)
      .then(response => {
        console.log("Sign up successful:", response.data);
        if (response.data.error == 0){
          toast({
            title: "Registered!",
            description: response.data.message,
          })
          //successfully route to login
          router.push('/signin')
        } else {
          toast({
            title: "Could not register",
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

  return (
    <div className="flex min-h-full h-screen bg-white flex-1 flex-col justify-center px-6 py-4 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-80 w-auto"
          src="/universe0logo.webp"
          alt="Universe Logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-3" onSubmit={handleSignUp}>
          <RoleSelect selected={selectedRole} setSelected={setSelectedRole} roles={roles} />
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={handleUsernameChange}
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
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
                value={email}
                onChange={handleEmailChange}
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
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
                value={password}
                onChange={handlePasswordChange}
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
              Date of birth
            </label>
            <CalendarDate date={dateOfBirth} setDate={setDateOfBirth} />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <a
            href="/signin"
            className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
          >
            Sign In now!
          </a>
        </p>
      </div>
    </div>
  );
}