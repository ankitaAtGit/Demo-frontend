import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Header, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

import EditProfile from './editProfile';
import * as userActions from '../../actions/user.actions';
import * as courseActions from '../../actions/course.actions';
import UserSubCourses from './userSubCourses'
import { imgPath, thumbImgPath } from '../../constants/path';

class UserProfile extends Component {
    state = {
        editProfile: false,
        subCourses: true
    }
    componentWillMount() {
        this.props.getUser(this.props.id)
    }

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <div style={{
                    textAlign: 'center', padding: '12px', height: window.outerHeight, width: '400px', boxShadow: "2px 5px 5px grey"
                }
                }>
                    {
                        this.props.user ?
                            this.props.user.picture
                                ? <Image centered height='100px' width='100px' src={thumbImgPath + this.props.user.picture} circular />
                                : <Image centered height='100px' width='100px' src={imgPath + 'placeholder.jpg'} circular bordered />
                            : null
                    }
                    < Header size='small' > {this.props.user.firstName} {this.props.user.lastName}</Header >
                    <Header size='small'>{this.props.user.email}</Header>
                    <Button style={{ borderRadius: '0px', marginBottom: '12px', width: '165px' }}
                        color='linkedin' onClick={() => this.setState({ editProfile: true, subCourses: false })}>
                        Edit Profile
                </Button>
                    <Button style={{ borderRadius: '0px', width: '165px' }} onClick={() => this.setState({ editProfile: false, subCourses: true })} color='linkedin'> Subscribed Courses</Button>
                </div >
                {this.state.editProfile && !this.state.subCourses ? <EditProfile /> : <UserSubCourses id={this.props.user.id} />}
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        id: state.auth.id,
        user: state.auth.user.user,
        courses: state.course.courses
    }
}

const mapDispatch = (dispatch) => {
    return {
        getUser: bindActionCreators(userActions.getUserAction, dispatch),
        getCourse: bindActionCreators(courseActions.getCourseByUserId, dispatch)
    }
}

export default withRouter(connect(mapState, mapDispatch)(UserProfile))