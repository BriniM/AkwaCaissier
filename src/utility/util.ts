export type TelevisionState = {
  tvNumber: number;
  isOccupied: boolean;
  currentSession: Game[];
  pastSessions: Game[][];
};

export type Game = {
  gameType: "2F" | "3F" | "4F" | "AJ" | "TBD";
  startedAt: number; // unix timestamp in milliseconds
  endedAt: number | null; // unix timestamp in milliseconds
  notes?: string;
};

export const GAME_TYPES: Game["gameType"][] = ["2F", "3F", "4F", "AJ", "TBD"];

export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

export function getTvsStateInitialState(): TelevisionState[] {
  return [1, 2, 3, 4, 5, 6].map((i) => ({
    tvNumber: i,
    isOccupied: false,
    currentSession: [],
    pastSessions: [],
  }));
}