export interface RegisterState {
  email: string;
  password: string;
  profileType: "ONG" | "Voluntario"; // Asumimos que solo existen estos dos tipos
  name: string;
  discipline: string;
  typeOfProjects: string[]; // Un solo tipo de proyecto, puede ser `string[]` si es una lista
  tools: string[]; // Herramientas con las que el usuario trabaja
  description: string;
  proyectosAplicados?: string[]; // Proyectos aplicados opcionales
}
