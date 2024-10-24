import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [countries, setCountries] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchedCountry, setSearchedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data); // Populate countries with the fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <DataContext.Provider
      value={{ countries, loading, error, searchedCountry, setSearchedCountry }}
    >
      {children}
    </DataContext.Provider>
  );
};
