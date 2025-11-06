export interface Professional {
  id: string;
  name: string;
  role: 'Supplier' | 'Contractor' | 'Interior Designer';
  bio: string;
  profileImageUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  houseType: 'HDB' | 'Condo' | 'Landed';
  styleTags: string[];
  location: string;
  budget: string;
  supplierId: string;
  contractorId: string;
  interiorDesignerId: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface ContentSection {
  title: string;
  body: string;
}

export interface PageContent {
  title: string;
  lastUpdated: string;
  content: ContentSection[];
}
