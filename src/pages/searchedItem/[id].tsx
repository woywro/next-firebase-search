import { getDoc, getDocs, collection, doc } from "firebase/firestore";
import { GetStaticProps } from "next";
import { db } from "../../firebase/firebase";
import { carInterface } from "../../types/carInterface";

interface Props {
  data: carInterface;
}

export default function searchedItem({ data }: Props) {
  return (
    <div>
      <p>{data.brand}</p>
      <p>{data.model}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const docRef = doc(db, "Cars", context.params.id.toString());
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
};

export const getStaticPaths = async () => {
  const array: carInterface[] = [];
  const colRef = collection(db, "Cars");
  const docSnap = await getDocs(colRef);
  docSnap.forEach((doc) => {
    array.push(doc.data());
  });
  const paths = array.map((e) => ({
    params: { id: e.id.toString() },
  }));

  return { paths, fallback: false };
};
