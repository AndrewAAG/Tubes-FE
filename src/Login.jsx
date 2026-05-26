import Navbar from "./components/Navbar"
import './LoginRegister.css'
import { A } from "@solidjs/router"

function Login(){
    return <>
        <Navbar />
        <div class="container">
            <div class="form">
                <label htmlFor="email">Email</label>
                <input type="text" id="email"/>
                <label htmlFor="password">Password</label>
                <input type="text" id="password"/>
                <A href="/tasklist" style="color: black"> <button> Log in </button> </A>
            </div>
            <p>Don’t have an account? <A href="/register" style="color: black; text-decoration: underline">Create One</A> </p>
        </div>
    </>
}

export default Login