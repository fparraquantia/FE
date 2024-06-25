"use client";

import "@/_styles/global.scss";
import srcLogo from "@/assets/images/Kurita Connect 360 - Logo-03.png";
import srcLogoMicrosft from "@/assets/images/microsoft-logo.png";
import srcBack from "@/assets/images/portal_3.png";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { RoutesUrl } from "../_constants/routes";
import { logIn } from "../auth";
import styles from "./page.module.scss";

export default function Login() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status == "authenticated" && session.data.user.error != "RefreshAccessTokenError") {
      router.push(RoutesUrl.map);
    }
  }, [session.status, router]);

  return (
    <div className={styles.container}>
      <Image
        className={styles.containerBackground}
        src={srcBack}
        alt="portal-background"
      />
      <div className={styles.containerLogin}>
        <Image
          className={styles.containerLoginLogo}
          src={srcLogo}
          alt="logo-kurita"
        />
        <div className={styles.containerLoginContent}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => logIn()}>
            <div className={styles.containerLoginContentButtonContent}>
              <Image
                src={srcLogoMicrosft}
                alt="logo-microsoft"
              />
              <span>Sign in with Microsoft</span>
            </div>
          </Button>
        </div>
      </div>
      <div className={styles.containerPrivacy}>
        <span>
          By using the site you agree to our
          <a href="https://www.kurita.eu/en/privacy-policy">privacy policy</a>
          and that we are collecting cookies to improve user experience.
        </span>
        <div
          className={styles.containerPrivacyButton}
          ng-click="hideMess()">
          Got it
        </div>
      </div>
    </div>
  );
}
