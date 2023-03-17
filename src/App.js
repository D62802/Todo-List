import "./App.css";
import TaskList from "./pages/TaskList";
import Profile from "./pages/Profile";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";

import Contact from "./pages/Contact";
import CreateTask from "./pages/CreateTask";
import Register from "./components/Register";
import Login from "./components/Login";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <BrowserRouter>
      <TodoProvider>
        <Navigation />

        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />}></Route>
          <Route path="/" element={<Home />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/-profile" element={<Profile />}></Route>
          <Route path="/tasklist" element={<TaskList />}></Route>
          <Route path="/createtask" element={<CreateTask />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </TodoProvider>
    </BrowserRouter>
  );
}
export default App;
