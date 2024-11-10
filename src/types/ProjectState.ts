import { Project, CalendarEvent } from "./Project";
import { Timestamp } from "firebase/firestore";

export interface ProjectState {
    projects: Project[]; // Lista de proyectos cargados
    ongName: string; // Nombre de la ONG que crea el proyecto
    title: string; // Título del proyecto
    description: string; // Descripción del proyecto
    roles: RoleData[]; // Roles requeridos para el proyecto
    objectiveTimeline: CalendarEvent[]; // Línea de tiempo y objetivos del proyecto
    createdAt: Timestamp | null; // Fecha de creación del proyecto
    updatedAt: Timestamp | null; // Fecha de última actualización
}

export type RoleData = {
    role: string;
    count: number;
};
