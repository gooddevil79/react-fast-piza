import { useLoaderData } from "react-router-dom";
import { getMenu } from "../services/apiRestaurant";
import MenuItem from "./../components/features/menu/MenuItem";
function Menu() {
  const data = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 md:divide-none  px-2">
      {data?.map((item) => (
        <MenuItem pizza={item} key={item.id} />
      ))}
    </ul>
  );
}

export const menuLoader = async () => {
  const menu = await getMenu();
  return menu;
};
export default Menu;
