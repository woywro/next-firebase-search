import { useCallback, useState } from "react";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { carInterface } from "../types/carInterface";
const addCar = () => {
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const handleAdd = useCallback(() => {
    const random: string = Math.round(Math.random() * 10000).toString();

    const createTags = (array: string[]) => {
      const constantTags: string[] = [model, brand, random];
      const tags: string[] = array.concat(constantTags);
      const initialValue = {};
      return tags.reduce((obj, item) => {
        return {
          ...obj,
          [item]: true,
        };
      }, initialValue);
    };
    const newCar = {
      name: brand,
      model: model,
      id: random,
      tags: createTags(tags.split("/")),
    };
    setDoc(doc(db, "Cars", random), newCar);
  }, [brand, model, tags]);

  return (
    <div>
      <input
        placeholder="brand"
        onChange={(e) => {
          setBrand(e.target.value.toLowerCase());
        }}
      ></input>
      <input
        placeholder="model"
        onChange={(e) => {
          setModel(e.target.value.toLowerCase());
        }}
      ></input>
      <input
        placeholder="tags eg. coupe/fast/red"
        onChange={(e) => {
          setTags(e.target.value.toLowerCase());
        }}
      ></input>
      <button onClick={handleAdd}>add</button>
    </div>
  );
};

export default addCar;
