import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Link from "next/link";
import { carInterface } from "../../types/carInterface";
import { GetServerSideProps } from "next";
interface Props {
  data: carInterface[];
}

const SearchView = ({ data }: Props) => {
  const ROUTE = "/searchedItem/[id]";

  return (
    <div>
      {data.length == 0 && <p>nothing was found</p>}
      <ul>
        {data.map((e) => {
          return (
            <Link
              href={{
                pathname: ROUTE,
                query: { id: e.id.toString() },
              }}
              passHref
            >
              <li>
                {e.brand} {e.model}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
export default SearchView;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data: carInterface[] = [];
  const tagArray = context.params.searchedList.replace("-", " ").split(" ");

  const createQuery = () => {
    const colRef = collection(db, "Cars");
    if (tagArray.length == 1) {
      return query(colRef, where(`tags.${tagArray[0]}`, "==", true));
    } else if (tagArray.length == 2) {
      return query(
        colRef,
        where(`tags.${tagArray[0]}`, "==", true),
        where(`tags.${tagArray[1]}`, "==", true)
      );
    } else if (tagArray.length == 3) {
      return query(
        colRef,
        where(`tags.${tagArray[0]}`, "==", true),
        where(`tags.${tagArray[1]}`, "==", true),
        where(`tags.${tagArray[2]}`, "==", true)
      );
    }
  };

  const q = createQuery();
  const docSnap = await getDocs(q);
  docSnap.forEach((doc) => {
    data.push(doc.data());
  });
  return {
    props: { data },
  };
};
