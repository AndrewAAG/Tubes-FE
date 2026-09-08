import '../css/Navbar.css'
import { A , useLocation} from '@solidjs/router'
import Logo from '../assets/Logo.png'
import { user } from '../auth.js';

function Navbar(){
    const location = useLocation();

    return <>
        <div class="navbar-container">
            
            <Show when={location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register"}>
                <div class="navbar-brand">
                    <img src={Logo} alt="TaskFlow Logo" />
                    <A href='/' class="logo">TaskFlow</A>
                </div>
                <div>
                    <A href='/login'>Login</A>
                    <A href='/register'>Register</A>
                </div>
            </Show>
            <Show when={location.pathname === "/tasklist" || location.pathname === "/profile" || location.pathname === "/calendar"}>
                <div class="navbar-brand">
                    <img src={Logo} alt="TaskFlow Logo" />
                    <span class="logo">TaskFlow</span>
                </div>
                <div class="menu">
                    <A href='/tasklist'>Task List</A>
                    <A href='/calendar'>Calendar</A>
                    <A href='/profile'>
                        <div class="profile">
                            <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path></g></svg>
                            {user()?.fullname}
                        </div>
                    </A>
                </div>
            </Show>
            
        </div>
    </>
}

export default Navbar

// DONE