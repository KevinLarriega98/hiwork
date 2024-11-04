import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    getDocs,
    query,
    where,
    onSnapshot,
    updateDoc,
    getDoc,
    deleteDoc,
    setDoc,
    documentId,
    arrayUnion,
} from "firebase/firestore";
import { db } from "./firebase";
import { CalendarEvent, ProjectState } from "../../types/project";

export const createProject = async (
    ongID: string,
    ongName: string,
    title: string,
    description: string,
    roles: string[],
    objectiveTimeline: {}[]
): Promise<any> => {
    const project = {
        ongID,
        ongName,
        title,
        description,
        objectiveTimeline,
        roles,
        createdAt: serverTimestamp(),
        updatedAt: null,
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

export const applyToProject = async (
    projectID: string,
    volunteerID: string,
    volunteerName: string,
    volunteerEmail: string,
    coverLetter: string,
    userType: string
) => {
    const application = {
        volunteerID,
        volunteerName,
        volunteerEmail,
        coverLetter,
        status: "pending",
        appliedAt: serverTimestamp(),
        userType,
    };

    try {
        // 1. Añadir aplicación en la subcolección "applications" dentro del proyecto
        const applicationsColRef = collection(
            doc(db, "projects", projectID),
            "applications"
        );
        const docRef = doc(applicationsColRef, volunteerID);
        await setDoc(docRef, application);

        // 2. Actualizar la lista de proyectos aplicados en el usuario
        const userDocRef = doc(db, "Users", volunteerID);
        await updateDoc(userDocRef, {
            proyectosAplicados: arrayUnion({ projectID, status: "pending" }),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error al enviar la aplicación:", error);
        throw new Error("No se pudo enviar la aplicación.");
    }
};

export const checkIfApplied = async (
    projectID: string,
    volunteerID: string
): Promise<{ applied: boolean; status?: string }> => {
    try {
        const applicationsColRef = collection(
            doc(db, "projects", projectID),
            "applications"
        );

        const q = query(
            applicationsColRef,
            where("volunteerID", "==", volunteerID)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const applicationData = querySnapshot.docs[0].data();
            const status = applicationData.status;
            return { applied: true, status };
        }

        return { applied: false };
    } catch (error) {
        console.error("Error al verificar la aplicación:", error);
        throw new Error("Error al verificar la aplicación.");
    }
};

export const getApplications = (
    projectID: string,
    callback: (applications: any[]) => void
) => {
    try {
        const applicationsColRef = collection(
            doc(db, "projects", projectID),
            "applications"
        );

        const unsubscribe = onSnapshot(applicationsColRef, (querySnapshot) => {
            const applications = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(applications);
        });

        return unsubscribe;
    } catch (error) {
        console.error("Error al escuchar las aplicaciones:", error);
        throw new Error("No se pudo escuchar las aplicaciones.");
    }
};

export const getUserApplications = (
    userId: string,
    callback: (appliedProjects: any[]) => void
) => {
    try {
        const userDocRef = doc(db, "Users", userId);

        // Escuchar en tiempo real las aplicaciones del usuario
        const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const appliedProjects =
                    docSnapshot.data().proyectosAplicados || [];
                callback(appliedProjects);
            } else {
                console.error(
                    "El usuario no tiene datos de proyectos aplicados."
                );
                callback([]);
            }
        });

        return unsubscribe;
    } catch (error) {
        console.error("Error al escuchar las aplicaciones del usuario:", error);
        throw new Error("No se pudieron obtener las aplicaciones del usuario.");
    }
};

export const updateProjectObjectiveTimeline = async (
    projectID: string,
    newObjectiveTimeline: CalendarEvent
): Promise<void> => {
    try {
        const docRef = doc(db, "projects", projectID);

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error("El documento no existe");
        }

        const projectData = docSnap.data();
        const currentTimeline: CalendarEvent[] =
            projectData?.objectiveTimeline || [];

        const updatedTimeline = currentTimeline.map((event) =>
            event.date === newObjectiveTimeline.date
                ? newObjectiveTimeline
                : event
        );

        await updateDoc(docRef, {
            objectiveTimeline: updatedTimeline,
            updatedAt: serverTimestamp(),
        });

        console.log(
            "Proyecto actualizado exitosamente en la subcolección 'objectiveTimeline'."
        );
    } catch (error) {
        console.error(
            "Error al actualizar el proyecto en la subcolección 'objectiveTimeline'",
            error
        );
        throw new Error(
            "No se pudo actualizar el proyecto en la subcolección."
        );
    }
};

export const getObjectiveTimelineProjects = (
    projectID: string,
    callback: (projects: any[]) => void
) => {
    try {
        const projectDocRef = doc(db, "projects", projectID);

        const unsubscribe = onSnapshot(projectDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const projectData = docSnapshot.data();

                const objectiveTimeline = projectData.objectiveTimeline || [];

                console.log("Objective Timeline:", objectiveTimeline);
                callback(objectiveTimeline);
            } else {
                console.log("No such document!");
                callback([]);
            }
        });

        return unsubscribe;
    } catch (error) {
        console.error("Error al escuchar las aplicaciones:", error);
        throw new Error("No se pudo escuchar las aplicaciones.");
    }
};

export const getProjects = (setProjects: (projects: any[]) => void) => {
    try {
        const projectsColRef = collection(db, "projects");

        const unsubscribe = onSnapshot(projectsColRef, (querySnapshot) => {
            const projects = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProjects(projects);
        });

        return unsubscribe;
    } catch (error) {
        console.error("Error al escuchar los proyectos:", error);
        throw new Error("No se pudo escuchar los proyectos.");
    }
};

export const getProjectsByOngId = async (ongId: string) => {
    try {
        const projectsRef = collection(db, "projects");

        const q = query(projectsRef, where("ongID", "==", ongId));

        const snapshot = await getDocs(q);

        const projects = snapshot.docs.map((doc) => doc.data() as ProjectState);

        return projects;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw new Error("Failed to fetch projects. Please try again later.");
    }
};

export const getSavedProjects = async (
    userID: string,
    setSavedProjects: (savedProjects: string[]) => void
) => {
    try {
        const savedProjectsColRef = collection(
            doc(db, "Voluntarios", userID),
            "savedProjects"
        );

        const unsubscribe = onSnapshot(savedProjectsColRef, (querySnapshot) => {
            const savedProjects = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return data.projectID;
            });
            setSavedProjects(savedProjects);
        });

        return unsubscribe;
    } catch (error) {
        console.error("Error al escuchar las aplicaciones:", error);
        throw new Error("No se pudo escuchar las aplicaciones.");
    }
};

export const saveProjectUser = async (
    projectID: string,
    userID: string,
    savedProjects: string[]
) => {
    try {
        const projectDocRef = doc(
            db,
            "Voluntarios",
            userID,
            "savedProjects",
            projectID
        );

        if (savedProjects.includes(projectID)) {
            await deleteDoc(projectDocRef);
            console.log("Proyecto desguardado.");
        } else {
            await setDoc(projectDocRef, { projectID });
            console.log("Proyecto guardado.");
        }
    } catch (error) {
        console.error("Error al guardar/desguardar el proyecto:", error);
    }
};

export const updateStatusApplicator = async (
    projectID: string,
    volunteerID: string,
    status: string
) => {
    try {
        const projectDocRef = doc(
            db,
            "projects",
            projectID,
            "applications",
            volunteerID
        );

        await updateDoc(projectDocRef, {
            status,
            updatedAt: serverTimestamp(),
        });

        console.log("Status actualizado en el proyecto:", status);

        const userDocRef = doc(db, "Users", volunteerID);
        const userDocSnap = await getDoc(userDocRef);

        console.log("ref", userDocRef);
        console.log("user", userDocSnap);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const proyectosAplicados = userData.proyectosAplicados || [];

            const updatedProjects = proyectosAplicados.map((project: any) => {
                if (project.projectID === projectID) {
                    return { ...project, status };
                }
                return project;
            });

            await updateDoc(userDocRef, {
                proyectosAplicados: updatedProjects,
                updatedAt: serverTimestamp(),
            });

            console.log(
                "Aplicación actualizada exitosamente en el perfil del usuario."
            );
        } else {
            console.error("No se encontró el usuario con ID:", volunteerID);
        }
    } catch (error) {
        console.error(
            "Error al actualizar la aplicación en el perfil del usuario",
            error
        );
        throw new Error(
            "No se pudo actualizar la aplicación en el perfil del usuario."
        );
    }
};

export const getProjectsByIds = async (ids: { projectID: string }[]) => {
    if (!ids || ids.length === 0) {
        console.error("El array de IDs está vacío o indefinido.");
        return [];
    }

    const idList = ids.map((item) => item.projectID);

    try {
        const projectsRef = collection(db, "projects");

        const q = query(projectsRef, where(documentId(), "in", idList));

        const querySnapshot = await getDocs(q);

        const projects = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return projects;
    } catch (error) {
        console.error("Error al obtener proyectos:", error);
        throw new Error("No se pudieron obtener los proyectos.");
    }
};
