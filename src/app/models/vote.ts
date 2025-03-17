export interface Vote {
    voteType: string;    // Using string instead of enum
    userId: number;
    ideaId: number;
}