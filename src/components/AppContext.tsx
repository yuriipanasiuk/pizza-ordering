"use client";

import { SessionProvider } from "next-auth/react";
import { IChildren } from "@/interface/header.interface";

const AppProvider = ({ children }: IChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AppProvider;
