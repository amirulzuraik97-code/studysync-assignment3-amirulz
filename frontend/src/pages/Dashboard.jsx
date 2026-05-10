import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [filter, setFilter] = useState("All");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
        }

        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/tasks",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(res.data);

            setTasks(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createTask = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/tasks",
                {
                    title,
                    description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage("Task added successfully!");

            setTitle("");
            setDescription("");

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) {
            return;
        }


        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchTasks();
        } catch (error) {
            console.log(error);
        }

        setMessage("Task deleted successfully!");
    };


    const updateTask = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/tasks/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchTasks();
        } catch (error) {
            console.log(error);
        }

        setMessage("Task marked as completed!");
    };

    const logout = () => {
        localStorage.removeItem("token");

        navigate("/");
    };
    const editTask = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/tasks/edit/${id}`,
                {
                    title: editedTitle,
                    description: editedDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage("Task updated successfully!");

            setEditingTaskId(null);

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            style={{
                backgroundColor: darkMode ? "#0f172a" : "#f1f5f9",
                color: darkMode ? "white" : "black",
                minHeight: "100vh",
                padding: "20px",
                transition: "0.3s",
            }}
        >
            <h1>Dashboard Page</h1>

            <button onClick={logout}>Logout</button>

            <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <br />
            <br />

            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                    padding: "10px",
                    width: "300px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                    padding: "10px",
                    width: "300px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />

            <br />
            <br />

            <button
                onClick={createTask}
                style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "20px",
            }}
            >
                Add Task
            </button>

            {message && <p>{message}</p>}

            <h2>Tasks</h2>

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                    padding: "10px",
                    marginBottom: "20px",
                    borderRadius: "5px",
                }}
            >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>

            {loading ? (
                <h3>Loading tasks...</h3>
            ) : (
                tasks
                    .filter((task) => {
                        if (filter === "All") return true;

                        return task.status === filter;
                    })
                    .map((task) => (

                <div
                    key={task._id}
                    style={{
                        border: "1px solid #334155",
                        borderRadius: "10px",
                        padding: "15px",
                        marginBottom: "15px",
                        backgroundColor: darkMode ? "#1e293b" : "white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>{task.title}</h3>

                    <p>{task.description}</p>

                    <p>{task.status}</p>

                    <button
                        onClick={() => deleteTask(task._id)}
                        style={{
                            backgroundColor: "#ef4444",
                            color: "white",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "5px",
                            marginRight: "10px",
                            cursor: "pointer",
                        }}
                    >
                        Delete
                    </button>

                    <button
                        onClick={() => {
                            setEditingTaskId(task._id);
                            setEditedTitle(task.title);
                            setEditedDescription(task.description);
                        }}
                    >
                        Edit
                    </button>

                        {task.status !== "Completed" && (
                        <button
                            onClick={() => updateTask(task._id)}
                        style={{
                            backgroundColor: "#22c55e",
                            color: "white",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        >
                            Mark Complete
                        </button>
                    )}

                    <hr />
                </div>
            ))
        )}
        </div>
    );
}

export default Dashboard;