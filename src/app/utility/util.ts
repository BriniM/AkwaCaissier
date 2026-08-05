export type TelevisionState = {
  tvNumber: number;
  isOccupied: boolean;
  currentSession: Game[];
  pastSessions: Game[][];
};

export type Game = {
  gameType: "2F" | "3F" | "4F" | "AJ";
  startedAt: Date;
  endedAt: Date | null;
  notes?: string;
};

export function getTvsStateInitialState(): TelevisionState[] {
  return [1, 2, 3, 4, 5, 6].map(i => ({
      tvNumber: i,
      isOccupied: false,
      currentSession: [],
      pastSessions: [],
    }));
}