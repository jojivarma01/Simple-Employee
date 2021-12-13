export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    password: string;
}

export interface User {
    userName: string;
    userEmail: string;
}

export interface UserAuthenticate {
    email: string;
    password: string;
}

export interface LoginAuth {
    empId: number;
    isLoginSuccess: boolean;
    userToken: string;
}
