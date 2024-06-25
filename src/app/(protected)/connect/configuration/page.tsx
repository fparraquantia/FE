import { getUsers } from "@/app/_pages/UserSettings/network/getUsers";
import ConfigurationView from "@/app/_views/Connect/Configuration/ConfigurationView";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";

export default async function ConfigurationPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.users(),
    queryFn: () => getUsers(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConfigurationView />;
    </HydrationBoundary>
  );
}
