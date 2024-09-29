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
} from "firebase/firestore";
import { db } from "./firebase";
import { CalendarEvent } from "../../types/project";

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
    coverLetter: string
): Promise<string> => {
    const application = {
        volunteerID,
        volunteerName,
        volunteerEmail,
        coverLetter,
        status: "pending",
        appliedAt: serverTimestamp(),
    };

    try {
        const applicationsColRef = collection(
            doc(db, "projects", projectID),
            "applications"
        );
        const docRef = doc(applicationsColRef, volunteerID);
        await setDoc(docRef, application);

        return docRef.id;
    } catch (error) {
        console.error("Error al enviar la aplicación:", error);
        throw new Error("No se pudo enviar la aplicación.");
    }
};

export const checkIfApplied = async (
    projectID: string,
    volunteerID: string
): Promise<boolean> => {
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

        return !querySnapshot.empty;
    } catch (error) {
        console.error("Error al verificar la aplicación:", error);
        return false;
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

        console.log(
            "Aplicación actualizada exitosamente en la subcolección 'status'."
        );
    } catch (error) {
        console.error(
            "Error al actualizar la aplicación en la subcolección 'status'",
            error
        );
        throw new Error(
            "No se pudo actualizar la aplicación en la subcolección."
        );
    }
};
