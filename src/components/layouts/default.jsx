import { Outlet } from "react-router-dom";

function SharedLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}

export default SharedLayout;