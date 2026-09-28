import { useState } from "react";
import axios from "axios";

function Signup({ onSignup }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSignup(e) {
        e.preventDefault();

        if (username === "" || password === "") {
            alert("Please enter username and password");
            return;
        }

        axios.post("http://localhost:5000/signup", {
            username: username,
            password: password
        })
        .then(() => {
            alert("Signup successful");
            onSignup();
        })
        .catch((error) => {
            console.log(error);
            alert(error.response.data.message);
        });
    }

    return (
        <div>
            <h2>Sign Up</h2>

            <form onSubmit={handleSignup}>

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
                    Sign Up
                </button>

            </form>
        </div>
    );
}

export default Signup;