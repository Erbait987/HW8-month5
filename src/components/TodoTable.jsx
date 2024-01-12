import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTodos, fetchTodosWithAuth } from "../redux/todosSlice";

const TodoTable = () => {
  const { items, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchTodos());
    dispatch(fetchTodosWithAuth()); // запрос на закрытый ендпоинт
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    console.log(id);
  };

  const handleCheckClick = (id) => {
    console.log(id);
  };

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div>
        {items.map((item) => (
          <div className="todo" key={item.id}>
            <div></div>

            <div>{item.todo}</div>
            <div>
              <button onClick={() => handleDeleteClick(item.id)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoTable;
