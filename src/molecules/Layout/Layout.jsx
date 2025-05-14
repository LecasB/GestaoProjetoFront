import Header from "../../molecules/Header/Header";
import Footer from "../../molecules/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
