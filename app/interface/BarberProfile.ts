export interface BarberProfile {
    data: {
      available: Array<any>;
      avatar: string;
      favorited: boolean;
      id: number;
      latitude: string;
      longitude: string;
      name: string;
      photos: Array<any>;
      services: Array<any>;
      stars: number;
      testimonials: Array<any>;
    };
    error: string;
  }
  