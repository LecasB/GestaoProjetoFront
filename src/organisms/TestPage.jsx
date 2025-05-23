import "./TestPage.scss";
import FilterButton from "../atoms/FilterButton/FilterButton";
const TestPage = () => {
  const user = JSON.parse(localStorage.getItem(""));

  return (
    <>
      <h1>
        Bem Vindo &nbsp;
        {sessionStorage.getItem("name")
          ? sessionStorage.getItem("name")
          : "Guest"}
      </h1>
           <FilterButton></FilterButton>
    </>
  );
};

export default TestPage;
