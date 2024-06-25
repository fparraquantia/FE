import { vi } from "vitest";

class MockResponseHelper {
  static create(body: any, init: ResponseInit = {}): Response {
    return new Response(JSON.stringify(body), init);
  }
}

export class FetchMock {
  constructor(response: any, init: ResponseInit = {}) {
    const mockFetch = vi.fn(() => Promise.resolve(MockResponseHelper.create(response, init)));
    global.fetch = mockFetch;
  }
}
