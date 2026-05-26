import Navbar from "./components/Navbar"
import './Profile.css'
import { A } from "@solidjs/router"

function Profile(){
    return <>
        <Navbar />
        <div class="profile-container">
            <div class="content-container">
                <div class="user-info">
                    <svg viewBox="0 0 32 32" enable-background="new 0 0 32 32" id="Stock_cut" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <desc></desc> <g> <circle cx="16" cy="16" fill="none" r="15" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"></circle> <path d="M26,27L26,27 c0-5.523-4.477-10-10-10h0c-5.523,0-10,4.477-10,10v0" fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"></path> <circle cx="16" cy="11" fill="none" r="6" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"></circle> </g> </g></svg>
                    <h3>Dummy</h3>
                    <h3>dummy@gmail.com</h3>
                </div>
                <div class="user-stats">
                    <div class="stats-card">
                        <p class="number">6</p>
                        <p class="measure">Total Task</p>
                    </div>
                    <div class="stats-card">
                        <p class="number">2</p>
                        <p>Done</p>
                    </div>
                    <div class="stats-card">
                        <p class="number">4</p>
                        <p class="measure">Ongoing</p>
                    </div>
                </div>
                <A href="/"><button>Log out</button></A>
            </div>
        </div>
    </>
}

export default Profile