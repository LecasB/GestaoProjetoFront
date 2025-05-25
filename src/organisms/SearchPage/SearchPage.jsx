import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardsList from "../../molecules/CardsList/CardsList";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState("");

  useEffect(() => {
    const queryString = searchParams.toString();
    console.log("SearchPage params:", queryString);
    setFilters(queryString);
  }, [searchParams]);

  return (
    <div className="search-page">
      <h1>Search Results</h1>
      <h2>Your results for: {filters}</h2>
      <p>You found X results.</p>
      <CardsList filters={filters} />
    </div>
  );
};

export default SearchPage;
