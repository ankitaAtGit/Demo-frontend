import React, { Component } from 'react'
import { Modal, Button, Header, List, Message, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as courseActions from '../../actions/course.actions';
import * as cartActions from '../../actions/cart.actions';

class CheckoutModal extends Component {
    state = {
        showSuccess: false
    }
    subscribe = () => {
        this.props.courses.map(course => {
            this.props.subscribeCourse({ CourseId: course.id, UserId: Number(localStorage.getItem('id')) }, course).then(() => {
                if (this.props.course.error === '') {
                    this.setState({ showSuccess: true })
                    this.props.removeCart(Number(localStorage.getItem('id')), course.id)
                    setTimeout(() => this.props.toggle(), 2000)
                }
            })
            return true
        })
    }

    render() {
        return (
            <Modal style={{ borderRadius: '0px' }} size='tiny' trigger={this.props.trigger} open={this.props.open} onClose={this.props.toggle}>
                <div style={{ padding: '22px' }}>
                    <Message style={{ textAlign: 'center' }} hidden={!this.state.showSuccess} color='green'>
                        <Icon color='green' size='big' loading name='spinner' />
                        Subscribed successfully
                    </Message>
                    <Header>You are purchasing</Header>
                    <List divided relaxed>
                        {
                            this.props.courses.map((course, i) => (<List.Item key={i}>
                                <List.Content>
                                    <List.Header>
                                        {course.course_name} for {course.price}
                                    </List.Header>
                                </List.Content>
                            </List.Item>))
                        }
                    </List>
                    <Header>Total: {this.props.price}</Header>
                    <Button style={{ float: 'right', marginBottom: '12px', borderRadius: '0px' }} color='green' onClick={this.subscribe}>Pay</Button>
                    <Button style={{ float: 'right', marginBottom: '12px', borderRadius: '0px' }}
                        content='Go back' icon='arrow left' labelPosition='left'
                        color='linkedin' onClick={this.props.toggle} />
                </div>
            </Modal >
        )
    }

}

const mapState = (state) => {
    return {
        course: state.course,
    }
}

const mapDispatch = (dispatch) => {
    return {
        subscribeCourse: bindActionCreators(courseActions.subscribeCourse, dispatch),
        removeCart: bindActionCreators(cartActions.removeCartAction, dispatch)
    }
}

export default connect(mapState, mapDispatch)(CheckoutModal)