import type { ReactNode } from "react";
import css from "./layout.module.css";

export default function NotesLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal?: ReactNode;
}) {
  return (
    <div className={css.layout}>
      {children}
      {modal}
    </div>
  );
}
