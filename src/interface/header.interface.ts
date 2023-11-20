import { ReactNode } from "react";

export interface ISectionHeaderProps {
  subHeader: string;
  mainHeader: string;
}

export interface IChildren {
  children: ReactNode;
}

export interface IStringProps {
  text: string;
}
