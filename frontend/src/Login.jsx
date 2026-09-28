import { useState } from "react";
import axios from "axios";
import Signup from "./Signup";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showSignup, setShowSignup] = useState(false);

    function handleLogin(e) {
        e.preventDefault();

        axios.post("http://localhost:5000/login", {
            username: username,
            password: password
        })
        .then((response) => {
            onLogin(response.data);
        })
        .catch((error) => {
            alert("Invalid username or password");
        });
    }

    return (

        <div>
            {showSignup ? (
                <Signup onSignup={() => setShowSignup(false)} />
            ) : (
                <div>
                    <h2>Login</h2>

                    <form onSubmit={handleLogin}>
                        <label>Username:</label>
                        <br />

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <br /><br />

                        <label>Password:</label>
                        <br />

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <br /><br />

                        <button type="submit">
                            Login
                        </button>
                    </form>

                    <br />

                    <button
                        type="button"
                        onClick={() => setShowSignup(true)}
                    >
                       Sign Up
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login;