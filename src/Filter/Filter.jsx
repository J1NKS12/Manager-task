import { FiSearch } from "react-icons/fi"; // Feather

const Filter = ({ onOpen, filterProducts, query }) => {
  return (
    <search className="filter">
      <button className="filter__btn">
        <FiSearch />
      </button>
      <input
        type="text"
        id="filter"
        className="filter__input"
        aria-label="Поиск"
        value={query}
        placeholder="Поиск задач..."
        onChange={(e) => filterProducts(e.target.value)}
      />
      <div className="button">
        <button className="button__add" onClick={onOpen}>
          Добавть задачу
        </button>
      </div>
    </search>
  );
};

export default Filter;
