import { render } from 'solid-js/web'
import { Router, Route } from "@solidjs/router";
import './index.css'
import LandingPage from './LandingPage.jsx'
import Login from './Login.jsx';
import Register from './Register.jsx';
import TaskList from './TaskList.jsx';
import Profile from './Profile.jsx';
import Calendar from './Calendar.jsx';

const root = document.getElementById('root')
const body = <Router>
 <Route path="/" component={LandingPage} />
 <Route path="/login" component={Login} />
 <Route path="/register" component={Register} />
 <Route path="/tasklist" component={TaskList} />
 <Route path="/profile" component={Profile} />
 <Route path="/calendar" component={Calendar} />
</Router>


render(() => body, root)
