export interface RegisterActions {
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setProfileType: (profileType: "ONG" | "Voluntario") => void;
    setName: (name: string) => void;
    setDiscipline: (discipline: string) => void;
    setTypeOfProjects: (typeOfProjects: string[]) => void;
    setTools: (tools: string[]) => void;
    setProyectosAplicados: (proyectosAplicados: string[]) => void;
    setDescription: (description: string) => void;

    clearSensitiveData: () => void;
}
