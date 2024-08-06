export interface OngState {
    id: string;
    name: string;
    mission: string;
    description: string;
    location: string;
    website: string;
    contactEmail: string;
    projects: string[];
    createdAt: string;
    updatedAt: string;
}

export interface OngActions {
    setId: (id: string) => void;
    setName: (name: string) => void;
    setMission: (mission: string) => void;
    setDescription: (description: string) => void;
    setLocation: (location: string) => void;
    setWebsite: (website: string) => void;
    setContactEmail: (contactEmail: string) => void;
    setProjects: (projects: string[]) => void;
    setCreatedAt: (createdAt: string) => void;
    setUpdatedAt: (updatedAt: string) => void;
}
