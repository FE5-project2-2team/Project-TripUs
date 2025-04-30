import { Outlet } from "react-router";
import Footer from "../components/commons/Footer";
import Header from "../components/commons/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
