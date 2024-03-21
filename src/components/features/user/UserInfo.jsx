import { useSelector } from "react-redux";

const UserInfo = function () {
  const username = useSelector((s) => s.user.username);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
};

export default UserInfo;
