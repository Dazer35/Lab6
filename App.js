import React, { useState, useEffect } from "react";

function TodoApp() {
    const [tasks, setTasks] = useState([]); // Стан для збереження завдань
    const [taskInput, setTaskInput] = useState(""); // Стан для введення тексту

    // Завантаження даних з localStorage при старті додатку
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks);
    }, []);

    // Збереження даних у localStorage при зміні списку завдань
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Додавання нового завдання
    const addTask = () => {
        if (taskInput.trim() !== "") {
            setTasks([...tasks, taskInput]); // Додаємо завдання до списку
            setTaskInput(""); // Очищаємо поле вводу
        }
    };

    // Видалення завдання за індексом
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Список завдань</h1>
            <div>
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Введіть завдання"
                    style={{ padding: "5px", width: "300px" }}
                />
                <button onClick={addTask} style={{ marginLeft: "10px", padding: "5px" }}>
                    Додати
                </button>
            </div>
            <ul style={{ listStyleType: "none", padding: "0" }}>
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        style={{
                            margin: "10px 0",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <span style={{ marginRight: "10px" }}>{task}</span>
                        <button
                            onClick={() => deleteTask(index)}
                            style={{
                                padding: "5px",
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Видалити
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;
