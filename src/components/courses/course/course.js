import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { Header, Button, Confirm, Icon, Rating, Accordion } from 'semantic-ui-react';

import * as courseActions from '../../../actions/course.actions';
import * as chapterActions from '../../../actions/chapter.actions';

class Course extends Component {
    state = {
        showConfirm: false,
        course_rating: 0,
        subbedCourses: [],
        hover: false,
        activeIndex: -1
    }
    componentWillMount() {
        if (localStorage.getItem('id') && localStorage.getItem('token')) {
            this.props.getSubscribeCourses(Number(localStorage.getItem('id'))).then(() => {
                let i = this.props.subbedCourses.findIndex(course => course.CourseId === Number(this.props.match.params.id));
                if (i !== -1)
                    this.setState({ course_rating: this.props.subbedCourses[i].course_rating, subbedCourses: this.props.subbedCourses })
            })
        }
        this.props.getCourseById(Number(this.props.match.params.id))
        this.props.getChapters(Number(this.props.match.params.id))
    }
    componentWillReceiveProps(newProps) {
        if (newProps.subbedCourses !== this.props.subbedCourses) {
            this.setState({ subbedCourses: newProps.subbedCourses })
        }
    }
    toggleConfirm = () => {
        this.setState(oldState => ({ showConfirm: !oldState.showConfirm }));
    }
    handleDelete = () => {
        this.props.deleteCourse(Number(this.props.match.params.id)).then(() => {
            this.props.history.push('/mycourses')
        })
    }
    subscribe = () => {
        if (localStorage.getItem('id') && localStorage.getItem('token')) {
            this.props.subscribeCourse({ CourseId: this.props.course.course.course.id, UserId: Number(localStorage.getItem('id')) })
        }
        else
            this.props.history.push('/sign-in')
    }
    rateCourse = (event, { rating }) => {
        this.setState({ course_rating: rating })
        this.props.rateCourse(this.props.course.course.course.id, { UserId: Number(localStorage.getItem('id')), course_rating: rating })
    }

    editCourse = () => {
        this.props.history.push(`/edit-course/${this.props.course.course.course.id}`)
    }
    render() {
        let { course } = this.props.course;
        return (
            <div>
                {!course ? null :
                    (<div style={{ display: 'flex' }}>
                        <div style={{ textAlign: 'center', padding: '12px', height: window.outerHeight, width: '300px', boxShadow: "2px 5px 5px grey" }}>
                            <Header size='medium'>{course.course.course_name}</Header>
                            <div style={{ margin: 'auto', width: '19%' }}>
                                <div style={{ color: 'white', height: 'fit-content', padding: '7px', backgroundColor: '#fc0', borderRadius: '5px', width: 'fit-content' }}>
                                    {course.course.course_rating} <Icon name='star' inverted />
                                </div>
                            </div>
                            <Header size='small'>{course.course.course_description}</Header>
                            {course.course.price > 0 ? <Header size='small'>Learn for {course.course.price}/-</Header>
                                : <Header size='small'>Free</Header>}
                            <p>by {course.author.firstName} {course.author.lastName}</p>


                            {(localStorage.getItem('id') && Number(localStorage.getItem('id')) === course.author.id) ?
                                <div>
                                    <Button color='linkedin' style={{ borderRadius: '0px', marginBottom: '12px', width: '100px' }} onClick={this.editCourse}>Edit</Button>
                                    <br />
                                    <Button onClick={this.toggleConfirm} onMouseEnter={() => this.setState({ hover: true })} onMouseLeave={() => this.setState({ hover: false })} style={{ borderRadius: '0px', width: '100px', color: 'white', backgroundColor: this.state.hover ? '#c82333' : '#dc3545', marginBottom: '12px' }}>Delete</Button>
                                    <Confirm
                                        open={this.state.showConfirm}
                                        size='mini'
                                        header={<Header size='small'><Icon name='warning sign' color='yellow' />Are you sure you want to delete this course?</Header>}
                                        content='This action cannot be reversed.'
                                        confirmButton='Yes'
                                        cancelButton='No'
                                        onCancel={this.toggleConfirm}
                                        onConfirm={this.handleDelete}
                                    />
                                </div> :
                                this.state.subbedCourses.findIndex((course) => course.CourseId === this.props.course.course.course.id) === -1 ?
                                    <Button onClick={this.subscribe} style={{ borderRadius: '0px' }} color='linkedin'>Subscribe</Button>
                                    :
                                    (
                                        <div>
                                            <Header size='small'>Rate this course: </Header>
                                            <Rating maxRating={5} onRate={this.rateCourse} rating={this.state.course_rating} icon='star' />{" "}
                                        </div>
                                    )
                            }
                        </div>
                        <div style={{ marginLeft: '200px', marginTop: '30px' }}>
                            <Header>Course Content</Header>
                            {this.props.chapter.chapters.length > 0 ?
                                <Accordion styled style={{ width: '850px' }}>
                                    {this.props.chapter.chapters.map((chapter, i) => {
                                        return (
                                            <div key={i}>
                                                <Accordion.Title active={this.state.activeIndex === i} onClick={(e, { index }) => this.setState(oldState => ({ activeIndex: oldState.activeIndex === index ? -1 : index }))} index={i}>
                                                    <Header size='medium'>{chapter.chapter_title}</Header>
                                                </Accordion.Title>
                                                <Accordion.Content active={this.state.activeIndex === i}>hvfdjgt</Accordion.Content>
                                            </div>
                                        )
                                    })}

                                </Accordion>
                                : null}
                        </div>
                    </div>)
                }
            </div >
        )
    }
}


const mapState = (state) => {
    let { course, data, subbedCourses } = state.course;
    let { chapter } = state;
    return {
        course, data, subbedCourses, chapter
    }
}

const mapDispatch = (dispatch) => {
    return {
        getCourseById: bindActionCreators(courseActions.getCourseById, dispatch),
        subscribeCourse: bindActionCreators(courseActions.subscribeCourse, dispatch),
        getSubscribeCourses: bindActionCreators(courseActions.getSubscribeCourses, dispatch),
        deleteCourse: bindActionCreators(courseActions.deleteCourseAction, dispatch),
        rateCourse: bindActionCreators(courseActions.rateCourseAction, dispatch),
        getChapters: bindActionCreators(chapterActions.getChaptersAction, dispatch)
    }
}

export default withRouter(connect(mapState, mapDispatch)(Course))