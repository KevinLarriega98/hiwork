import { Applicator } from "./applicator";
import { ProjectState } from "./project";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
    RegisterUserScreens: { profileType: "Voluntario" | "ONG" };
    RegisterTypeUser: undefined;
    TabsBottom: undefined;
    Project: { project: ProjectState };
    ApplicatorProfile: { item: Applicator; project: ProjectState };
};
