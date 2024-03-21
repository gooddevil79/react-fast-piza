import { Link, useNavigate } from "react-router-dom";

const LinkButton = function ({ children, to }) {
  const navigate = useNavigate();
  const classNames =
    "text-sm text-blue-500 hover:text-blue-600 hover:underline";

  if (to === "-1")
    return (
      <button onClick={() => navigate(-1)} className={classNames}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={classNames}>
      {children}
    </Link>
  );
};

export default LinkButton;
