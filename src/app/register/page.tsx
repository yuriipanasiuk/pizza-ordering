"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    setEmail("");
    setPassword("");
  };

  return (
    <section className="mt-8 mb-8">
      <h1 className="mb-4 text-center text-primary text-4xl">Register</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        <p className="my-4 text-center text-gray-500">or login with provider</p>
        <button className="flex justify-center gap-4">
          <Image
            src="/google-icon.png"
            alt="login with google"
            width={24}
            height={24}
          />
          Login with Google
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
