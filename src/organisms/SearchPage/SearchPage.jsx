import { useParams, useSearchParams } from "react-router-dom";

const SearchPage = ({}) => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  return (
    <div className="search-page">
      {keyword ? <h1>Your results for: {keyword}</h1> : <h1>Items:</h1>}
      <p>You found X results.</p>
    </div>
  );
};

export default SearchPage;
