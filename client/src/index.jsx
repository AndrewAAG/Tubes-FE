import { render } from 'solid-js/web'
import { Router, Route } from "@solidjs/router";
import './css/index.css'
import LandingPage from './LandingPage.jsx'
import Login from './Login.jsx';
import Register from './Register.jsx';
import TaskList from './TaskList.jsx';
import Profile from './Profile.jsx';
import Calendar from './Calendar.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import PublicOnlyRoute from './PublicOnlyRoute.jsx';

const root = document.getElementById('root')
const body = (
  <Router>
    <Route component={PublicOnlyRoute}>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Route>

    <Route component={ProtectedRoute}>
      <Route path="/tasklist" component={TaskList} />
      <Route path="/profile" component={Profile} />
      <Route path="/calendar" component={Calendar} />
    </Route>
  </Router>
);


render(() => body, root)

// DONE