"use client";

import styles from "./MultiSiteView.module.scss";
import { LargeCardSite } from "../../components/LargeCardSite/LargeCardSite";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { SmallCardSite } from "../../components/SmallCardSite/SmallCardSite";

export function MultiSiteView() {
  // const params = useParams<{ siteId: string }>();
  // const searchParams = useSearchParams();
  // const sitesIds = searchParams.get("sites-ids");

  const params = useParams<{ siteId: string }>();
  const searchParams = useSearchParams();
  const sitesIds = searchParams.get("sites-ids");

  const siteId1 = useMemo(() => {
    const queryParam = Number(sitesIds?.split(",")[0]);
    const idParam = Number(params.siteId);
    return queryParam > 0 ? queryParam : idParam;
  }, [params.siteId, sitesIds]);

  const siteId2 = useMemo(() => {
    const queryParam = Number(sitesIds?.split(",")[1]);
    return queryParam > 0 ? queryParam : 0;
  }, [sitesIds]);

  return (
    <div className={styles.container}>
      {siteId2 ? (
        <div className={styles.containerSmall}>
          <SmallCardSite siteId={siteId1} />
          <SmallCardSite siteId={siteId2} />
        </div>
      ) : (
        <div className={styles.containerCard}>
          <LargeCardSite siteId={siteId1} />
        </div>
      )}

      <div className={styles.containerDivider} />
      <div className={styles.containerPowerBi}>
        {/* <PowerBIEmbed
          embedConfig={reportConfig}
          cssClassName="power-bi-report-class"
        /> */}
      </div>
    </div>
  );
}
