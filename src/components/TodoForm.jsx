import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodoWithAuth } from "../redux/todosSlice";

const TodoCreationPage = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const dispatch = useDispatch();

  const handleCreateTodo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token available for todo creation");
        return;
      }

      await dispatch(
        createTodoWithAuth(
          { title: todoTitle, completed: false, userId: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      );

      setTodoTitle("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div>
      <h1>Todo Creation Page</h1>
      <input
        type="text"
        placeholder="Todo Title"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button onClick={handleCreateTodo}>Create Todo</button>
    </div>
  );
};

export default TodoCreationPage;
