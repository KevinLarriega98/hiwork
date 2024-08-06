import { AuthState, AuthActions } from "./auth";
import { UserState, UserActions } from "./profile";
import { ProjectState, ProjectActions } from "./project";

export type State = AuthState & UserState & ProjectState;

export type Actions = AuthActions & UserActions & ProjectActions;
