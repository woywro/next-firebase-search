import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Search = () => {
  const router = useRouter();
  const [input, setInput] = useState("");

  const defineRoute = () => {
    if (router.pathname == "/") {
      return "searchedList/[searchedList]";
    } else {
      return "[searchedList]";
    }
  };

  const ROUTE = defineRoute();
  return (
    <div>
      <input
        onChange={(e) => {
          setInput(e.target.value.toLowerCase());
        }}
      />
      <Link
        href={{
          pathname: ROUTE,
          query: { searchedList: input.toString().replace(" ", "-") },
        }}
        passHref
      >
        <button>search</button>
      </Link>
    </div>
  );
};
export default Search;
