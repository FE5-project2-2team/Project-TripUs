import { Outlet } from "react-router";
import Footer from "../components/commons/Footer";
import Header from "../components/commons/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* <Outlet /> */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}
