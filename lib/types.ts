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

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

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