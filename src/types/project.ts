import { FieldValue, Timestamp } from "firebase/firestore";

// Tipo para la información de un proyecto
export interface Project {
    id: string;
    ongID: string; // ID de la ONG que creó el proyecto
    title: string;
    ongName: string;
    description: string;
    roles: RoleData[]; // Roles requeridos para el proyecto
    objectiveTimeline: CalendarEvent[]; // Cronograma de objetivos del proyecto
    createdAt: Timestamp | FieldValue | null; // Fecha de creación
    updatedAt: Timestamp | FieldValue | null; // Fecha de última actualización
    applications: Application[]; // Aplicaciones de voluntarios
    chatId?: string; // ID del chat (puedes usarlo para asociar un chat con el proyecto)
}

// Tipo para la aplicación de un voluntario a un proyecto
export interface Application {
    volunteerID: string; // ID del voluntario que aplica
    status: "pending" | "accepted" | "rejected"; // Estado de la aplicación
    appliedAt?: Timestamp | FieldValue; // Fecha de la aplicación
    volunteerName: string; // Nombre del voluntario
    chatId?: string; // ID del chat asociado a esta aplicación (si es aceptada)
}

// Tipo para los mensajes de chat
export interface ChatMessage {
    senderId: string; // ID del usuario que envía el mensaje
    text: string; // Contenido del mensaje
    sentAt: Timestamp; // Fecha de envío
    read: boolean; // Estado de lectura del mensaje
}

// Tipo para los eventos de calendario
export interface CalendarEvent {
    date: string;
    name: string;
    data: string;
    height: number;
    day: string;
    isChecked: boolean;
}

// Tipo para los roles necesarios en el proyecto
export interface RoleData {
    role: string;
    quantity: number;
}
