export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  houseType: 'HDB' | 'Condo' | 'Landed';
  styleTags: string[];
  location: string;
  budget: string;
  supplier: string;
  contractor: string;
  interiorDesigner: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  imageUrl: string;
}