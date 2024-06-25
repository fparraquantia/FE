"use client";

import { PowerBIReport } from "@/app/_components/PowerBIReport/PowerBIReport";
import { useUserCanEditPowerBIReport } from "@/app/_hooks/useUserCanEditPowerBIReport";
import { Switch } from "antd";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { LargeCardSite } from "../components/LargeCardSite/LargeCardSite";
import styles from "./SiteOverview.module.scss";

export function SiteOverview() {
  const [editMode, setEditMode] = useState(false);
  const params = useParams<{ siteId: string }>();
  const searchParams = useSearchParams();
  const sitesIds = searchParams.get("sites-ids");

  const siteId = useMemo(() => {
    const queryParam = Number(sitesIds?.split(",")[0]);
    const idParam = Number(params.siteId);
    return queryParam > 0 ? queryParam : idParam;
  }, [params.siteId, sitesIds]);

  const userHaveEditPermisson = useUserCanEditPowerBIReport();

  return (
    <div className={styles.container}>
      <div className={styles.containerCard}>
        <LargeCardSite siteId={siteId} />
      </div>

      <div className={styles.containerDivider} />
      {userHaveEditPermisson && (
        <div className={styles.containerPowerBISettings}>
          <Switch
            checkedChildren="Edit"
            unCheckedChildren="View"
            onChange={(value) => {
              setEditMode(value);
            }}
          />
        </div>
      )}
      <div className={styles.containerPowerBi}>
        {/* <PowerBIEmbed
          embedConfig={reportConfig}
          cssClassName="power-bi-report-class"
        /> */}
         <iframe
      title="ex"
      src="https://app.powerbi.com/reportEmbed?reportId=56486d7f-458b-4950-9f08-8cf610b9c37f&autoAuth=true&ctid=caec34b8-bf95-4894-afcf-1364d9f54752"
   
      allowFullScreen={true}
      class="responsive-iframe"
      style={{width: '100%', height: '100%'}}></iframe>
      </div>
    </div>
  );
}
