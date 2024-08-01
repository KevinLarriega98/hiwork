export type UserProfile = {
    email: string;
    password: string;
    profileType: "ONG" | "Voluntario";
    name: string;
    discipline: string;
    typeOfProjects: string;
    currentUser: {
        id: string;
        email: string;
        type: string;
        name: string;
        discipline: string;
        typeOfProjects: string;
    } | null;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setProfileType: (profileType: "ONG" | "Voluntario") => void;
    setName: (name: string) => void;
    setDiscipline: (discipline: string) => void;
    setTypeOfProjects: (typeOfProjects: string) => void;
    clearSensitiveData: () => void;
    setCurrentUser: (currentUser: UserProfile["currentUser"]) => void;
};
