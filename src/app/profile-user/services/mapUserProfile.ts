import { UserProfile } from "../mocks/profile";

export interface MappedUserProfile extends TextDetails {
    img_url: string;
    user_name: string;
    descripcion: string;
    donations: number;
    projects: number;
    volunters: number;
}

export interface TextDetails {
    text_donations: string;
    text_proyects: string;
    text_volunters: string;
}

//---------------------------------------------------------------------------
export function mapUserProfile(profile: UserProfile): MappedUserProfile {
    return {
      img_url: profile.photo_url,
      descripcion: profile.description,
      user_name: profile.user?.name ?? "Sin nombre",
      donations: profile.stats?.donations ?? 0,
      projects: profile.stats?.projects ?? 0,
      volunters: profile.stats?.volunteers ?? 0,
      
      text_donations: "Donaciones",
      text_proyects: "Proyectos",
      text_volunters: "Voluntariados",
    
    };
}
  