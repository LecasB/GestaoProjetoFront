import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardsList from "../../molecules/CardsList/CardsList";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState("");
  const [results, setResults] = useState(0);

  useEffect(() => {
    const queryString = searchParams.toString();
    console.log("SearchPage params:", queryString);
    setFilters(queryString);
  }, [searchParams]);

  return (
    <div className="search-page">
      <h1>Search Results</h1>
      <h2>You found {results} results:</h2>
      <CardsList filters={filters} numOfResults={setResults} />
    </div>
  );
};

export default SearchPage;
