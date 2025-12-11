export interface Tabs {
    logo: string;
    name: string;
    key: string;
    data: tabCard[];
  }
  
  export interface tabCard {
      logo: string;
      name: string;
      type: string;
      color: string;
  }