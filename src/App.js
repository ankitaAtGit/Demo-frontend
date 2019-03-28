import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'

import Header from './components/header/header';
import Login from './components/login/login';
import SignUp from './components/signup/signup';
import Dashboard from './components/dashboard/dashboard';
import UserProfile from './components/userProfile/userProfile'
import Courses from './components/courses/courses'
import AddCourse from './components/addCourse/addCourse'
import Course from './components/courses/course/course'
import UserCourses from './components/userProfile/userCourses'
import store from './store'
import CourseChapters from './components/addCourse/courseChapters'

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <Header />
            <Switch>
              <Route path='/chapters/:id' component={CourseChapters} />
              <Route path='/sign-in' component={Login} />
              <Route path='/home' component={Dashboard} />
              <Route path='/profile' component={UserProfile} />
              <Route path='/course/details/:id' component={Course} />
              <Route path='/course' component={Courses} />
              <Route path='/sign-up' component={SignUp} />
              <Route path='/new-course' component={AddCourse} />
              <Route path='/edit-course/:id' component={AddCourse} />
              <Route path='/mycourses' component={UserCourses} />
              <Route path='/' component={Dashboard} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
