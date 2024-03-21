import { Outlet, useNavigation } from "react-router-dom";

import AppHeader from "../ui/AppHeader";
import CartOverview from "../features/cart/CartOverview";
import Spinner from "../ui/Spinner";

const AppLayout = function () {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <AppHeader />
      {loading && <Spinner />}
      <div className="overflow-x-hidden overflow-y-scroll">
        <main className=" mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
