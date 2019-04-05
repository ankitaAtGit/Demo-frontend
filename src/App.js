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
import Cart from './components/cart/cart'
import PrivateRoute from './components/privateroute/privateRoute'

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {/* <PrivateRoute component={Cart} path={'something else'} /> */}
          <Router>
            <Header />
            <Switch>
              <PrivateRoute path='/chapters/:id' component={CourseChapters} />
              <Route path='/sign-in' component={Login} />
              <Route path='/home' component={Dashboard} />
              <PrivateRoute path='/profile' component={UserProfile} />
              <Route path='/course/details/:id' component={Course} />
              <Route path='/course' component={Courses} />
              <Route path='/sign-up' component={SignUp} />
              <PrivateRoute path='/new-course' component={AddCourse} />
              <PrivateRoute path='/edit-course/:id' component={AddCourse} />
              <PrivateRoute path='/mycourses' component={UserCourses} />
              <PrivateRoute path='/cart' component={Cart} />
              <Route path='/' component={Dashboard} />

            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
