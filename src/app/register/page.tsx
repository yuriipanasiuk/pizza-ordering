"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { push } = useRouter();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      push("/login");
    }

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
        <button
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
          Existing acount?{" "}
          <Link href="/login" className="underline hover:text-primary">
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
