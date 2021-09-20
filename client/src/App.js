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
import PrivateRoute from './PrivateRoute'

const UserSignInWithContext = withContext(UserSignIn)
const UserSignUpWithContext = withContext(UserSignUp)
const UserSignOutWithContext = withContext(UserSignOut)
const CourseDetailWithContext = withContext(CourseDetail)
const HeaderWithContext = withContext(Header)

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderWithContext />
        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute exact path="/courses/create" component={CreateCourse} />
          <Route exact path="/courses/:id" component={CourseDetailWithContext} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
