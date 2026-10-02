const TaskInput = ({
  isOpen,
  onClose,
  onSubmit,
  value,
  setValue,
  description,
  setDescription,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <section className="task-input">
          <form onSubmit={handleSubmit}>
            <div className="task-input__title">
              <label htmlFor="title">Название:</label>
              <input
                type="text"
                id="title"
                placeholder="Введите название..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
              />
            </div>
            <div className="task-input__description">
              <label htmlFor="description">Описание:</label>
              <textarea
                id="description"
                placeholder="Введите описание..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="task-input-btn--delete">
              Сохранить
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default TaskInput;
