import { useMemo, useState, useEffect } from "react";
import { useAppContext } from "../providers/FiltersContext";
import { useFetch } from "../services/useFetch";
import Loader from "./Loader";
import Error from "./Error";
import { Error_Messages, fetchConfig } from "../config/Constant";
import "../styles/ElixirDataList.scss";

const ElixirDataList = () => {
  const { filters, setData } = useAppContext();
  const [isCardView, setIsCardView] = useState(true);

  const queryParams = useMemo(() => {
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value !== "")
    );
    const params = new URLSearchParams(
      filteredFilters as Record<string, string>
    );
    window.history.pushState({}, "", `?${params.toString()}`);
    return params.toString();
  }, [filters]);

  const { data, loading, error } = useFetch(
    `${fetchConfig.URL}?${queryParams}`
  );

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data, setData]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  if (!data || data.length === 0) {
    return <p className="empty-list">{Error_Messages.RECORD_NOT_FOUND}</p>;
  }
  const changeView = () => setIsCardView(!isCardView);

  return (
    <div className="elixir-list-container">
      <div className="toggle-btn-wrapper">
        <button className="toggle-btn" onClick={changeView}>
          {isCardView ? "Table View" : "Card View"}
        </button>
      </div>
      {isCardView ? (
        <div className="elixir-card-list">
          {data.map((elixir: any) => (
            <div className="elixir-card" key={elixir.id}>
              <h3>{elixir.name}</h3>
              <p>
                <strong>Difficulty:</strong> {elixir.difficulty}
              </p>
              <p>
                <strong>Ingredients:</strong>{" "}
                {elixir.ingredients
                  ?.map((ingredient: any) => ingredient.name)
                  .join(", ") || "N/A"}
              </p>
              <p>
                <strong>Inventor:</strong>{" "}
                {elixir.inventors
                  ?.map(
                    (inventor: any) =>
                      `${inventor.firstName} ${inventor.lastName}`
                  )
                  .join(", ") || "N/A"}
              </p>
              <p>
                <strong>Manufacturer:</strong> {elixir.manufacturer || "N/A"}
              </p>
              <p>
                <strong>Characteristics:</strong>{" "}
                {elixir.characteristics || "N/A"}
              </p>
              <p>
                <strong>Effects:</strong> {elixir.effect || "N/A"}
              </p>
              <p>
                <strong>Side Effects:</strong> {elixir.sideEffects || "N/A"}
              </p>
              <p>
                <strong>Time:</strong> {elixir.time || "N/A"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="elixir-list-table">
          <table>
            <thead className="elixir-list-thead">
              <tr>
                <th>Name</th>
                <th>Difficulty</th>
                <th>Ingredients</th>
                <th>Inventor</th>
                <th>Manufacturer</th>
                <th>Characteristics</th>
                <th>Effects</th>
                <th>Side Effects</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((elixir: any) => (
                <tr key={elixir.id}>
                  <td>{elixir.name}</td>
                  <td>{elixir.difficulty}</td>
                  <td>
                    {elixir.ingredients?.length > 0
                      ? elixir.ingredients
                          .map((ingredient: any) => ingredient.name)
                          .join(", ")
                      : "N/A"}
                  </td>
                  <td>
                    {elixir.inventors?.length > 0
                      ? elixir.inventors
                          .map(
                            (inventor: any) =>
                              `${inventor.firstName} ${inventor.lastName}`
                          )
                          .join(", ")
                      : "N/A"}
                  </td>
                  <td>{elixir.manufacturer || "N/A"}</td>
                  <td>{elixir.characteristics || "N/A"}</td>
                  <td>{elixir.effect || "N/A"}</td>
                  <td>{elixir.sideEffects || "N/A"}</td>
                  <td>{elixir.time || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ElixirDataList;
