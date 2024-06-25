"use client";

import { CustomBreadcrumbType } from "@/app/_components/CustomBreadcrumbs/CustomBreadcrumbs";
import { PageContainer, SideNavType } from "@/app/_components/PageContainer/PageContainer";
import { TreeSites } from "@/app/_components/TreeSites/TreeSites";
import { getRoutesSiteData, getUrlDataFromPath, RoutesSiteUrl, RoutesUrl } from "@/app/_constants/routes";
import { useGetSite } from "@/app/_hooks/useSites";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function PrivateLayout({ params, children }: { params: { siteId: number }; children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const sitesIds = searchParams.get("sites-ids");

  const siteId = useMemo(() => {
    const queryParam = Number(sitesIds?.split(",")[0]);
    const idParam = Number(params.siteId);
    return queryParam > 0 ? queryParam : idParam;
  }, [params.siteId, sitesIds]);

  const pathname = usePathname();
  const { data: dataSite } = useGetSite(siteId);

  const currentUrlData = useMemo(() => getUrlDataFromPath(params.siteId, pathname), [params.siteId, pathname]);

  const sideNavs: SideNavType[] = useMemo(
    () =>
      Object.values(getRoutesSiteData(siteId)).map((el) => ({
        href: el.href,
        text: el.title,
        icon: el.icon,
      })),
    [siteId],
  );

  const breadcrumbs: CustomBreadcrumbType[] = useMemo(
    () => [
      { href: RoutesUrl.siteList, text: "My Sites" },
      ...(currentUrlData.type != RoutesSiteUrl.manualEntry
        ? [
            {
              href: getRoutesSiteData(siteId)[RoutesSiteUrl.overview].href,
              text: dataSite?.name || "",
            },
          ]
        : []),
      {
        href: "",
        text: currentUrlData.title,
      },
    ],
    [dataSite, siteId, currentUrlData],
  );

  const ElementNav = useMemo(() => {
    if (getUrlDataFromPath(params.siteId, pathname).type == RoutesSiteUrl.manualEntry) {
      return <TreeSites type="double" />;
    }

    return undefined;
  }, [params.siteId, pathname]);

  return (
    <>
      <PageContainer
        sideNavs={sideNavs}
        breadcrumps={breadcrumbs}
        ElementNav={ElementNav}>
        {children}
      </PageContainer>
    </>
  );
}
