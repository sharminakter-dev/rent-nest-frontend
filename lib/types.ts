export type LoginState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    } | null;

  errors: {
    email?: string;
    password?: string;
    submit?: string;
  };
}



type IUser = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        result:{
            id: string;
            name: string;
            email: string;
            phone: string;
            address: string;
            status: string;
            role: string;
            createdAt : string;
            updatedAt: string;
            profile:{
              profilePhoto: string;
              bio:string;
            }
        }
    }
}

export type NavbarProps = {
    user: IUser
}

export type RegisterState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
       result: IUser
    } | null;

  errors: {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    submit?: string;
  };
}

export interface IProperty {
  id: string;
  title: string;
  description: string;
  image: string | null;
  location: string;
  bedrooms: number;
  bathrooms: number;
  rent: string;
  isAvailable: boolean;
  isFeatured: boolean;
  landlordId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;

  landlord: {
    name: string;
  };

  category: {
    slug: string;
  };

  reviews: IReview[];
}

export interface IReview {
  rating: number
  comment: string
}

export type PropertySearchBarProps = {
  propertyCategories: string[];
};

export type RequestPropertyState = {
    success: boolean
    statusCode?: number
    message?: string
    data?: unknown
    errors?: Record<string, string>
} | null
