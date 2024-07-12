import { AuthState, AuthActions } from "./auth";
import { ProfileState, ProfileActions } from "./profile";
import { ProjectState, ProjectActions } from "./project";

export type State = AuthState & ProfileState & ProjectState;

export type Actions = AuthActions & ProfileActions & ProjectActions;
