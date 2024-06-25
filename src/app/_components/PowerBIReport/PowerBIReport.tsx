import { usePowerBIReport } from "@/app/_hooks/usePowerBIReport";
import { PowerBIEmbed } from "powerbi-client-react";
import * as powerBiModels from "powerbi-models";
import { useCallback, useEffect, useState } from "react";

import { NEXT_PUBLIC_POWERBI_REPORT_URL, POWERBI_REPORT_ID } from "@/core/constants";

type PowerBIReportProps = {
  siteId: string;
  editMode: boolean;
};

export function PowerBIReport({ siteId, editMode }: PowerBIReportProps) {
  const [viewMode, setViewMode] = useState(0);
  const [permissions, setPermissions] = useState(0);

  useEffect(() => {
    if (editMode === true && viewMode === 0) {
      setViewMode(1);
      setPermissions(7);
    } else if (editMode === false && viewMode === 1) {
      setViewMode(0);
      setPermissions(0);
    }
  }, [editMode]);

  const embedToken = usePowerBIReport(siteId);
  const embedUrl = NEXT_PUBLIC_POWERBI_REPORT_URL;
  const powerBIReportId = POWERBI_REPORT_ID;

  const PowerBIEmbedComponent = useCallback(() => {
    const embedConfigObj = {
      accessToken: embedToken,
      embedUrl,
      id: powerBIReportId,
      permissions,
      settings: {
        // hideErrors: true, // TODO: check later for production
        panes: {
          filters: { expanded: false, visible: true },
        },
        layoutType: powerBiModels.LayoutType.Custom, // can be also: Master
        customLayout: {
          displayOption: powerBiModels.DisplayOption.FitToPage,
          reportAlignment: powerBiModels.ReportAlignment.Center,
        },
      },
      tokenType: powerBiModels.TokenType.Embed,
      type: "report",
      viewMode,
    };

    return <PowerBIEmbed embedConfig={embedConfigObj} />;
  }, [embedToken, permissions, viewMode]);

  return <PowerBIEmbedComponent />;
}
