export interface CreateFoundationDto {
    name: string;
    description: string;
    contact_phone: string;
    contact_email: string;
    userId: string;
}
  
export interface UpdateFoundationDto {
    name?: string;
    description?: string;
    logo_url?: string;
    contact_phone?: string;
    contact_email?: string;
}
  