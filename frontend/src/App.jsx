import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import "./App.css";

function App() {

    const [tickets, setTickets] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Get tickets
    function getTickets() {
        axios.get("http://localhost:5000/tickets")
            .then((response) => {
                setTickets(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getTickets();
    }, []);

    // Create ticket
    function addTicket(e) {
        e.preventDefault();

         if (title === "" || description === "") {
            alert("Please enter title and description");
            return;
        }

        const newTicket = {
            title: title,
            description: description,
            priority: priority,
            status: "open",
            user: user.username
        };

        axios.post("http://localhost:5000/tickets", newTicket)
            .then(() => {
                alert("Ticket created");

                setTitle("");
                setDescription("");
                setPriority("low");
                setUser("");

                getTickets();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function deleteTicket(id) {

      const confirmDelete = window.confirm(
          "Are you sure you want to delete this ticket?"
      );

      if (!confirmDelete) {
          return;
      }

      axios.delete(`http://localhost:5000/tickets/${id}`)
        .then(() => {
            alert("Ticket deleted");
            getTickets();
        })
        .catch((error) => {
            console.log(error);
        });
    }
    function updateTicket(id, data) {
        axios.put(`http://localhost:5000/tickets/${id}`, data)
            .then(() => {
                getTickets();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    if (user === null) {
        return <Login onLogin={setUser} />;
    }

    
    return (
        <div className="container">
            <button onClick={() => setUser(null)}>
                Logout
            </button>
            <h1>Support Ticket System</h1>

            <h3>
                Logged in as: {user.username} ({user.role})
            </h3>

            <div className="dashboard">
              <div className="summary">
                  <h3>Total Tickets</h3>
                  <p>{tickets.length}</p>
              </div>

              <div className="summary">
                  <h3>Open</h3>
                  <p>{tickets.filter((ticket) => ticket.status === "open").length}</p>
              </div>

              <div className="summary">
                  <h3>In Progress</h3>
                  <p>
                      {tickets.filter((ticket) => ticket.status === "in-progress").length}
                  </p>
              </div>

              <div className="summary">
                  <h3>Resolved</h3>
                  <p>
                      {tickets.filter((ticket) => ticket.status === "resolved").length}
                  </p>
              </div>
            </div>

            <h2>Raise a Ticket</h2>

            <form onSubmit={addTicket} className="form">
                <input
                    type="text"
                    placeholder="Ticket title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br /><br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br /><br />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <br /><br />

                <p>User: {user.username}</p>

                <br /><br />

                <button type="submit">Create Ticket</button>
            </form>

            <hr />

            <h2>All Tickets</h2>
            
            <div className="filters">
              <input
                  type="text"
                  placeholder="Search tickets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />

              <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
              >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
              </select>
            </div>
           {tickets
           
            .filter((ticket) => {

                const matchesUser =
                    user.role === "admin" || ticket.user === user.username;

                const matchesSearch =
                    ticket.title.toLowerCase().includes(search.toLowerCase());

                const matchesStatus =
                    statusFilter === "all" || ticket.status === statusFilter;

                return matchesUser && matchesSearch && matchesStatus;
            })

            .map((ticket) => (
                <div key={ticket._id} className="ticket">
                    <h3>{ticket.title}</h3>

                    <p>{ticket.description}</p>

                    <p>User: {ticket.user}</p><br/>

                    <p>
                        Status: <strong>{ticket.status}</strong>
                    </p>

                    <p>
                        Priority: <strong>{ticket.priority}</strong>
                    </p>

                    <p>
                        Created: {new Date(ticket.createdAt).toLocaleString()}
                    </p>

                    {user.role === "admin" && (
                        <div>
                            <label>Priority: </label>

                            <select
                                value={ticket.priority}
                                onChange={(e) =>
                                    updateTicket(ticket._id, {
                                        priority: e.target.value
                                    })
                                }
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>

                            <br /><br />

                            <label>Status: </label>

                            <select
                                value={ticket.status}
                                onChange={(e) =>
                                    updateTicket(ticket._id, {
                                        status: e.target.value
                                    })
                                }
                            >
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>

                            <br /><br />

                            <button onClick={() => deleteTicket(ticket._id)}>
                                Delete
                            </button>
                        </div>
                    )}

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default App;