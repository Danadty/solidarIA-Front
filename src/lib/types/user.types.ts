export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: "USER" | "FOUNDATION";
}
  
export interface UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
}
  