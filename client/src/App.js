import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses'
import Header from './components/Header'
import UserSignIn from './components/UserSignIn'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignIn} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
