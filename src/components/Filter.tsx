import React, { useState, useCallback, useEffect } from "react";
import { useAppContext } from "../providers/FiltersContext";

import "../styles/Filters.scss";

const Filter = () => {
  const { updateFilters, clearFilters, listData } = useAppContext();
  const [dropDownFilter, setDropdownFilter] = useState<string[]>([]);
  const [filterValues, setFilterValues] = useState({
    name: "",
    difficulty: "",
    ingredient: "",
    inventorFullName: "",
    manufacturer: "",
  });

  useEffect(() => {
    if (listData && listData.length > 0) {
      const difficulties = Array.from(
        new Set(listData.map((elixir) => elixir.difficulty))
      );
      setDropdownFilter(difficulties);
    }
  }, [listData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = useCallback(() => {
    updateFilters(filterValues);
  }, [filterValues, updateFilters]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    clearFilters();
    setFilterValues({
      name: "",
      difficulty: "",
      ingredient: "",
      inventorFullName: "",
      manufacturer: "",
    });
    window.history.pushState({}, "", window.location.pathname);
  };
  return (
    <div className="filters">
      <form onSubmit={handleSubmit}>
        <div className="filters-container">
          <div className="filter-inputs">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={filterValues.name}
              onChange={handleInputChange}
              className="filter-input"
            />
            {dropDownFilter.length > 0 ? (
              <select
                name="difficulty"
                value={filterValues.difficulty}
                onChange={handleSelectChange}
                className="filter-input"
              >
                <option value="">Select Difficulty</option>
                {dropDownFilter.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="difficulty"
                placeholder="Difficulty"
                value={filterValues.difficulty}
                onChange={handleInputChange}
                className="filter-input"
              />
            )}
            <input
              type="text"
              name="ingredient"
              placeholder="Ingredient"
              value={filterValues.ingredient}
              onChange={handleInputChange}
              className="filter-input"
            />
            <input
              type="text"
              name="inventorFullName"
              placeholder="Inventor Full Name"
              value={filterValues.inventorFullName}
              onChange={handleInputChange}
              className="filter-input"
            />
            <input
              type="text"
              name="manufacturer"
              placeholder="Manufacturer"
              value={filterValues.manufacturer}
              onChange={handleInputChange}
              className="filter-input"
            />
          </div>
          <div className="filter-actions">
            <button type="submit" onClick={applyFilters} className="apply-btn">
              <span className="icon">&#x21B5;</span> Apply
            </button>
            <button onClick={handleResetFilters} className="clear-btn">
              <span className="icon">&#x21BB;</span> Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Filter;
