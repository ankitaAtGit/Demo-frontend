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
  state = {
    userCart: [],
    cartCount: 0
  }
  componentWillMount() {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]))
    }
    this.setState({
      userCart: JSON.parse(localStorage.getItem('cart')),
      cartCount: JSON.parse(localStorage.getItem('cart')).length
    })

  }
  removeFromUserCart = (courseId) => {
    let { userCart, cartCount } = this.state;
    let x = userCart.findIndex(c => c.id === courseId)
    userCart.splice(x, 1);
    cartCount--;
    this.setState({ userCart, cartCount })
    localStorage.setItem('cart', JSON.stringify(userCart))
  }
  addToUserCart = (course) => {
    let courses = JSON.parse(localStorage.getItem('cart'));
    let newCourses = [...courses, course];
    let { cartCount } = this.state;
    cartCount++;
    localStorage.setItem('cart', JSON.stringify(newCourses))
    this.setState({ userCart: newCourses, cartCount })
  }
  emptyCart = () => {
    this.setState({ userCart: [], cartCount:0 })
    localStorage.setItem('cart', JSON.stringify([]))
  }
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <Header cartCount={this.state.cartCount} />
            <Switch>
              <PrivateRoute path='/chapters/:id' component={CourseChapters} />
              <Route path='/sign-in' render={(props) => <Login {...props} emptyCart={this.emptyCart} />} />
              <Route path='/home' component={Dashboard} />
              <PrivateRoute path='/profile' component={UserProfile} />
              <Route path='/course/details/:id' render={(props) => <Course {...props} addToUserCart={this.addToUserCart} userCart={this.state.userCart} />} />
              <Route path='/course' component={Courses} />
              <Route path='/sign-up' component={SignUp} />
              <PrivateRoute path='/new-course' component={AddCourse} />
              <PrivateRoute path='/edit-course/:id' component={AddCourse} />
              <PrivateRoute path='/mycourses' component={UserCourses} />
              <Route path='/cart' render={(props) => <Cart {...props} userCart={this.state.userCart} removeFromUserCart={this.removeFromUserCart} />} />
              <Route path='/' component={Dashboard} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
