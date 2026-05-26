import './Navbar.css'
import { A , useLocation} from '@solidjs/router'

function Navbar(){
    const location = useLocation();
    return <>
        <div class="navbar-container">
            
            <Show when={location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register"}>
                <div>
                    <A href='/' class="logo">TaskFlow</A>
                </div>
                <div>
                    <A href='/login'>Login</A>
                    <A href='/register'>Register</A>
                </div>
            </Show>
            <Show when={location.pathname === "/tasklist" || location.pathname === "/profile" || location.pathname === "/calendar"}>
                <div style="margin-left: 10px">
                    TaskFlow
                </div>
                <div>
                    <A href='/tasklist'>Task List</A>
                    <A href='/calendar'>Calendar</A>
                    <A href='/profile'>Nama User</A>
                </div>
            </Show>
            
        </div>
    </>
}

export default Navbar