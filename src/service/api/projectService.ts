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
} from "firebase/firestore";
import { db } from "./firebase";
import { CalendarEvent } from "../../types/project";

export const createProject = async (
    ongID: string,
    ongName: string,
    title: string,
    description: string,
    objectiveTimeline: {}[],
    remote: boolean
): Promise<any> => {
    const project = {
        ongID,
        ongName,
        title,
        description,
        objectiveTimeline,
        createdAt: serverTimestamp(),
        updatedAt: null,
        remote,
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
        const docRef = await addDoc(applicationsColRef, application);
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

export const saveProjectUser = async (
    projectID: string,
    userID: string
): Promise<string> => {
    try {
        const savedProjectsColRef = collection(
            doc(db, "Voluntarios", userID),
            "savedProjects"
        );

        const docRef = await addDoc(savedProjectsColRef, {
            projectID: projectID,
        });
        console.log(
            "Proyecto guardado exitosamente en la subcolección 'savedProjects' del perfil del voluntario."
        );
        return docRef.id;
    } catch (error) {
        console.error(
            "Error al guardar proyecto en la subcolección 'savedProjects'",
            error
        );
        throw new Error("No se pudo guardar el proyecto en la subcolección.");
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

        console.log("currentTimeline", currentTimeline);

        const objectiveTimeline = currentTimeline.map((event) =>
            event.date === newObjectiveTimeline.date
                ? newObjectiveTimeline
                : event
        );

        await updateDoc(docRef, {
            objectiveTimeline,
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
