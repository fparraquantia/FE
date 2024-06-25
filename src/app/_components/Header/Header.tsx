"use client";

import styles from "./Header.module.scss";
import { usePathname, useRouter } from "next/navigation";
import srcLogo from "@/assets/images/tedagua-logo-completo.png";
import srcAvatar from "@/assets/images/avatar-hombre.png";
import Image from "next/image";
import {
  AssessmentOutlined,
  Logout,
  MoreHoriz,
  NotificationsNoneOutlined,
  PersonOutline,
  PlaceOutlined,
  Settings,
  SettingsOutlined,
} from "@mui/icons-material";
import { Button, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { RoutesUrl, RouteTitle } from "@/app/_constants/routes";
import { Input } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const { Search } = Input;

export function Header() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <Image
          src={srcLogo}
          priority={true}
          alt="logo-tedagua"
          width="0"
          height="0"
          sizes="100hw"
          style={{
            height: "100%",
            width: "auto",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        />
        <div className={styles.containerLeftRoutes}>
          <Button
            sx={{ width: 100, gap: 0.2 }}
            startIcon={<PlaceOutlined />}
            variant="text"
            href={RoutesUrl.map}
            className={
              RoutesUrl.map == pathname ? styles.containerLeftRoutesActive : ""
            }
            component={Link}
          >
            <span>{RouteTitle[RoutesUrl.map]}</span>
          </Button>
          <Button
            sx={{ width: 100, gap: 0.2 }}
            startIcon={<PersonOutline />}
            variant="text"
            href={RoutesUrl.siteList}
            className={
              pathname.startsWith(RoutesUrl.siteList)
                ? styles.containerLeftRoutesActive
                : ""
            }
            component={Link}
          >
            <span>{RouteTitle[RoutesUrl.siteList]}</span>
          </Button>
          <Button
            sx={{ width: 100, gap: 0.2 }}
            startIcon={<SettingsOutlined />}
            variant="text"
            href={RoutesUrl.configuration}
            className={
              pathname.startsWith(RoutesUrl.configuration)
                ? styles.containerLeftRoutesActive
                : ""
            }
            component={Link}
          >
            <span>{RouteTitle[RoutesUrl.configuration]}</span>
          </Button>
          <Button
            sx={{ width: 100, gap: 0.2 }}
            startIcon={<AssessmentOutlined />}
            variant="text"
            href={RoutesUrl.reports}
            className={
              pathname.startsWith(RoutesUrl.reports)
                ? styles.containerLeftRoutesActive
                : ""
            }
            component={Link}
          >
            <span>{RouteTitle[RoutesUrl.reports]}</span>
          </Button>
          <Button
            sx={{ width: 100, gap: 0.2 }}
            startIcon={<NotificationsNoneOutlined />}
            variant="text"
            href={RoutesUrl.alerts}
            className={
              pathname.startsWith(RoutesUrl.alerts)
                ? styles.containerLeftRoutesActive
                : ""
            }
            component={Link}
          >
            <span>{RouteTitle[RoutesUrl.alerts]}</span>
          </Button>
        </div>
      </div>
      <div className={styles.containerRight}>
        <Search
          placeholder="Search..."
          aria-placeholder="Search..."
          allowClear
          // onSearch={onSearch}
          style={{
            width: 250,
          }}
        />
        <div className={styles.containerRightUser}>
          <p>{session?.user.name || "Alvaro Díaz"}</p>
          <Button
            onClick={handleClick}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Image
              src={srcAvatar}
              alt="avatar-user"
              style={{ borderRadius: 50 }}
              height={40}
              width={40}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            />
            <MoreHoriz />
          </Button>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            className={styles.containerRightUserMenu}
          >
            <MenuItem onClick={() => router.push(RoutesUrl.configuration)}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <p>Settings</p>
            </MenuItem>
            <MenuItem onClick={() => signOut()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <p>Logout</p>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
