import { createContext, useState } from "react";

const TodoContext = createContext(); //context used to avoid prop drilling

export const TodoProvider = ({ children }) => {
  const [message, setMessage] = useState();
  const [loggedUser, setLoggedUser] = useState({
    user: {},
    userEmail: "",
    isLoggedIn: false,
  });

  const [taskList, setTaskList] = useState([]);

  //register user
  const registerUser = async (formData) => {
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    //check if users exist
    const checkUser = await fetch(
      ` http://localhost:5000/users?email=${formData.email}`,
      { method: "GET" }
    );
    const user = await checkUser.json();
    if (user.length > 0) {
      setMessage("user already exists");
    } else {
      const response = await fetch(" http://localhost:5000/users", obj);
      if (response.ok) {
        setMessage("Registered successfully");
        // //remove message value after 3 seconds
        // setTimeout(()=>{
        //   setMessage("");
        // },3000)
      } else {
        setMessage("Something went wrong");
      }
    }
  };
  //user login method
  const login = async (
    formData //backtick character(``) allows you to enter variables and strings in same line(i.e. to enter string literals)
  ) => {
    const response = await fetch(
      `http://localhost:5000/users?email=${formData.email}&password=${formData.password}`,
      { method: "GET" }
    );
    const user = await response.json();

    if (user.length > 0) {
      setMessage("Logged in  Successfully");

      //add user data to local storage
      //const userData=JSON.stringify(user[0].email);
      localStorage.setItem("user", user[0].email);
      setLoggedUser((prev) => ({
        ...prev,
        user: user[0],
        userEmail: user[0].email,
        isLoggedIn: true,
      }));

      //  //remove message value after 3 seconds
      //  setTimeout(()=>{
      //   setMessage("");
      // },3000)
    } else {
      setMessage("wrong email/password");
    }
  };

  //create task
  const createTask = async (formData) => {
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch("http://localhost:5000/tasks", obj);
      if (response.ok) {
        setMessage("Task created successfully");
      } else {
        setMessage("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTaskList = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/tasks?userId=${loggedUser.user.id}`,
        { method: "GET" }
      );
      if (response.ok) {
        const tasks = await response.json();
        setTaskList(tasks);
        //console.log(tasks);
      }
    } catch (err) {}
  };

  //Update task

  const updateTask = async (formData, id) => {
    const obj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch(` http://localhost:5000/tasks/${id}`, obj);
      if (response.ok) {
        setMessage("Task updated successfully");
      } else {
        setMessage("Something went wrong ");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMessage("Task Delete Succesfully");
      } else {
        setMessage("something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        registerUser,
        login,
        message,
        setMessage,
        loggedUser,
        setLoggedUser,
        createTask,
        getTaskList,
        taskList,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
