import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SerchOrder = function () {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = function (e) {
    e.preventDefault();
    navigate(`/order/${query}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-400 w-28 md:w-64 sm:focus:w-72 transition-all duration-300 focus:outline-none focus:ring ring-yellow-500 focus:ring-opacity-50"
      />
    </form>
  );
};

export default SerchOrder;
