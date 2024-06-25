"use client";

import { CustomBreadcrumbType } from "@/app/_components/CustomBreadcrumbs/CustomBreadcrumbs";
import { PageContainer, SideNavType } from "@/app/_components/PageContainer/PageContainer";
import { getConfigUrlDataFromPath, routesConfigData, RoutesConfigUrl, RoutesUrl } from "@/app/_constants/routes";
import { SettingsOutlined } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const currentUrlData = useMemo(() => getConfigUrlDataFromPath(pathname), [pathname]);

  const sideNavs: SideNavType[] = useMemo(
    () => [
      {
        href: routesConfigData[RoutesConfigUrl.userSettings].href,
        text: "My Settings",
        icon: <SettingsOutlined />,
        isParent: true,
      },
      ...Object.values(routesConfigData).map((el) => ({
        href: el.href,
        text: el.title,
        icon: el.icon,
      })),
    ],
    [],
  );

  const breadcrumbs: CustomBreadcrumbType[] = useMemo(
    () => [
      { href: RoutesUrl.configuration, text: "My Settings" },

      {
        href: "",
        text: currentUrlData.title,
      },
    ],
    [currentUrlData],
  );

  return (
    <>
      <PageContainer
        sideNavs={sideNavs}
        breadcrumps={breadcrumbs}>
        {children}
      </PageContainer>
    </>
  );
}
