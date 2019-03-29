import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

import * as userActions from '../../actions/user.actions';
import * as courseActions from '../../actions/course.actions';
import CourseCards from '../courses/courseCards/courseCards';

class UserCourses extends Component {
    componentWillMount() {
        this.props.getCourse(this.props.id)
    }
    selectCourse = (course) => {
        this.props.history.push(`/course/details/${course.id}`)
    }
    render() {
        return (
            ((localStorage.getItem('id') && Number(localStorage.getItem('id')) === Number(this.props.id))) ?
                <div style={{ marginTop: "20px" }}>
                    {this.props.courses.length === 0 ?
                        <Header size='medium' color='orange'>Looks like you haven't uploaded any courses. Click + to start teaching!</Header>
                        : <CourseCards courses={this.props.courses} selectCourse={this.selectCourse} />}
                </div> : <CourseCards courses={this.props.courses} selectCourse={this.selectCourse} />
        )
    }
}

const mapState = (state) => {
    return {
        id: state.auth.id,
        courses: state.course.courses
    }
}

const mapDispatch = (dispatch) => {
    return {
        getUser: bindActionCreators(userActions.getUserAction, dispatch),
        getCourse: bindActionCreators(courseActions.getCourseByUserId, dispatch)
    }
}

export default withRouter(connect(mapState, mapDispatch)(UserCourses))