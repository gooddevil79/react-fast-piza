import { Link } from "react-router-dom";
import SerchOrder from "../features/order/SerchOrder";
import UserInfo from "../features/user/UserInfo";

const AppHeader = function () {
  return (
    <header className="bg-yellow-400 uppercase px-4 py-3 border-b-2 border-stone-300 sm:px-6 flex items-center justify-between ">
      <Link to="/" className="tracking-[5px] font-semibold">
        Fast React Pizza Co.
      </Link>
      <SerchOrder />
      <UserInfo />
    </header>
  );
};

export default AppHeader;
