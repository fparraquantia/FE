import { useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import debounce from "lodash/debounce";

function usePushWithQueryString() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsData = useSearchParams();
  const idsSearchParams = searchParamsData.get("sites-ids");

  // Utiliza useCallback para memorizar la función debounced
  const debouncedPush = debounce((url) => {
    router.push(url);
  }, 300);

  const pushWithQueryString = useCallback(
    (name: string, value: string) => {
      const idParams = idsSearchParams || "";
      const searchParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      if (idParams !== value) {
        searchParams.set(name, value);
        const url =
          value && value !== ""
            ? `${pathname}?${searchParams.toString()}`
            : pathname;
        debouncedPush(url);
      }
    },
    [idsSearchParams, debouncedPush, pathname]
  );

  return pushWithQueryString;
}

export default usePushWithQueryString;
