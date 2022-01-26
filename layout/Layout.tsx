import { FC } from "react";
import Main from "./containers/Main";
import Wrapper from "./containers/Wrapper";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";

const Layout: FC = (props) => {
  return (
    <>
      <Topbar />
      <Wrapper>
          <Header />
          <Sidebar />
          <Main>
              {props.children}
          </Main>
      </Wrapper>
          <Footer />
    </>
  );
};

export default Layout
