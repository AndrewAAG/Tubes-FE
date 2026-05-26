import Navbar from "./components/Navbar"
import './LandingPage.css'
import lpagePhoto from './assets/lpagePhoto.png'
import { A } from "@solidjs/router"
function LandingPage(){
    return <>
        <Navbar />
        <div class="lpage-container">
            <div class="container-atas">
                <div class="container-text">
                    <h1>Track your tasks. Stay on top of your life</h1>
                    <p>A simple, no-nonsense task tracker for college, work, and everything in between. Capture, organize, finish.</p>
                    <A href="/login" style="color: black"> <button> Get started - It’s Free → </button> </A>  
                </div>
                <div class="container-foto">
                    <img src={lpagePhoto} alt=""  />
                </div>
            </div>
            <div class="container-bawah">
                <h1>What you can do</h1>
                <div class="container-card">
                    <div class="card">
                        <p>01</p>
                        <p>Capture Quickly</p>
                    </div>
                    <div class="card">
                        <p>02</p>
                        <p>Filter & search</p>
                    </div>
                    <div class="card">
                        <p>03</p>
                        <p>Track priority</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default LandingPage