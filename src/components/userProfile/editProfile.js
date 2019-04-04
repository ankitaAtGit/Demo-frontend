import React, { Component } from 'react';
import { Button, Form, Input, Label, Image, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import ImageUploader from 'react-images-upload'

import * as userActions from '../../actions/user.actions';
import { imgPath } from '../../constants/path'
import '../../constants/image.css'

class EditProfile extends Component {
    state = {
        firstName: '',
        lastName: '',
        submitted: false,
        picture: [],
        displayPic: ''
    }
    componentWillMount() {
        if (this.props.auth.token === '') {
            this.props.history.push('/sign-in')
        }
        else {
            this.props.getUser(this.props.id).then(() => {
                this.setState({
                    firstName: this.props.user.firstName,
                    lastName: this.props.user.lastName,
                    picture: this.props.user.picture,
                    displayPic: this.props.user.picture ? imgPath + this.props.user.picture : ''
                })
            });
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
        if (this.state.firstName !== '' && this.state.lastName !== '') {
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
            data.append('picture', this.state.picture)
            data.append('email', this.props.user.email)
            this.props.editUser(this.props.id, { firstName, lastName }, data, config)
        }
    }
    render() {
        return (
            <div style={{ width: '100%' }}>
                <div style={{ margin: 'auto', marginTop: '40px', width: '40%', padding: '15px', boxShadow: '2px 3px 2px 2px lightgrey' }}>
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
                        <Button color='linkedin' style={{ borderRadius: "0px" }} onClick={this.submit}>Update</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        auth: state.auth,
        id: state.auth.id,
        user: state.auth.user.user,
    }
}

const mapDispatch = (dispatch) => {
    return {
        getUser: bindActionCreators(userActions.getUserAction, dispatch),
        editUser: bindActionCreators(userActions.editUserAction, dispatch),
    }
}

export default withRouter(connect(mapState, mapDispatch)(EditProfile));
