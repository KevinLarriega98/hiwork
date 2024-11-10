import { Timestamp } from "firebase/firestore";

export interface User {
    uid: string;
    email: string;
    profileType: "ONG" | "Voluntario";
    name: string;
    discipline: string;
    typeOfProjects: string[];
    description: string;
    image?: string | null;
    proyectosAplicados?: ApplicationUser[]; // Proyectos a los que ha aplicado
    savedProjects?: string[]; // Proyectos guardados
    createdAt: Timestamp | null;
    updatedAt: Timestamp | null;
    backgroundImg?: string | null;
}

export interface ApplicationUser {
    volunteerID: string; // ID del voluntario que aplica
    status: "pending" | "accepted" | "rejected"; // Estado de la aplicación
    appliedAt?: Timestamp; // Fecha de la aplicación
}
