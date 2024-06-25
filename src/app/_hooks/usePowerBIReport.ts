import { useState, useEffect } from "react";

export function usePowerBIReport(siteId: string) {
  const [embedToken, setEmbedToken] = useState("");

  useEffect(() => {
    async function fetchEmbedToken() {
      const response = await fetch(`/api/powerbi?siteId=${siteId}`);
      const { embedToken } = await response.json();
      setEmbedToken(embedToken);
    }

    fetchEmbedToken();
  }, [siteId]);

  return embedToken;
}