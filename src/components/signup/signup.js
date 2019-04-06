import React, { Component } from 'react';
import { Button, Form, Input, Header, Label, Image, Icon, Message } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import ImageUploader from 'react-images-upload'

import * as authActions from '../../actions/auth.actions';
import '../../constants/image.css'

class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        cpassword: '',
        submitted: false,
        picture: [],
        displayPic: '',
        showSuccess: false,
        invalid: false,
        invalidEmail: false,
        shortPassword: false
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
    handleChange = (e) => {
        if (e.target.name === 'email') this.setState({ invalidEmail: false })
        if (e.target.name === 'password' || e.target.name === 'cpassword') this.setState({ invalid: false, shortPassword: false })
        this.setState({ [e.target.name]: e.target.value, submitted: false })
    }
    removeImage = () => {
        this.setState({ picture: [], displayPic: '' })
    }
    checkPassword = () => {
        const { password, cpassword } = this.state;
        if (password !== cpassword)
            this.setState({ invalid: true })
        else if (password.length < 6) {
            this.setState({ shortPassword: true })
        }
    }
    checkEmail = () => {
        let { email } = this.state;
        if (email !== '' && !email.match(/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{1,3}$/g)) {
            this.setState({ invalidEmail: true })
            return true
        }
    }
    submit = () => {
        localStorage.removeItem('id')
        this.setState({ submitted: true })
        if (this.state.email !== '' && this.state.password !== '' && this.state.firstName !== '' && this.state.lastName !== '' && !this.checkEmail() && !this.state.invalid) {
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
                    this.setState({ showSuccess: true })
                    this.setState({ firstName: '', lastName: '', email: '', password: '', cpassword: '', submitted: false, picture: [], displayPic: '' })
                    setTimeout(() => this.props.history.push('/sign-in'), 2000)

                }
            })
        }
    }
    render() {
        return (
            <div style={{ marginTop: '15px' }} >
                <div style={{ margin: 'auto', width: '30%', marginBottom: '20px' }}>
                    <Message style={{ textAlign: 'center' }} hidden={!this.state.showSuccess} color='green'>
                        <Icon color='green' size='big' loading name='spinner' />
                        Signed up successfully
                    </Message>
                </div>
                <div style={{ margin: 'auto', width: '40%', padding: '15px', boxShadow: '2px 3px 2px 2px lightgrey' }}>
                    <Form>
                        <Form.Group>
                            <Form.Field>
                                <label>First Name*</label>
                                <Input name='firstName' type='text' value={this.state.firstName} onChange={this.handleChange} />
                                {this.state.submitted && this.state.firstName === '' ? <Label color='red' pointing basic>Please enter your first name</Label> : null}
                            </Form.Field>
                            <Form.Field>
                                <label>Last Name*</label>
                                <Input type='text' name='lastName' value={this.state.lastName} onChange={this.handleChange} />
                                {this.state.submitted && this.state.lastName === '' ? <Label color='red' pointing basic>Please enter your last name</Label> : null}
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field>
                                <label>Email*</label>
                                <Input type='text' name='email' value={this.state.email} onChange={this.handleChange} onBlur={this.checkEmail} />
                                {this.state.submitted && this.state.email === '' ? <Label color='red' pointing basic>Please enter your email</Label> : null}
                                {this.state.invalidEmail ? <Label color='red' pointing basic>Please enter a valid email</Label> : null}
                            </Form.Field>
                            <Form.Field>
                                <label>Password*</label>
                                <Input type='password' name='password' value={this.state.password} onChange={this.handleChange} onBlur={this.checkPassword} />
                                {this.state.submitted && this.state.password === '' ? <Label color='red' pointing basic>Please enter your password</Label> : null}
                                {this.state.shortPassword && this.state.password !== '' ? <Label color='red' pointing basic>Your password should be of 6 characters or more</Label> : null}
                            </Form.Field>
                            <Form.Field>
                                <label>Confirm Password*</label>
                                <Input type='password' name='cpassword' value={this.state.cpassword} onChange={this.handleChange} onBlur={this.checkPassword} />
                                {this.state.invalid ? <Label color='red' pointing basic>The passwords do not match</Label> : null}
                            </Form.Field>
                        </Form.Group>
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
                                        <div className="profile-pic">
                                            <Image src={this.state.displayPic} size='small' alt='' />
                                            <div className="edit"><Icon style={{ cursor: "pointer" }} onClick={this.removeImage} name='remove circle' color='red' /></div>
                                        </div>
                                    </div>
                            }
                        </Form.Field>
                        {this.props.auth.signUpError === '' ? null : <Form.Field><Header size='tiny' color='red'>{this.props.auth.signUpError}</Header></Form.Field>}
                        <Button color='linkedin' style={{ borderRadius: '0px' }} onClick={this.submit}>Sign Up</Button>
                        <Header size='tiny'>Already have an account? <Header to='/sign-in' size='tiny' color='blue' as={Link}>Sign In</Header></Header>
                    </Form>

                </div>
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
        signUp: bindActionCreators(authActions.signUpAction, dispatch)
    }
}

export default withRouter(connect(mapState, mapDispatch)(SignUp));
