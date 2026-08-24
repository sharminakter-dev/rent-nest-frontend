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



export type IUser = {
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
            status: 'ACTIVE' | 'BANNED';
            role: 'ADMIN' | 'TENANT' | 'LANDLORD';
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

// lib/types.ts
export type RentalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED'

export interface IRentalRequest {
  id: string
  message: string
  startDate: string
  durationMonths: number
  status: RentalStatus
  propertyId: string
  tenantId: string
  createdAt: string
  updatedAt: string
  property: {
    title: string
    isAvailable: boolean
  }
  tenant: {
    name: string
  }
  review: { rating: number } | null
}


export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' 

export interface IPayment {
  id: string
  transactionId: string
  amount: string
  paidAt: string
  status: PaymentStatus
  rentalRequestId: string
  tenantId: string
  landlordId: string
  createdAt: string
  updatedAt: string
}


export type SubmitReviewState = {
  success: boolean
  statusCode?: number
  message?: string
  data?: unknown
  errors?: Record<string, string>
} | null