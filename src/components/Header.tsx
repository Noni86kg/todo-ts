import React, { useState, useEffect } from "react";
import moon from "../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";
import { Todo } from "../models/models";

interface props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | any>>;
  data: Todo[];
  setData: React.Dispatch<React.SetStateAction<Todo[] | any>>;
}

const Header: React.FC<props> = ({ setTodos, data, setData }) => {
  const [theme, setTheme] = useState<string>("light-theme");

  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      const useLocalStorageTheme = localStorage.getItem("theme") || "";
      setTheme(useLocalStorageTheme);
    }
    if (localStorage.getItem("data")) {
      const useLocalStorageData = JSON.parse(localStorage.data);
      setData(useLocalStorageData);
      setTodos(useLocalStorageData);
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  return (
    <header>
      <h1>TODO</h1>
      <button onClick={toggleTheme}>
        <img src={theme === "light-theme" ? moon : sun} alt="moon-sun" />
      </button>
    </header>
  );
};

export default Header;
