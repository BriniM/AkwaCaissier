export type TelevisionState = {
  tvNumber: number;
  isOccupied: boolean;
  currentSession: Game[];
  pastSessions: Session[];
};

export type Session = {
  completedAt: number;
  isComplete: boolean;
  games: Game[];
};

export type Game = {
  gameType: "2F" | "3F" | "4F" | "AJ" | "TBD";
  startedAt: number; // unix timestamp in milliseconds
  endedAt: number | null; // unix timestamp in milliseconds
  extraTime?: boolean;
  notes?: string;
};

export type InvoiceLineItem = {
  label: string;
  amount: number;
  details?: string;
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

export function formatCurrency(amount: number): string {
  return `${amount.toFixed(2)} dt`;
}

export function calculateGameInvoice(game: Game, now: number = Date.now()): InvoiceLineItem {
  const label = `${game.gameType} - ${formatDateTime(game.startedAt)}`;

  switch (game.gameType) {
    case "2F":
      return {
        label,
        amount: 2.5,
        details: game.extraTime === undefined ? undefined : `Extra time: ${game.extraTime ? "Yes" : "No"}`,
      };
    case "3F":
      return {
        label,
        amount: 3,
        details: game.extraTime === undefined ? undefined : `Extra time: ${game.extraTime ? "Yes" : "No"}`,
      };
    case "4F":
      return {
        label,
        amount: 4,
        details: game.extraTime === undefined ? undefined : `Extra time: ${game.extraTime ? "Yes" : "No"}`,
      };
    case "AJ": {
      const endedAt = game.endedAt ?? now;
      const totalMinutes = Math.max(1, Math.ceil((endedAt - game.startedAt) / 60000));
      const amount = calculateAjInvoice(totalMinutes);

      return {
        label,
        amount,
        details: `${totalMinutes} minute${totalMinutes === 1 ? "" : "s"}`,
      };
    }
    default:
      return {
        label,
        amount: 0,
        details: "No price configured",
      };
  }
}

export function calculateInvoiceTotal(games: Game[], now: number = Date.now()): {
  lineItems: InvoiceLineItem[];
  total: number;
} {
  const lineItems = games.map((game) => calculateGameInvoice(game, now));

  return {
    lineItems,
    total: lineItems.reduce((sum, item) => sum + item.amount, 0),
  };
}

function calculateAjInvoice(totalMinutes: number): number {
  const fullHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  let amount = fullHours * 9;

  if (remainingMinutes > 0 && remainingMinutes <= 15) {
    amount += 3;
  } else if (remainingMinutes > 15 && remainingMinutes <= 30) {
    amount += 5;
  } else if (remainingMinutes > 30) {
    amount += 9;
  }

  return amount;
}

export function getTvsStateInitialState(): TelevisionState[] {
  return [1, 2, 3, 4, 5, 6].map((i) => ({
    tvNumber: i,
    isOccupied: false,
    currentSession: [],
    pastSessions: [],
  }));
}