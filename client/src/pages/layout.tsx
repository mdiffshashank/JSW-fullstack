import { Outlet, useOutlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = () => {
  const outlet = useOutlet();
  return (
    <div>
      <Header />
      <div className="container">{outlet}</div>
      <Footer />
    </div>
  );
};

export default Layout;
