import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';

import CourseCards from '../courses/courseCards/courseCards';
import * as courseActions from '../../actions/course.actions';
import { Header } from 'semantic-ui-react';

class UserSubCourses extends Component {
    componentWillReceiveProps(newProps) {
        if (newProps.id !== this.props.id)
            this.props.getCourseDetails(newProps.id)
    }
    selectCourse = (course) => {
        this.props.history.push(`/course/details/${course.id}`)
    }
    render() {
        return (
            <div style={{ margin: '30px', width: '100%' }}>
                <Header textAlign='center'>Subscribed Courses</Header>
                <hr />
                <br/>
                <CourseCards courses={this.props.courses} selectCourse={this.selectCourse} />
            </div >
        )
    }
}

const mapState = (state) => {
    return {
        courses: state.course.subCourseDetails
    }
}

const mapDispatch = (dispatch) => {
    return {
        getCourseDetails: bindActionCreators(courseActions.getSubscribeCourses, dispatch)
    }
}

export default withRouter(connect(mapState, mapDispatch)(UserSubCourses))