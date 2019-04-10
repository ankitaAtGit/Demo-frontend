import React, { Component } from 'react'
import { Item, Button, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom';

import * as wishlistActions from '../../actions/wishlist.action';
import * as cartActions from '../../actions/cart.actions';

class Wishlist extends Component {
    state = {
        wishlist: [],
        cart: []
    }
    componentWillMount() {
        this.props.getWishlist(Number(localStorage.getItem('id'))).then(() => {
            if (this.props.wishlist.error === '') {
                this.setState({ wishlist: this.props.wishlist.courseData })
            }
        })
        this.props.getCart(Number(localStorage.getItem('id'))).then(() => {
            if (this.props.cart.error === '') {
                this.setState({ cart: this.props.cart.cart })
            }
        })
    }

    componentWillReceiveProps(newProps) {
        if (this.props.wishlist.courseData !== newProps.wishlist.courseData) {
            this.setState({ wishlist: newProps.wishlist.courseData })
        }
        if (this.props.cart.cart !== newProps.cart.cart)
            this.setState({ cart: newProps.cart.cart })
    }
    addToCart = (courseId) => {
        this.props.addToCart({ UserId: Number(localStorage.getItem('id')), CourseId: courseId })
    }
    removeWishlist = (courseId) => {
        this.props.removeWishlist(Number(localStorage.getItem('id')), courseId)
    }
    displayCourse = (courseId) => {
        this.props.history.push(`/course/details/${courseId}`)
    }
    render() {
        return (
            <div style={{ margin: '25px' }}>
                {this.state.wishlist.length > 0
                    ? <Item.Group>
                        {
                            this.state.wishlist.map((course, i) => {
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

                                            {this.state.cart.findIndex(c => c.CourseId === course.id) === -1 ?
                                                <Button
                                                    onClick={() => this.addToCart(course.id)}
                                                    color='linkedin'
                                                    size='small'
                                                    style={{ marginLeft: '650px', borderRadius: '0px' }}>
                                                    Add to Cart
                                                </Button>
                                                : <Button
                                                    onClick={() => this.props.history.push('/cart')}
                                                    color='linkedin'
                                                    size='small'
                                                    style={{ marginLeft: '650px', borderRadius: '0px' }}>
                                                    Go to Cart
                                                </Button>}
                                            <Button
                                                onClick={() => this.removeWishlist(course.id)}
                                                color='linkedin'
                                                size='small'
                                                style={{ borderRadius: '0px' }}>
                                                Remove
                                            </Button>
                                        </div>
                                    </Item>
                                )
                            })
                        }
                    </Item.Group> :
                    <Header>Your wishlist is empty</Header>}
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        wishlist: state.wishlist,
        cart: state.cart
    }
}

const mapDispatch = (dispatch) => {
    return {
        getWishlist: bindActionCreators(wishlistActions.getWishlistAction, dispatch),
        removeWishlist: bindActionCreators(wishlistActions.removeWishlistAction, dispatch),
        addToCart: bindActionCreators(cartActions.addToCartAction, dispatch),
        getCart: bindActionCreators(cartActions.getCartAction, dispatch)
    }
}

export default withRouter(connect(mapState, mapDispatch)(Wishlist))