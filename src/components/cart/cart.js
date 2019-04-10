import React, { Component } from 'react';
import { Button, Header, Item } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import * as cartActions from '../../actions/cart.actions'
import CheckoutModal from '../checkout/checkout'

class Cart extends Component {
    state = {
        courses: [],
        open: false,
        price: '',
        showSuccess: false
    }
    componentWillMount() {
        if (localStorage.getItem('id') && localStorage.getItem('token')) {
            this.props.getCart(Number(localStorage.getItem('id'))).then(() => {
                if (this.props.cart.courseData)
                    this.setState({
                        price: this.props.cart.courseData.reduce((total, ele) => total + ele.price, 0),
                        courses: this.props.cart.courseData
                    })
            })
        }
        else {
            let courses = this.props.userCart
            let price = courses.reduce((total, ele) => total + ele.price, 0)
            this.setState({ courses: courses, price: price })
        }
    }
    removeFromCart = (courseId) => {
        if (localStorage.getItem('id') && localStorage.getItem('token')) {
            this.props.removeCart(Number(localStorage.getItem('id')), courseId)
        }
        else {
            let { courses, price } = this.state;
            let x = courses.findIndex(c => c.id === courseId)
            price = price - courses[x].price
            this.setState({ price })
            this.props.removeFromUserCart(courseId)
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.cart && newProps.cart !== this.props.cart)
            if (localStorage.getItem('id') && localStorage.getItem('token')) {
                if (newProps.cart.courseData)
                    this.setState({
                        price: newProps.cart.courseData.reduce((total, ele) => total + ele.price, 0),
                        courses: newProps.cart.courseData
                    })
            }
    }
    toggleCheckout = () => {
        if (localStorage.getItem('id') && localStorage.getItem('token'))
            this.setState(oldState => ({ open: !oldState.open }))
        else
            this.props.history.replace({ pathname: '/sign-in', state: { from: { pathname: this.props.location.pathname } } })
    }
    displayCourse = (courseId) => {
        this.props.history.push(`/course/details/${courseId}`)
    }
    render() {
        return (
            <div style={{ margin: '40px' }}>
                {this.state.courses.length > 0 ?
                    <div>
                        <Item.Group>
                            {
                                this.state.courses.map((course, i) => {
                                    return (
                                        <Item key={i}>
                                            <div style={{ margin: 'auto', width: '900px', boxShadow: '2px 3px 2px 2px lightgrey', padding: '20px' }}>
                                                <div>
                                                    <Item.Content style={{ cursor: 'pointer' }} onClick={() => this.displayCourse(course.id)}>
                                                        <Item.Header>
                                                            <Header>{course.course_name}</Header>
                                                        </Item.Header>
                                                        <Item.Description>
                                                            {course.course_description}
                                                            <br />
                                                            {course.price}
                                                        </Item.Description>
                                                    </Item.Content>
                                                </div>
                                                <Button
                                                    onClick={() => this.removeFromCart(course.id)}
                                                    color='linkedin'
                                                    size='small'
                                                    style={{ marginLeft: '780px', borderRadius: '0px' }}>
                                                    Remove
                                                </Button>
                                            </div>
                                        </Item>
                                    )
                                })
                            }
                            <div style={{ margin: 'auto', width: '900px' }}>
                                <Header>Total: {this.state.price}/-</Header>
                            </div>
                        </Item.Group>
                        <div style={{ float: 'right', marginRight: '20%' }}>
                            <Button
                                onClick={() => { this.props.history.push('/home') }}
                                style={{ borderRadius: '0px' }}
                                color='linkedin'>
                                Keep shopping
                            </Button>
                            <CheckoutModal
                                open={this.state.open}
                                price={this.state.price}
                                toggle={this.toggleCheckout}
                                courses={this.state.courses}
                                trigger={<Button content='Continue to Checkout' icon='right arrow'
                                    onClick={this.toggleCheckout}
                                    labelPosition='right' color='linkedin' style={{ borderRadius: '0px' }}
                                />}
                            >
                            </CheckoutModal>
                        </div>
                    </div> :
                    <Header >Your cart is empty. Keep shopping</Header>}
            </div>
        )
    }
}

const mapState = (state) => {
    let { cart } = state
    return {
        cart
    }
}
const mapDispatch = (dispatch) => {
    return {
        getCart: bindActionCreators(cartActions.getCartAction, dispatch),
        removeCart: bindActionCreators(cartActions.removeCartAction, dispatch),
        // getCourseById: bindActionCreators(courseActions.getCourseById, dispatch)
    }
}
export default withRouter(connect(mapState, mapDispatch)(Cart))