import React, { Component } from 'react';
import { Button, Form, Input, Header, Label, Message, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';

import * as authActions from '../../actions/auth.actions';
import * as cartActions from '../../actions/cart.actions';
import * as courseActions from '../../actions/course.actions';

class Login extends Component {
    state = {
        email: '',
        password: '',
        submitted: false,
        showSuccess: false,
        invalidEmail: false
    }
    componentWillMount() {
        if (this.props.auth.token !== '') {
            this.props.history.push('/home')
        }
    }
    checkEmail = () => {
        const { email } = this.state;
        if (email !== '' && !email.match(/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{1,3}$/g)) {
            this.setState({ invalidEmail: true })
            return true
        }
    }
    handleChange = (e) => {
        if (e.target.name === 'email') this.setState({ invalidEmail: false })
        this.setState({ [e.target.name]: e.target.value, submitted: false })
    }
    submit = () => {
        this.setState({ submitted: true });
        if (this.state.email !== '' && this.state.password !== '' && !this.checkEmail())
            this.props.login(this.state).then(() => {
                if (this.props.auth.token !== '') {
                    this.setState({ email: '', password: '', submitted: false, showSuccess: true })
                    this.props.getCoursesByUser(this.props.auth.id).then(() => {
                        let courses = this.props.course.courses
                        if (JSON.parse(localStorage.getItem('cart')).length > 0) {
                            JSON.parse(localStorage.getItem('cart')).forEach(c => {
                                if (courses.findIndex(course => course.id === c.id) === -1)
                                    this.props.addToCart({ UserId: this.props.auth.id, CourseId: c.id })
                            })
                            this.props.emptyCart();
                        }
                    })
                    if (this.props.location.state)
                        setTimeout(() => this.props.history.push(this.props.location.state.from.pathname), 2000)
                    else
                        setTimeout(() => this.props.history.push('/home'), 2000)
                }
            })
    }
    render() {
        return (
            <div style={{ margin: 'auto', width: '50%', marginTop: '20px' }}>
                <div style={{ margin: 'auto', width: '50%', marginBottom: '20px' }}>
                    <Message style={{ textAlign: 'center' }} hidden={!this.state.showSuccess} color='green'>
                        <Icon color='green' size='big' loading name='spinner' />
                        Signed in successfully
                    </Message>
                </div>
                <div style={{ margin: 'auto', width: '60%', padding: '15px', boxShadow: '2px 3px 2px 2px lightgrey' }}>
                    <Form>
                        <Form.Field>
                            <label>Email</label>
                            <Input type='text' name='email' value={this.state.email} onChange={this.handleChange} onBlur={this.checkEmail} />
                            {this.state.submitted && this.state.email === '' ? <Label color='red' pointing basic>Please enter your email</Label> : null}
                            {this.state.invalidEmail ? < Label color='red' pointing basic>The email you have entered is invalid</Label> : null}
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
                            {this.state.submitted && this.state.email !== '' && this.state.password === '' ? <Label color='red' pointing basic>Please enter your password</Label> : null}
                        </Form.Field>
                        {this.props.auth.signInError === '' ? null : <Form.Field><Header size='tiny' color='red'>{this.props.auth.signInError}</Header></Form.Field>}
                        <Button color='linkedin' style={{ borderRadius: '0px' }} onClick={this.submit}>Sign In</Button>
                        <Header size='tiny'>Don't have an account? <Header to='/sign-up' size='tiny' color='blue' as={Link}>Click here</Header></Header>
                    </Form>
                </div >
            </div >
        )
    }
}

const mapState = (state) => {
    return {
        auth: state.auth,
        course: state.course
    }
}

const mapDispatch = (dispatch) => {
    return {
        login: bindActionCreators(authActions.signInAction, dispatch),
        addToCart: bindActionCreators(cartActions.addToCartAction, dispatch),
        getCoursesByUser: bindActionCreators(courseActions.getCourseByUserId, dispatch)
    }
}

export default withRouter(connect(mapState, mapDispatch)(Login));