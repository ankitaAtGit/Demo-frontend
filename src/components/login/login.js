import React, { Component } from 'react';
import { Button, Form, Input, Header, Label } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';

import * as authActions from '../../actions/auth.actions';

class Login extends Component {
    state = {
        email: '',
        password: '',
        submitted: false
    }
    componentWillMount() {
        if (this.props.auth.token !== '') {
            this.props.history.push('/home')
        }
    }
    submit = () => {
        this.setState({ submitted: true });
        if (this.state.email !== '' && this.state.password !== '')
            this.props.login(this.state).then(() => {
                if (this.props.auth.token !== '') {
                    this.setState({ email: '', password: '', submitted: false })
                    this.props.history.push('/home')
                }
            })
    }
    render() {
        return (
            <div style={{ margin: 'auto', width: '30%', padding: '15px', boxShadow: '2px 3px 2px 2px lightgrey' }}>
                <Form>
                    <Form.Field>
                        <label>Email</label>
                        <Input type='email' value={this.state.email} onChange={(e) => this.setState({ email: e.target.value, submitted: false })} />
                        {this.state.submitted && this.state.email === '' ? <Label color='red' pointing basic>Please enter your email</Label> : null}
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Input type='password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value, submitted: false })} />
                        {this.state.submitted && this.state.email !== '' && this.state.password === '' ? <Label color='red' pointing basic>Please enter your password</Label> : null}
                    </Form.Field>
                    {this.props.auth.error === '' ? null : <Form.Field><Header size='tiny' color='red'>{this.props.auth.error}</Header></Form.Field>}
                    <Button color='blue' onClick={this.submit}>Sign In</Button>
                    <Header size='tiny'>Don't have an account? <Header to='/sign-up' size='tiny' color='blue' as={Link}>Click here</Header></Header>
                </Form>
            </div >
        )
    }
}

const mapState = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatch = (dispatch) => {
    return {
        login: bindActionCreators(authActions.signInAction, dispatch)
    }
}

export default withRouter(connect(mapState, mapDispatch)(Login));