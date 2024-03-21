import { useSelector } from "react-redux";
import CreateUser from "../components/features/user/CreateUser";
import Button from "../components/ui/Button";
function Home() {
  const username = useSelector((s) => s.user.username);

  return (
    <div className="m-10 px-4 text-center">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username ? (
        <Button to="/menu" type="primary">
          Continue Ordering
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
