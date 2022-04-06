import { Outlet } from "react-router";

import Header from "../Header";
import Footer from "../Footer";

import "./index.scss";

const AboutLayout = () => (
  <div className="container">
    <Header />
    <div className="container__center">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default AboutLayout;
