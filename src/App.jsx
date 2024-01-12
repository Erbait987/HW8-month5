import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import Layout from "./components/Layout";
import PrivateRouter from "./components/PrivateRouter";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRouter />}>
            <Route path="/todo" element={<TodoPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
