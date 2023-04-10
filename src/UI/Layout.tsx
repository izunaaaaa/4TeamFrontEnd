import styled from "@emotion/styled";
import Main from "../pages/main/Main";
import { LayoutProps } from "../interface/Interface";
import Header from "./Header";

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <>{children}</>
    </>
  );
}
export default Layout;
