import { Link } from "react-router-dom";

const Button = function ({
  children,
  disabled,
  extraStyle,
  to,
  type,
  onClick,
}) {
  const base =
    "bg-yellow-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:bg-yellow-300 active:scale-95 disabled:opacity-80 disabled:bg-slate-200 text-xs";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " px-2.5 py-1 md:px-3 md:py-2 text-xs",
    secondary:
      "border-2 border-stone-300 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-stone-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 focus:bg-stone-300 active:scale-95 disabled:opacity-80 px-2 py-2.5 md:px-6 md:py-3.5 text-xs",
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button
        disabled={disabled}
        className={`${styles[type]} ${extraStyle}`}
        onClick={(e) => onClick(e)}
      >
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={`${styles[type]} ${extraStyle}`}>
      {children}
    </button>
  );
};

export default Button;
