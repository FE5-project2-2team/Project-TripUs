import { Outlet } from "react-router";

export default function Home() {
  return (
    <>
      <h1>Home Component</h1>
      <Outlet />
    </>
  );
}
