export interface Product {
    _id: string;
    title: string;
    price: number;
    previousPrice: number;
    image: {
      asset: {
        url: string;
      };
    };
    discountPercentage: number;
    description: string;
    reviews: number;
    stars: number;
  }