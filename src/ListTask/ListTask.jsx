import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useContext } from "react";
import { AppContext } from "../App";

const ListTask = ({ products }) => {
  const { id, title, description, complete, date } = products;

  const { deleteTask, handleEdit, toggleStatus } = useContext(AppContext);

  return (
    <li className="list__item">
      <h3 className="list__item-title">
        <span className="list__item-title-text">{title}</span>
        <div className="list__item-btn">
          <button
            className="list__item-btn list__item-btn--delete"
            aria-label="Удалить"
            onClick={() => deleteTask(id)}
          >
            <MdDelete />
          </button>
          <button
            className="list__item-btn list__item-btn--edit"
            aria-label="Редактировать"
            onClick={() => handleEdit(id)}
          >
            <BiEdit />
          </button>
        </div>
      </h3>

      <p className="list__item-description">{description}</p>

      <div className="list__item-complete-and-date">
        <p
          className={`list__item-complete ${complete ? "list__item-complete--aqua" : "list__item-complete--rad"}`}
          onClick={() => toggleStatus(id)}
        >
          {complete ? "Выполнено" : "Не выполнено"}
        </p>
        <span className="list__item-date">{date}</span>
      </div>
    </li>
  );
};

export default ListTask;
