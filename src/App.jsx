import { createContext, useEffect, useState } from "react";
import ButtonDeleteaAndCount from "./ButtonDeleteaAndCount/ButtonDeleteaAndCount";
import Filter from "./Filter/Filter";
import List from "./List/List";
import TaskInput from "./TaskInput/TaskInput";
import Title from "./Title/Title";

export const AppContext = createContext(null);

const App = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [query, setQuery] = useState("");
  const [fetchAPI_URL, setFetchAPI_URL] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");

  const API_URL = "http://localhost:8000/products";

  const openModal = () => {
    setEditingId(null);
    setFormOpen(true);
  };

  const closeModal = () => {
    setFormOpen(false);
    setValue("");
    setDescription("");
    setEditingId(null);
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, [fetchAPI_URL]);

  const addTask = async () => {
    if (value.trim() === "") {
      alert("Введите название задачи");
      return;
    }

    const exists = products.some(
      (task) => task.title.toLowerCase() === value.trim().toLowerCase(),
    );
    if (exists) {
      alert("Такая задача уже существует");
      setValue("");
      setDescription("");
      return;
    }

    const newTask = {
      title: value.trim(),
      description: description.trim() || "Без описания",
      complete: false,
      date: new Date().toLocaleDateString("ru-RU"),
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении");
      }

      setFetchAPI_URL((value) => !value);
      setValue("");
      setDescription("");
      setFormOpen(false);
      alert("Задача добавлена!");
    } catch (err) {
      console.error("Ошибка:", err);
      alert("Не удалось добавить задачу!");
    }
  };

  const deleteTask = async (id) => {
    if (!confirm("Вы уверены, что хотите удалить задачу?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении");
      }

      setFetchAPI_URL((value) => !value);
      alert("Задача удалена!");
    } catch (err) {
      console.error("Ошибка:", err);
      alert("Не удалось удалить задачу!");
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = products.find((product) => product.id === id);

    if (taskToEdit) {
      setValue(taskToEdit.title);
      setDescription(taskToEdit.description);
      setEditingId(id);
      setFormOpen(true);
    }
  };

  const updateTask = async () => {
    if (value.trim() === "") {
      alert("Введите название задачи");
      return;
    }

    const currentTask = products.find((p) => p.id === editingId);

    const updatedTask = {
      title: value.trim(),
      description: description.trim() || "Без описания",
      complete: currentTask ? currentTask.complete : false,
      date: new Date().toLocaleDateString("ru-RU"),
    };

    try {
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Ошибка при обновлении");
      }

      setFetchAPI_URL((value) => !value);
      setValue("");
      setDescription("");
      setEditingId(null);
      setFormOpen(false);
      alert("Задача обновлена!");
    } catch (err) {
      console.error("Ошибка:", err);
      alert("Не удалось обновить задачу");
    }
  };

  const handleSubmit = () => {
    if (editingId) {
      updateTask();
    } else {
      addTask();
    }
  };

  const getFilteredProducts = () => {
    let result = products;

    if (filter === "done") {
      result = result.filter((product) => product.complete);
    } else if (filter === "pending") {
      result = result.filter((product) => !product.complete);
    }

    if (query.trim() !== "") {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return result;
  };

  const finalProducts = getFilteredProducts();

  const deleteAll = async () => {
    const count = products.length;
    const tasks = count > 4 ? "задач" : "задачи";

    if (!confirm(`Вы уверены, что хотите удалить все ${count} ${tasks}?`)) {
      return;
    }

    try {
      const deletePromises = products.map((product) =>
        fetch(`${API_URL}/${product.id}`, {
          method: "DELETE",
        }),
      );

      await Promise.all(deletePromises);

      setProducts([]);
      setFilteredProducts([]);

      alert(`Все ${count} ${tasks} удалены!`);
    } catch (err) {
      console.error("Ошибка:", err);
      alert("Не удалось удалить задачу!");
    }
  };

  const toggleStatus = async (id) => {
    const task = products.find((product) => product.id === id);

    if (!task) return;

    const updatedTask = {
      ...task,
      complete: !task.complete,
    };

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Ошибка при обновлении статуса");
      }

      setFetchAPI_URL((value) => !value);
    } catch (err) {
      console.error("Ошибка:", err);
      alert("Не удалось изменить статус");
    }
  };

  const filterProducts = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <AppContext.Provider
      value={{ deleteTask, handleEdit, toggleStatus, deleteAll }}
    >
      <section className="container">
        <Title />
        <div className="filter-buttons">
          <button
            className="filter-buttons__all"
            onClick={() => setFilter("all")}
          >
            Все ({products.length})
          </button>
          <button
            className="filter-buttons__done"
            onClick={() => setFilter("done")}
          >
            Выполненные ({products.filter((product) => product.complete).length}
            )
          </button>
          <button
            className="filter-buttons__pending"
            onClick={() => setFilter("pending")}
          >
            Активные ({products.filter((product) => !product.complete).length})
          </button>
        </div>
        <TaskInput
          isOpen={formOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
          value={value}
          setValue={setValue}
          description={description}
          setDescription={setDescription}
        />

        <Filter
          onOpen={openModal}
          filterProducts={filterProducts}
          query={query}
        />

        {products.length > 0 && (
          <ButtonDeleteaAndCount products={finalProducts} />
        )}

        <List products={finalProducts} />
      </section>
    </AppContext.Provider>
  );
};

export default App;
