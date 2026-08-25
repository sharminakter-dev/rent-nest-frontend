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

export interface ICategory {
  id: string
  name: string
  slug: string
  description: string
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

  landlord: IUser;
  category: ICategory;
  rentalRequest : IRentalRequest;
  reviews: IReview[];
}

export interface IReview {
  id: string
  rating: number
  comment: string
  createdAt: string
  tenant: IUser
  property: IProperty
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
  property: IProperty
  tenant: IUser
  review: IReview
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

