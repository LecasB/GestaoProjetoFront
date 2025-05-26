import "./TestPage.scss";
import FilterButton from "../atoms/FilterButton/FilterButton";
import HeroBanner from "../atoms/HeroBanner/HeroBanner";
import CardsList from "../molecules/CardsList/CardsList";
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
      <HeroBanner />
      <h2>Recomendados:</h2>
      <CardsList />
    </>
  );
};

export default TestPage;
