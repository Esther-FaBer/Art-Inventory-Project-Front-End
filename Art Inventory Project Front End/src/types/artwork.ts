export type Dimensions = {
  height: number;
  width: number;
  depth: number;
  unit: string;
};

export type Artwork = {
  artwork_id: number;
  artist_id: number;
  artist_name: string;
  title: string;
  year_created: number;
  artwork_type: string;
  medium: string;
  description: string | null;
  price: number;
  currency: string | null;
  height: number | null;
  width: number | null;
  depth: number | null;
  unit: string | null;
  status: string;
  vat_status: string;
  edition: number | null;
  image_url: string | null;
};