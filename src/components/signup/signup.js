import React, { Component } from 'react';
import { Button, Form, Input, Header, Label, Image, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import ImageUploader from 'react-images-upload'

import * as authActions from '../../actions/auth.actions';

class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        submitted: false,
        picture: [],
        displayPic: ''
    }
    componentWillMount() {
        if (this.props.auth.token !== '') {
            this.props.history.push('/home')
        }
    }
    onDrop = (img) => {
        let reader = new FileReader();
        reader.readAsDataURL(img[0]);
        reader.onloadend = () => {
            this.setState({
                picture: img[0],
                displayPic: reader.result
            });
        }
    }
    removeImage = () => {
        this.setState({ picture: [], displayPic: '' })
    }
    submit = () => {
        this.setState({ submitted: true });
        if (this.state.email !== '' && this.state.password !== '' && this.state.firstName !== '' && this.state.lastName !== '') {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            let data = new FormData();
            let { firstName, lastName } = this.state;
            firstName = firstName.replace(firstName.charAt(0), firstName.charAt(0).toUpperCase())
            lastName = lastName.replace(lastName.charAt(0), lastName.charAt(0).toUpperCase())
            data.append('firstName', firstName)
            data.append('lastName', lastName)
            data.append('email', this.state.email)
            data.append('password', this.state.password)
            data.append('picture', this.state.picture)
            this.props.signUp(data, config).then(() => {
                if (localStorage.getItem('id')) {
                    this.setState({ firstName: '', lastName: '', email: '', password: '', submitted: false, picture: [], displayPic: '' })
                    this.props.history.push('/sign-in')
                }
            })
        }
    }
    render() {
        return (
            <div style={{ margin: 'auto', width: '30%', padding: '15px', boxShadow: '2px 3px 2px 2px lightgrey' }}>
                <Form>
                    <Form.Field>
                        <label>First Name</label>
                        <Input type='text' value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value, submitted: false })} />
                        {this.state.submitted && this.state.firstName === '' ? <Label color='red' pointing basic>Please enter your first name</Label> : null}
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <Input type='text' value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value, submitted: false })} />
                        {this.state.submitted && this.state.lastName === '' ? <Label color='red' pointing basic>Please enter your last name</Label> : null}
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <Input type='email' value={this.state.email} onChange={(e) => this.setState({ email: e.target.value, submitted: false })} />
                        {this.state.submitted && this.state.name !== '' && this.state.email === '' ? <Label color='red' pointing basic>Please enter your email</Label> : null}
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Input type='password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value, submitted: false })} />
                        {this.state.submitted && this.state.name !== '' && this.state.email !== '' && this.state.password === '' ? <Label color='red' pointing basic>Please enter your password</Label> : null}
                    </Form.Field>
                    {this.props.auth.error === '' ? null : <Form.Field><Header size='tiny' color='red'>{this.props.auth.error}</Header></Form.Field>}
                    <Form.Field>
                        <label>Upload your profile picture</label>
                        {
                            this.state.displayPic === '' ? < ImageUploader
                                withIcon={true}
                                name='picture'
                                buttonText='Choose images'
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                singleImage={true} accept={"image/*"}
                                maxFileSize={5242880} /> :
                                <div style={{ textAlign: 'center' }}>
                                    <Image src={this.state.displayPic} size='small' label={<Icon style={{ cursor: "pointer" }} onClick={this.removeImage} name='close' color='red' />} />
                                </div>
                        }
                    </Form.Field>
                    <Button color='blue' onClick={this.submit}>Sign Up</Button>
                    <Header size='tiny'>Already have an account? <Header to='/sign-in' size='tiny' color='blue' as={Link}>Sign In</Header></Header>
                </Form>
            </div>
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
        signUp: bindActionCreators(authActions.signUpAction, dispatch)
    }
}

export default withRouter(connect(mapState, mapDispatch)(SignUp));
