export type TelevisionState = {
  tvNumber: number;
  isOccupied: boolean;
  currentSession: Game[] | null;
  pastSessions: Game[][] | null;
};

export type Game = {
  gameType: "2F" | "3F" | "4F" | "AJ";
  startedAt: Date;
  endedAt: Date | null;
  notes?: string;
};

export function getTvsStateInitialState(): TelevisionState[] | (() => TelevisionState[]) {
  return [
    {
      tvNumber: 1,
      isOccupied: false,
      currentSession: null,
      pastSessions: null,
    },
    {
      tvNumber: 2,
      isOccupied: false,
      currentSession: null,
      pastSessions: null,
    },
    {
      tvNumber: 3,
      isOccupied: false,
      currentSession: null,
      pastSessions: null,
    },
    {
      tvNumber: 4,
      isOccupied: false,
      currentSession: null,
      pastSessions: null,
    },
    {
      tvNumber: 5,
      isOccupied: false,
      currentSession: null,
      pastSessions: null,
    },
    {
      tvNumber: 6,
      isOccupied: false,
      currentSession: null,
      pastSessions: null,
    },
  ];
}