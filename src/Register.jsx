import Navbar from "./components/Navbar"
import './LoginRegister.css'
import { A } from "@solidjs/router"

function Register(){
    return <>
        <Navbar />
        <div class="container">
            <div class="form">
                <label htmlFor="fullname">Fullname</label>
                <input type="text" id="fullname"/>
                <label htmlFor="email">Email</label>
                <input type="text" id="email"/>
                <label htmlFor="password">Password</label>
                <input type="text" id="password"/>
                <button>Create Account</button>
            </div>
            <p>Already a member? <A href="/login" style="color: black; text-decoration: underline">Login</A> </p>
        </div>
    </>
}

export default Register