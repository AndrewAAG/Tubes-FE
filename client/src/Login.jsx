import { createSignal } from "solid-js"
import Navbar from "./components/Navbar"
import './css/LoginRegister.css'
import { A , useNavigate } from "@solidjs/router"

function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [isWrong, setIsWrong] = createSignal(false);

    async function handleLogin(){
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email(),
                password: password(),
            }),
            credentials: 'include'
        });

        const data = await response.json();

        if(data.success){
            navigate("/tasklist", { replace: true });
        } else {
            setIsWrong(true);
        }
    }

    return <>
        <Navbar />
        <div class="container">
            <div class="form">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email()} onInput={(e)=>{setEmail(e.target.value)}}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password()} onInput={(e)=>{setPassword(e.target.value)}}/>
                <Show when={isWrong()}>
                    <p class="wrongMessage">Wrong email or password</p>
                </Show>
                <button onClick={handleLogin}> Log in </button>
            </div>
            <p>Don’t have an account? <A href="/register">Create One</A> </p>
        </div>
    </>
}

export default Login

// DONE