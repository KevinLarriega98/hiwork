import { Timestamp } from "firebase/firestore";

export interface UserActions {
  uid?: string;
  email: string;
  profileType: "ONG" | "Voluntario";
  name: string;
  discipline: string;
  typeOfProjects: string[];
  description: string;
  image?: string | null;
  tools: string[];
  proyectosAplicados?: string[];
  savedProjects?: string[];
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}
