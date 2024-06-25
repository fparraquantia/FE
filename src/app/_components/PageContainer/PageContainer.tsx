"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

import { CustomBreadcrumbs, CustomBreadcrumbType } from "../CustomBreadcrumbs/CustomBreadcrumbs";
import styles from "./PageContainer.module.scss";

export interface SideNavType {
  href: string;
  text: string;
  icon?: ReactNode;
  isParent?: boolean;
}

export interface PageContainerProps {
  children: ReactNode;
  sideNavs?: SideNavType[];
  breadcrumps?: CustomBreadcrumbType[];
  ElementRight?: ReactNode;
  ElementNav?: ReactNode;
  fullScreen?: boolean;
}

export function PageContainer({ children, sideNavs, breadcrumps, ElementRight, ElementNav, fullScreen = false }: PageContainerProps) {
  console.log(ElementNav)
  const [hide, setHide] = useState(false);
  const pathname = usePathname();
  return (
    <div className={`${styles.container} ${fullScreen ? styles.containerFullScreen : ""}`}>
      {breadcrumps ? (
        <>
          <div className={`${styles.containerTop} ${!sideNavs ? styles.containerTopSpace : ""}`}>
            <div className={styles.containerTopLeft}>
              {sideNavs && (
                <Button
                  className={`${styles.containerTopLeftButton} ${hide ? styles.containerTopLeftButtonHide : ""}`}
                  onClick={() => setHide((prev) => !prev)}>
                  <div className={styles.containerTopLeftButtonBurguer}>
                    <div className={styles.containerTopLeftButtonBurguerLine} />
                  </div>
                </Button>
              )}
              <CustomBreadcrumbs breadcrumps={breadcrumps} />
            </div>
            <div className={styles.containerTopRight}>{ElementRight}</div>
          </div>
          <div className={styles.containerContent}>
            {sideNavs && (
              <div className={`${styles.containerContentSidePanel} ${hide ? styles.containerContentSidePanelHide : ""}`}>
                <div className={styles.containerContentSidePanelWrapper}>
                  <div className={styles.containerContentSidePanelWrapperNav}>
                    {sideNavs.map((nav, index) => (
                      <Button
                        key={index}
                        LinkComponent={Link}
                        sx={{
                          // With Icon
                          width: 270,
                          height: 50,
                          justifyContent: "space-between",
                          paddingLeft: nav.icon ? 2 : 4,
                          paddingRight: 2,
                        }}
                        href={nav.href}
                        className={
                          nav.href == pathname || (nav.isParent && pathname.startsWith(nav.href))
                            ? styles.containerContentSidePanelWrapperNavActive
                            : ""
                        }
                        variant="text"
                        endIcon={nav.icon || ""}>
                        <span>{nav.text}</span>
                      </Button>
                    ))}
                  </div>

                  {ElementNav && (
                    <div className={styles.containerContentSidePanelWrapperElement}>
                      <div className={styles.containerContentSidePanelWrapperElementContent}>{ElementNav}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className={`${styles.containerContentPage} ${!sideNavs ? styles.containerContentPagePaddingLeft : ""}`}>
              <div className={styles.containerContentPageScrollable}>{children}</div>
            </div>
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
