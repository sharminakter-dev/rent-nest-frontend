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
       result: User
    } | null;

  errors: {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    submit?: string;
  };
}