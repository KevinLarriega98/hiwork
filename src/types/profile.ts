export interface ProfileState {
    perfil: Record<string, any>;
}

export interface ProfileActions {
    setPerfil: (perfil: Record<string, any>) => void;
}
