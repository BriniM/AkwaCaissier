import { createContext, useContext, useEffect, useState } from "react";

import { getTvsStateInitialState, TelevisionState } from "../utility/util";

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = "tvsState";

type AppContextType = {
  tvsState: TelevisionState[];
  setTvsState: React.Dispatch<React.SetStateAction<TelevisionState[]>>;
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tvsState, setTvsState] = useState<TelevisionState[]>(() => {
    // Browser only
    if (typeof window === "undefined") {
      return getTvsStateInitialState();
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        return JSON.parse(saved) as TelevisionState[];
      }
    } catch (err) {
      console.error("Failed to load TV state from localStorage:", err);
    }

    return getTvsStateInitialState();
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tvsState));
    } catch (err) {
      console.error("Failed to save TV state to localStorage:", err);
    }
  }, [tvsState]);

  return (
    <AppContext.Provider
      value={{
        tvsState,
        setTvsState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);

  if (context === null) {
    throw new Error("Missing AppProvider");
  }

  return context;
}
