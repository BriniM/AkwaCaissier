import { createContext, useContext, useState } from "react";

import { getTvsStateInitialState, TelevisionState } from "../utility/util";

const AppContext = createContext<AppContextType | null>(null);

type AppContextType = {
  tvsState: TelevisionState[];
  setTvsState: React.Dispatch<React.SetStateAction<TelevisionState[]>>;
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  let [tvsState, setTvsState] = useState<TelevisionState[]>(
    getTvsStateInitialState(),
  );

  return (
    <AppContext.Provider
      value={{
        tvsState: tvsState,
        setTvsState: setTvsState,
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
