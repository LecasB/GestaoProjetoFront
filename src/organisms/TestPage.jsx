import "./TestPage.scss";
import CardsList from "../molecules/CardsList/CardsList"
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
      
     <CardsList/>
    </>
  );
};

export default TestPage;
