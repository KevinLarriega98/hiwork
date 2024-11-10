import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    query,
    where,
    onSnapshot,
    updateDoc,
    getDoc,
    arrayUnion,
    QuerySnapshot,
    arrayRemove,
    Timestamp,
    DocumentData,
    Query,
} from "firebase/firestore";
import { db } from "./firebase";
import { CalendarEvent, Project, RoleData } from "../../types/Project";
import { createChatForAcceptedVolunteer } from "./chatService";

// Crear un proyecto
export const createProject = async (
    ongID: string,
    ongName: string,
    title: string,
    description: string,
    roles: RoleData[],
    objectiveTimeline: CalendarEvent[]
): Promise<Project> => {
    const project: Omit<Project, "id"> = {
        ongID,
        ongName,
        title,
        description,
        roles,
        objectiveTimeline,
        createdAt: serverTimestamp(),
        updatedAt: null,
        applications: [],
        chatId: "",
    };

    try {
        const docRef = await addDoc(collection(db, "projects"), project);

        await updateDoc(docRef, { id: docRef.id });

        return { id: docRef.id, ...project };
    } catch (error) {
        console.error("Error al crear el proyecto:", error);
        throw new Error("No se pudo crear el proyecto.");
    }
};

// Aplicar a un proyecto
export const applyToProject = async (
    projectID: string,
    volunteerID: string,
    volunteerName: string
): Promise<void> => {
    const application = {
        volunteerID,
        volunteerName,
        status: "pending",
    };

    try {
        const projectDocRef = doc(db, "projects", projectID);

        await updateDoc(projectDocRef, {
            applications: arrayUnion(application),
        });

        const projectDocSnap = await getDoc(projectDocRef);

        if (projectDocSnap.exists()) {
            const applications = projectDocSnap.data()?.applications || [];

            const updatedApplications = applications.map((app: any) =>
                app.volunteerID === volunteerID
                    ? { ...app, appliedAt: Timestamp.now() }
                    : app
            );

            await updateDoc(projectDocRef, {
                applications: updatedApplications,
            });
        }

        const userDocRef = doc(db, "Users", volunteerID);
        await updateDoc(userDocRef, {
            proyectosAplicados: arrayUnion({ projectID, status: "pending" }),
        });

        console.log("Aplicación enviada exitosamente.");
    } catch (error) {
        console.error("Error al enviar la aplicación:", error);
        throw new Error("No se pudo enviar la aplicación.");
    }
};

// Verificar si el voluntario ya aplicó a un proyecto y obtener el estado
export const checkIfApplied = async (
    projectID: string,
    volunteerID: string
): Promise<{
    applied: boolean;
    status?: "pending" | "accepted" | "rejected";
}> => {
    try {
        const projectDocRef = doc(db, "projects", projectID);
        const projectDoc = await getDoc(projectDocRef);

        if (projectDoc.exists()) {
            const projectData = projectDoc.data() as Project;
            const application = projectData.applications.find(
                (app) => app.volunteerID === volunteerID
            );

            if (application) {
                return { applied: true, status: application.status };
            }
        }

        return { applied: false };
    } catch (error) {
        console.error("Error al verificar la aplicación:", error);
        throw new Error("Error al verificar la aplicación.");
    }
};

// Obtener proyectos con sus aplicaciones
export const getProjects = (
    setProjects: (projects: Project[]) => void,
    ongID?: string
) => {
    try {
        const projectsColRef = collection(db, "projects");

        const projectsQuery: Query<DocumentData> = ongID
            ? query(projectsColRef, where("ongID", "==", ongID))
            : query(projectsColRef);

        const unsubscribe = onSnapshot(projectsQuery, (querySnapshot) => {
            const projects = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Project[];
            setProjects(projects);
        });

        return unsubscribe;
    } catch (error) {
        console.error("Error al escuchar los proyectos:", error);
        throw new Error("No se pudo escuchar los proyectos.");
    }
};

// Obtener proyectos por ID de ONG
export const getProjectsByOngId = (
    ongId: string,
    onUpdate: (projects: Project[]) => void,
    onError?: (error: Error) => void
) => {
    try {
        const projectsRef = collection(db, "projects");
        const q = query(projectsRef, where("ongID", "==", ongId));

        const unsubscribe = onSnapshot(
            q,
            (snapshot: QuerySnapshot) => {
                const projects = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Project[];
                onUpdate(projects);
            },
            (error) => {
                console.error(
                    "Error al obtener proyectos en tiempo real:",
                    error
                );
                if (onError) {
                    onError(
                        error instanceof Error
                            ? error
                            : new Error("Unknown error")
                    );
                }
            }
        );

        return unsubscribe;
    } catch (error) {
        console.error(
            "Error al configurar la suscripción en tiempo real:",
            error
        );
        if (onError) {
            onError(
                error instanceof Error ? error : new Error("Unknown error")
            );
        }
    }
};

// Guardar o desguardar un proyecto para un voluntario
export const saveProjectUser = async (
    projectID: string,
    userID: string,
    savedProjects: string[]
) => {
    try {
        const userDocRef = doc(db, "Users", userID);

        if (savedProjects.includes(projectID)) {
            await updateDoc(userDocRef, {
                savedProjects: arrayRemove(projectID),
            });
            console.log("Proyecto desguardado.");
        } else {
            await updateDoc(userDocRef, {
                savedProjects: arrayUnion(projectID),
            });
            console.log("Proyecto guardado.");
        }
    } catch (error) {
        console.error("Error al guardar/desguardar el proyecto:", error);
    }
};

// Actualizar el estado de una aplicación en el perfil del usuario y el proyecto
export const updateStatusApplicator = async (
    projectID: string,
    volunteerID: string,
    status: "pending" | "accepted" | "rejected"
) => {
    try {
        const projectDocRef = doc(db, "projects", projectID);
        const projectDoc = await getDoc(projectDocRef);

        if (projectDoc.exists()) {
            const projectData = projectDoc.data() as Project;
            const updatedApplications = projectData.applications.map((app) =>
                app.volunteerID === volunteerID ? { ...app, status } : app
            );

            await updateDoc(projectDocRef, {
                applications: updatedApplications,
            });
        }

        const userDocRef = doc(db, "Users", volunteerID);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            const updatedProjects = (userData.proyectosAplicados || []).map(
                (project: any) =>
                    project.projectID === projectID
                        ? { ...project, status }
                        : project
            );

            await updateDoc(userDocRef, {
                proyectosAplicados: updatedProjects,
            });
        }

        if (status === "accepted") {
            const projectDocRef = doc(db, "projects", projectID);
            const projectDoc = await getDoc(projectDocRef);

            if (projectDoc.exists()) {
                const projectData = projectDoc.data() as Project;
                const ongId = projectData.ongID;

                await createChatForAcceptedVolunteer(
                    projectID,
                    volunteerID,
                    ongId
                );
            }
        }
    } catch (error) {
        console.error("Error al actualizar la aplicación:", error);
        throw new Error("No se pudo actualizar la aplicación.");
    }
};
export const updateProject = async (
    projectID: string,
    updatedFields: Partial<Project>
): Promise<void> => {
    try {
        const projectDocRef = doc(db, "projects", projectID);
        await updateDoc(projectDocRef, updatedFields);
        console.log("Proyecto actualizado correctamente.");
    } catch (error) {
        console.error("Error al actualizar el proyecto:", error);
        throw new Error("No se pudo actualizar el proyecto.");
    }
};
