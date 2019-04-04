import React, { Component } from 'react';
import queryString from 'query-string'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Header, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

import CourseCards from './courseCards/courseCards';
import * as courseActions from '../../actions/course.actions';

class Courses extends Component {

    state = {
        smile: false
    }
    componentWillMount() {
        const values = queryString.parse(this.props.location.search)
        this.props.getCourseByCatId(values.id);
    }
    componentWillReceiveProps(nextProps) {
        const newId = queryString.parse(nextProps.location.search).id;
        const oldId = queryString.parse(this.props.location.search).id;
        if (newId !== oldId) {
            this.props.getCourseByCatId(newId);
        }
    }
    selectCourse = (course) => {
        this.props.history.push(`/course/details/${course.id}`)
    }
    addCourse = () => {
        if (localStorage.getItem('token') && localStorage.getItem('id'))
            this.props.history.push('/new-course')
        else
            this.props.history.push('/sign-in')
    }
    render() {
        return (
            <div style={{ margin: '15px' }}>
                {(this.props.courses.length === 0) ?
                    <Header size='medium'>
                        {this.state.smile ? <Icon name='smile outline' color='orange' /> : <Icon name='frown outline' color='orange' />}
                        <Header.Content>
                            Looks like this category doesn't have any courses uploaded. Would you like to add something?
                                <Button icon onClick={this.addCourse} circular floated='right' size='massive' basic onMouseEnter={() => this.setState({ smile: true })} onMouseLeave={() => this.setState({ smile: false })}>
                                <Icon name='plus circle' color='orange' />
                            </Button>
                        </Header.Content>
                    </Header>
                    : (
                        <div style={{ margin: 'auto', width: '90%' }}>
                            <CourseCards courses={this.props.courses} selectCourse={this.selectCourse} />
                        </div>
                    )}
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
        getCourseByCatId: bindActionCreators(courseActions.getCourseByCatId, dispatch)
    }
}

export default withRouter(connect(mapState, mapDispatch)(Courses))