export const queryKeys = {
  assets: () => ["asset"],
  assetDetails: (id: number) => ["asset", "details", id],
  assetsBySite: (id: number) => ["asset", "site", id],
  profiles: () => ["profile"],
  profileRoles: (profileId: string) => ["profile", profileId, "role"],
  roles: () => ["role"],
  sites: () => ["site"],
  siteDetail: (id: number) => ["site", id],
  users: () => ["user"],
  treeSites: (siteName: string) => ["treeSites", siteName],
  userSites: (userId: string) => ["userSites", userId],
};
