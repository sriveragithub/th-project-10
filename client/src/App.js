import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse'
import Header from './components/Header'
import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import UserSignOut from './components/UserSignOut'

import withContext from './Context'

const UserSignInWithContext = withContext(UserSignIn)
const UserSignOutWithContext = withContext(UserSignOut)

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/courses/create" component={CreateCourse} />
          <Route exact path="/courses/:id" component={CourseDetail} />
          <Route path="/courses/:id/update" component={UpdateCourse} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOutWithContext} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
