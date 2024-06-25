"use server";

import "@/_styles/global.scss";

import styles from "./layout.module.scss";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  //await requireUser();

  return <div className={styles.container}>{children}</div>;
}
