import { Project } from "./Project";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
    RegisterUserScreens: { profileType: "Voluntario" | "ONG" };
    RegisterTypeUser: undefined;
    TabsBottom: undefined;
    Project: { project: Project };
    CreateNewProject: { profileType: "Voluntario" | "ONG" };
    Welcome: undefined;
    Tabs: undefined;
    ApplicatorProfile: { item: any; project: Project };
};
