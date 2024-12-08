export type Store = {
  id: number;
  name: string;
  description: string;
  slogan: string;
  logo: FileList | null;
  banner: FileList | null;
};

export interface StoreUpdate extends Store {
  name: string;
  description: string;
  slogan: string;
  logo: FileList | null;
  banner: FileList | null;
}
