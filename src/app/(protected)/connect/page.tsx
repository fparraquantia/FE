"use server";
import { MapView } from "../../_views/Connect/MapView";
import { PageContainer } from "@/app/_components/PageContainer/PageContainer";

export default async function Challenges() {
  return (
    <PageContainer fullScreen>
      <MapView />
    </PageContainer>
  );
}
