import Layout from "../molecules/Layout/Layout";

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
           
    </>
  );
};

export default TestPage;
