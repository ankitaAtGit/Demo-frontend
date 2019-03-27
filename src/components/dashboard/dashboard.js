import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as courseActions from '../../actions/course.actions';
import CourseCards from '../courses/courseCards/courseCards';

class Dashboard extends Component {
    componentWillMount() {
        this.props.getAllCourses();
    }
    selectCourse = (course) => {
        this.props.history.push(`/course/details/${course.id}`)
    }
    render() {
        return (
            <div style={{ margin: '15px' }}>
                <CourseCards courses={this.props.courses} selectCourse={this.selectCourse} />
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        courses: state.course.courses
    }
}

const mapDispatch = (dispatch) => {
    return {
        getAllCourses: bindActionCreators(courseActions.getAllCourses, dispatch)
    }
}
export default connect(mapState, mapDispatch)(Dashboard)