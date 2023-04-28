import AuthPage from "components/Auth/AuthPage";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <AuthPage>
        <Outlet />
      </AuthPage>
    </>
  );
};

export default Layout;
