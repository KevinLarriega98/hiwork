export interface UserState {
    uid: string;
    email: string;
    password: string;
    profileType: "ONG" | "Voluntario";
    name: string;
    discipline: string;
    typeOfProjects: string;
    currentUser: CurrentUser;
    image: string | null;
    description: string;
    backgroundImage?: string;
}

export type CurrentUser = {
    id: string;
    email: string;
    profileType: string;
    name: string;
    discipline: string;
    typeOfProjects: string;
    description: string;
    image: string;
    backgroundImage?: string;
} | null;

export interface UserActions {
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setProfileType: (profileType: "ONG" | "Voluntario") => void;
    setName: (name: string) => void;
    setDiscipline: (discipline: string) => void;
    setTypeOfProjects: (typeOfProjects: string) => void;
    clearSensitiveData: () => void;
    setDescription: (description: string) => void;
}

export interface RegisterState {
    email: string;
    password: string;
    profileType: "ONG" | "Voluntario";
    name: string;
    discipline: string;
    typeOfProjects: string;
    description: string;
}
