export interface Applicator {
    id: string;
    appliedAt: { nanoseconds: number; seconds: number };
    coverLetter: string;
    status: "pending" | "accepted" | "rejected";
    volunteerEmail: string;
    volunteerID: string;
    volunteerName: string;
}
