import { createContext, useState, ReactNode, useContext } from "react";
import { Error_Messages } from "../config/Constant";

type FilterType = {
  name?: string;
  difficulty?: string;
  ingredient?: string;
  inventorFullName?: string;
  manufacturer?: string;
};

export type ElixirListData = {
  id: number;
  name: string;
  difficulty: string;
  ingredients: string[];
  inventors: string[];
  manufacturer: string;
  characteristics: string;
  effect: string;
  sideEffects: string;
  time: string;
};

interface AppContextProps {
  filters: FilterType;
  listData: ElixirListData[];
  setData: (data: ElixirListData[]) => void;
  updateFilters: (filters: FilterType) => void;
  clearFilters: () => void;
}

const FiltersContext = createContext<AppContextProps | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [filters, updateFilters] = useState<FilterType>({});
  const [elixirListData, setElixirListData] = useState<ElixirListData[]>([]);

  const clearFilters = () => updateFilters({});

  return (
    <FiltersContext.Provider
      value={{
        filters,
        updateFilters,
        clearFilters,
        listData: elixirListData,
        setData: setElixirListData,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error(Error_Messages.CONTEXT_ERROR);
  }
  return context;
};
