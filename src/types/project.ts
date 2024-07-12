export interface ProjectState {
    ongs: Array<any>;
    proyectos: Array<any>;
    proyectoActual: any | null;
}

export interface ProjectActions {
    setOngs: (ongs: Array<any>) => void;
    setProyectos: (proyectos: Array<any>) => void;
    setProyectoActual: (proyecto: any) => void;
}
