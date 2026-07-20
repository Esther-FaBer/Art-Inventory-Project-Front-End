export type Dimensions = {
  height: number;
  width: number;
  depth: number;
  unit: string;
};

export type Artwork = {
  id: number;
  artist_name: string;
  title: string;
  year_created: string;
  artwork_type: string;
  medium: string;
  price: number;
  currency: string;
    dimensions?: Dimensions;
  status: string;
  vat_status: string;
  edition: number | null;
};