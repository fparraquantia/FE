// import { beforeEach, describe, expect, test, vi } from "vitest";
// import { z } from "zod";

// import { FetchMock } from "@/core/tests/fetchMock";

// import { getFetcher } from "./fetcher";

// describe("fetcher", () => {
//   const successZod = z.object({
//     data: z.literal("Success"),
//   });

//   beforeEach(() => {
//     vi.restoreAllMocks();
//   });

//   test("backend returns a success response", async () => {
//     const consoleMock = vi.spyOn(console, "error").mockImplementation(() => undefined);
//     new FetchMock({ data: "Success" });

//     const data = await getFetcher({ successZod, url: "url", requiresAuth: false });
//     expect(data).toEqual({ data: "Success" });
//     expect(consoleMock).toHaveBeenCalledTimes(0);
//   });

//   test("backend returns a success response but zod fails", async () => {
//     const consoleMock = vi.spyOn(console, "error").mockImplementation(() => undefined);
//     new FetchMock({ data: "Wrong" });

//     try {
//       await getFetcher({ successZod, url: "url", requiresAuth: false });
//     } catch (exc) {
//       expect(exc).toEqual({ detail: "Ha habido un error." });
//       expect(consoleMock).toHaveBeenCalledTimes(1);
//     }
//   });

//   test("backend returns a success response but it's wrong formatted", async () => {
//     const consoleMock = vi.spyOn(console, "error").mockImplementation(() => undefined);
//     new FetchMock("Wrong");

//     try {
//       await getFetcher({ successZod, url: "url", requiresAuth: false });
//     } catch (exc) {
//       expect(exc).toEqual({ detail: "Ha habido un error." });
//       expect(consoleMock).toHaveBeenCalledTimes(1);
//     }
//   });

//   test("backend returns an error response", async () => {
//     const consoleMock = vi.spyOn(console, "error").mockImplementation(() => undefined);
//     new FetchMock({ detail: "Custom error" }, { status: 404 });

//     try {
//       await getFetcher({ successZod, url: "url", requiresAuth: false });
//     } catch (exc) {
//       expect(exc).toEqual({ detail: "Custom error" });
//       expect(consoleMock).toHaveBeenCalledTimes(0);
//     }
//   });

//   test("backend returns an error response but zod fails", async () => {
//     const consoleMock = vi.spyOn(console, "error").mockImplementation(() => undefined);
//     new FetchMock({ data: "Custom error" }, { status: 404 });

//     try {
//       await getFetcher({ successZod, url: "url", requiresAuth: false });
//     } catch (exc) {
//       expect(exc).toEqual({ detail: "Ha habido un error." });
//       expect(consoleMock).toHaveBeenCalledTimes(1);
//     }
//   });

//   test("backend returns an error response but it's wrong formatted", async () => {
//     const consoleMock = vi.spyOn(console, "error").mockImplementation(() => undefined);
//     new FetchMock("Wrong", { status: 404 });

//     try {
//       await getFetcher({ successZod, url: "url", requiresAuth: false });
//     } catch (exc) {
//       expect(exc).toEqual({ detail: "Ha habido un error." });
//       expect(consoleMock).toHaveBeenCalledTimes(1);
//     }
//   });

//   test("fetch error", async () => {
//     const consoleMock = vi.spyOn(console, "error").mockImplementation(() => undefined);
//     vi.stubGlobal("fetch", () => Promise.reject(new Error("Network error")));

//     try {
//       await getFetcher({ successZod, url: "url", requiresAuth: false });
//     } catch (exc) {
//       expect(exc).toEqual({ detail: "No se ha podido conectar con el servidor. Compruebe que está conectado a internet." });
//       expect(consoleMock).toHaveBeenCalledTimes(0);
//     }
//   });
// });
