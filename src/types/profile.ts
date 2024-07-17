export interface ProfileState {
  profile: Record<string, any>;
}

export interface ProfileActions {
  setProfile: (profile: Record<string, any>) => void;
}
