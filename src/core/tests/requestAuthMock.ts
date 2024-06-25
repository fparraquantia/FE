import * as sessionServer from "@/app/session.server";
import { vi } from "vitest";

export const requestAuthMock = () => {
  const refreshAccessTokenMock = vi.spyOn(sessionServer, "getCurrentUser");
  // @ts-expect-error we only need id_token for testing
  refreshAccessTokenMock.mockImplementation(() => Promise.resolve({ id_token: "value" }));
};
