"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";

const ProfilePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user?.name || "");
      setUserAvatar(session.data.user?.image || "");
    }
  }, [session, status]);

  const handleProfileInfoUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaved(false);
    setIsSaving(true);

    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName, image: userAvatar }),
    });

    setIsSaving(false);

    if (response.ok) {
      setSaved(true);
    }
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const data = new FormData();

    data.set("file", file);
    setIsUploading(true);
    const res = await fetch("/api/upload", {
      method: "PATCH",
      body: data,
    });

    if (!res.ok) throw new Error(await res.text());

    const link = await res.json();

    setUserAvatar(link);
    setIsUploading(false);
  };

  if (status === "loading") {
    return (
      <p className="mt-8 mb-8 font-semibold text-gray-500 text-center text-2xl">
        Loading...
      </p>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className="mt-8 mb-8">
      <h1 className="mb-4 text-center text-primary text-4xl">Profile</h1>
      <div className="mx-auto max-w-md  ">
        {saved && <SuccessBox text="Profile saved!" />}
        {isSaving && <InfoBox text="Saving..." />}
        {isUploading && <InfoBox text="Uploading..." />}
        <div className="flex gap-2 items-center">
          <div className="p-2 rounded-lg max-w-[120px]">
            <Image
              className="rounded-lg mb-1"
              src={userAvatar || "/photgraphy.png"}
              alt="avatar"
              width={100}
              height={100}
              priority
            />

            <label>
              <input
                type="file"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <span className="block border rounded-lg p-2 text-center border-gray-300 cursor-pointer">
                Edit
              </span>
            </label>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="First and last name"
            />
            <input
              type="text"
              value={session.data?.user?.email || ""}
              disabled={true}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
