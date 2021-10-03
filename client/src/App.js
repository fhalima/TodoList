import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [titre, setTitre] = useState("");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setTodoList(response.data);
    });
  }, []);

  const submitTodo = (e) => {
    e.preventDefault();
    const colorRandom = "#" + ((Math.random() * 0xeeeeee) << 0).toString(16);
    Axios.post("http://localhost:3001/api/insert", {
      titre: titre,
      todo: todo,
    }).then(() =>
      setTodoList([
        ...todoList,
        {
          titre: titre,
          todo: todo,
          color: colorRandom,
        },
      ])
    );
    console.log(todoList);
  };

  const deleteTodo = (titre) => {
    Axios.delete(`http://localhost:3001/api/delete/${titre}`).then(
      deleteElm(titre)
    );
  };
  const deleteElm = (titre) => {
    setTodoList(todoList.filter((todoelm) => todoelm.titre !== titre));
  };
  return (
    <div className="App container">
      <h1> Todos List </h1>
      <form>
        <div className="form-group">
          <label htmlFor="titre"> Titre </label>
          <input
            type="text"
            className="form-control"
            id="titre"
            name="titre"
            onChange={(e) => {
              setTitre(e.target.value);
            }}
          />
          <label htmlFor="todo"> Todo </label>
          <input
            type="text"
            className="form-control"
            id="todo"
            name="todo"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <button className="btn btn-primary" onClick={submitTodo}>
            Ajouter
          </button>
        </div>
      </form>
      {todoList.map((val) => {
        return (
          <div
            className="section m-2 "
            style={{
              background: val.color,
            }}
          >
            <div className="row mx-auto" key={val.titre}>
              <div className="col mx-auto df">
                <p>
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
                className=" text-center btn btn-danger bt col-1"
                onClick={() => {
                  deleteTodo(val.titre);
                }}
              >
                <i
                  className="mx-auto  fa fa-window-close"
                  aria-hidden="true"
                ></i>
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
