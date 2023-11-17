"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn("credentials", { email, password, callbackUrl: "/" });
    setEmail("");
    setPassword("");
  };

  return (
    <section className="mt-8 mb-8">
      <h1 className="mb-4 text-center text-primary text-4xl">Login</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p className="my-4 text-center text-gray-500">or login with provider</p>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex justify-center gap-4"
        >
          <Image
            src="/google-icon.png"
            alt="login with google"
            width={24}
            height={24}
          />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Do not have acount?{" "}
          <Link href="/register" className="underline hover:text-primary">
            Register here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
