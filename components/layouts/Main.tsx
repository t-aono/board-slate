import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return <main className="container mx-auto px-4 my-4">{children}</main>;
}
