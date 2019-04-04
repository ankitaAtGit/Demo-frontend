import React, { Component } from 'react';
import { Button, Header, Item } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import * as cartActions from '../../actions/cart.actions'
import CheckoutModal from '../checkout/checkout'

class Cart extends Component {
    state = {
        open: false,
        price: '',
        showSuccess: false
    }
    componentWillMount() {
        this.props.getCart(Number(localStorage.getItem('id'))).then(() => {
            this.setState({
                price: this.props.cart.courseData.reduce((total, ele) => total + ele.price, 0)
            })
        })
    }
    removeFromCart = (courseId) => {
        this.props.removeCart(Number(localStorage.getItem('id')), courseId)
    }
    toggleCheckout = () => {
        this.setState(oldState => ({ open: !oldState.open }))
    }
    render() {
        return (
            <div style={{ margin: '40px' }}>
                {this.props.cart.cart.length > 0 ?
                    <div>
                        <Item.Group>
                            {
                                this.props.cart.courseData.map((course, i) => {
                                    return (
                                        <Item key={i}>
                                            <div style={{ margin: 'auto', width: '900px', boxShadow: '2px 3px 2px 2px lightgrey', padding: '20px' }}>
                                                <div>
                                                    <Item.Content>
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
                                courses={this.props.cart.courseData}
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
        removeCart: bindActionCreators(cartActions.removeCartAction, dispatch)
    }
}
export default withRouter(connect(mapState, mapDispatch)(Cart))