export interface UserState {
    uid: string;
    email: string;
    password: string;
    profileType: "ONG" | "Voluntario";
    name: string;
    discipline: string;
    typeOfProjects: string;
    currentUser: {
        id: string;
        email: string;
        profileType: string;
        name: string;
        discipline: string;
        typeOfProjects: string;
    } | null;
    image: string | null;
}

export interface UserActions {
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setProfileType: (profileType: "ONG" | "Voluntario") => void;
    setName: (name: string) => void;
    setDiscipline: (discipline: string) => void;
    setTypeOfProjects: (typeOfProjects: string) => void;
    clearSensitiveData: () => void;
}

export interface RegisterState {
    email: string;
    password: string;
    profileType: "ONG" | "Voluntario";
    name: string;
    discipline: string;
    typeOfProjects: string;
}
