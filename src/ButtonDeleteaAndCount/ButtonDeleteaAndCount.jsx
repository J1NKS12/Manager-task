import { useContext } from "react";
import { AppContext } from "../App";

const ButtonDeleteaAndCount = ({ products }) => {
  const { deleteAll } = useContext(AppContext);
  return (
    <section className="section-control">
      <button className="section-control__delete" onClick={deleteAll}>
        Удалить все
      </button>
      <p className="section-control__count">Задачи: {products.length}</p>
    </section>
  );
};

export default ButtonDeleteaAndCount;
