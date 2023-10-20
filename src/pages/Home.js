import { MainContext, useContext } from "../context";

import LeftBar from "../components/LeftBar/LeftBar";
import Navbar from "../components/Navbar/Navbar";

import { withTranslation } from "react-i18next";

function Home() {
  const { activeLeftBar, token, setNavbarHeaderText } = useContext(MainContext);
  setNavbarHeaderText("Dashboard");
  return (
    <>
      <Navbar />
      <LeftBar />
      <div
        className="right-container"
        style={{
          width: activeLeftBar ? "calc(100% - 275px)" : "calc(100% - 70px)",
          marginLeft: activeLeftBar ? "275px" : "70px",
        }}
      >
        Home Screen
      </div>
    </>
  );
}

const HomeWithTranslation = withTranslation()(Home);
export default HomeWithTranslation;
