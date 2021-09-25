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
import NotFound from './components/NotFound'
import Error from './components/Error'
import Forbidden from './components/Forbidden'

import withContext from './Context'
import PrivateRoute from './PrivateRoute'

// setting up components to use context
const UserSignInWithContext = withContext(UserSignIn)
const UserSignUpWithContext = withContext(UserSignUp)
const UserSignOutWithContext = withContext(UserSignOut)
const CreateCourseWithContext = withContext(CreateCourse)
const UpdateCourseWithContext = withContext(UpdateCourse)
const CourseDetailWithContext = withContext(CourseDetail)
const HeaderWithContext = withContext(Header)

// setting up all routing including private routes for protected unaccessible routes
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderWithContext />
        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
          <Route exact path="/courses/:id" component={CourseDetailWithContext} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/error" component={Error} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/notfound" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
