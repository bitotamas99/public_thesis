export interface studentCreationDTO{
    name: string;
    username: string;
    password: string;
    isInstructor: boolean;
}

export interface studentDTO{
    name: string;
    username: string;
    password: string;
    isInstructor: boolean;
}

export interface authenticationResponse{
    token: string;
    expiration: Date;
}