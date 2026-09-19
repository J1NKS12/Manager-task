import ListEmpty from "../ListEmpty/ListEmpty";
import ListTask from "../ListTask/ListTask";
const List = ({ products, toggleStatus }) => {
  if (products.length === 0) return <ListEmpty />;

  return (
    <section className="list">
      <ul className="list__container">
        {products.map((product) => (
          <ListTask
            products={product}
            key={product.id}
            toggleStatus={toggleStatus}
          />
        ))}
      </ul>
    </section>
  );
};

export default List;
