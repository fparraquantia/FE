export type AssetsResponse = AssetType[];

export interface AssetCreate {
  assetTypeId: number;
  siteId: number;
}

export type AssetCreateResponse = {
  assetId: number;
}[];

export interface AssetType {
  id: number;
  name?: string;
  typeId?: number;
  typeName?: string;
}

interface AssetProperty {
  id: number;
  property?: string;
  value: number | null;
}

export interface AssetProperties {
  name: string;
  brand: string;
  properties: AssetProperty[];
}
