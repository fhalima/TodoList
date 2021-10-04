import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [titre, setTitre] = useState("");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    getTodoList();
  }, []);

  const contrast = (color) => {
    console.log(color);
    let c = color.substr(1);
    console.log(c);
    return "#" + (0xffffff - parseInt(c, 16)).toString(16);
  };

  const getTodoList = () => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log("reponse" + response.data);
      setTodoList(response.data);
    });
  };

  const submitTodo = (e) => {
    e.preventDefault();
    const colorRandom = "#" + ((Math.random() * 0xeeeeee) << 0).toString(16);
    Axios.post("http://localhost:3001/api/insert", {
      titre: titre,
      todo: todo,
      color: colorRandom,
    }).then(getTodoList());
    console.log(todoList);
  };

  const deleteTodo = (id) => {
    console.log(id);
    Axios.delete(`http://localhost:3001/api/delete/${id}`).then(deleteElm(id));
  };
  const deleteElm = (id) => {
    setTodoList(todoList.filter((todoelm) => todoelm.id !== id));
  };
  return (
    <div className="App container">
      <h1> Todos List </h1>
      <form className="row m-2 d-inline">
        <div className="col mx-auto d-inline">
          <div className="form-group  m-2">
            <label htmlFor="titre" className="p-2">
              {" "}
              Titre{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="titre"
              name="titre"
              onChange={(e) => {
                setTitre(e.target.value);
              }}
            />
          </div>
          <div className="form-group  m-2">
            <label htmlFor="todo" className="p-2">
              {" "}
              Todo{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="todo"
              name="todo"
              onChange={(e) => {
                setTodo(e.target.value);
              }}
            />
          </div>
        </div>
        <button
          className="m-2 btn btn-primary submit col-3"
          onClick={submitTodo}
        >
          Ajouter
        </button>
      </form>
      {todoList.map((val) => {
        let c = contrast(val.color);

        return (
          <div
            className="section m-2 p-3 "
            key={val.id}
            style={{
              background: val.color,
              color: c,
            }}
          >
            <div className="row mx-auto">
              <div className="col mx-auto df">
                <p className="mx-auto m-0">
                  <span>
                    <strong>
                      {val.titre} {": "}
                    </strong>
                  </span>
                  {val.todo}
                </p>
              </div>
              <div
                type="button"
                className="text-center btn btn-danger bt col-1"
                onClick={() => {
                  deleteTodo(val.id);
                }}
              >
                <i className="mx-auto  fa fa-trash" aria-hidden="true"></i>
              </div>
            </div>
            {}
          </div>
        );
      })}
    </div>
  );
}

export default App;
