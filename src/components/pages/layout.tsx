import { Outlet } from "react-router";
import Navbar from "../navbr";
import Footer from "../footer";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
