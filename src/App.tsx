import { ContextProvider } from "./providers/FiltersContext";
import Filter from "./components/Filter";
import ElixirList from "./components/ElixirDataList";
import "./styles/App.scss";

const App: React.FC = () => {
  return (
    <ContextProvider>
      <div className="Dashboard">
        <h3>Harry Potter Wizard</h3>
        <Filter />
        <ElixirList />
      </div>
    </ContextProvider>
  );
};

export default App;
