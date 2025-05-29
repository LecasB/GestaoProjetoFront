import "./TestPage.scss";
import FilterButton from "../atoms/FilterButton/FilterButton";
import HeroBanner from "../atoms/HeroBanner/HeroBanner";
import CardsList from "../molecules/CardsList/CardsList";
import AcoesSocaisPage from "../organisms/AcoesSociaisPage/AcoesSociaisPage";
import LeiloesPage from "../organisms/LeiloesPage/LeiloesPage";
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
      <h2>Ações Socais</h2>
      <AcoesSocaisPage />
      <h2>Leilões</h2>
      <LeiloesPage />
    </>
  );
};

export default TestPage;
