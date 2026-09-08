import Navbar from "./components/Navbar"
import './css/LoginRegister.css'
import { A , useNavigate} from "@solidjs/router"
import { createSignal } from "solid-js"

function Register(){
    const navigate = useNavigate();
    const [fullname, setFullname] = createSignal("");
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");

    async function handleRegister(){
        const response = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname: fullname(),
                email: email(),
                password: password(),
            }),
            credentials: 'include'
        });

        const data = await response.json();

        if(data.success){
            navigate("/tasklist", { replace: true });
        }
    }

    return <>
        <Navbar />
        <div class="container">
            <div class="form">
                <label htmlFor="fullname">Fullname</label>
                <input type="text" id="fullname" value={fullname()} onInput={(e)=>{setFullname(e.target.value)}}/>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email()} onInput={(e)=>{setEmail(e.target.value)}}/>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" value={password()} onInput={(e)=>{setPassword(e.target.value)}}/>
                <button onClick={handleRegister}>Create Account</button>
            </div>
            <p>Already a member? <A href="/login">Login</A> </p>
        </div>
    </>
}

export default Register

// DONE