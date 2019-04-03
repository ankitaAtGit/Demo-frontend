import React, { Component } from 'react';
import { Form, Button, Input, TextArea, Select, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import * as courseActions from '../../actions/course.actions';

class AddCourse extends Component {
    state = {
        course_name: '',
        course_description: '',
        CategoryId: 0,
        UserId: Number(localStorage.getItem('id')),
        price: '',
        submitted: false,
        invalid: false,
        hover: false
    }
    componentWillMount() {
        if (!localStorage.getItem('token') || !localStorage.getItem('id')) {
            this.props.history.replace('/sign-in')
        }
        if (this.props.match.params.id) {
            this.props.getCourseById(Number(this.props.match.params.id)).then(() => {
                if (this.props.course)
                    if (Number(localStorage.getItem('id')) === this.props.course.course.course.UserId)
                        this.setState({
                            course_name: this.props.course.course.course.course_name,
                            course_description: this.props.course.course.course.course_description,
                            CategoryId: this.props.course.course.course.CategoryId,
                            UserId: this.props.course.course.course.UserId,
                            price: this.props.course.course.course.price
                        })
                    else
                        this.props.history.replace('/sign-in')
            })
        }

    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, submitted: false, invalid: false })
    }
    handleSubmit = () => {
        this.setState({ submitted: true });
        if (this.state.course_name !== '' && this.state.course_description !== '' && this.state.CategoryId !== 0 && this.state.price !== '') {
            let { course_name, course_description, CategoryId, UserId, price } = this.state;
            if (price < 0)
                this.setState({ invalid: true })
            else
                this.props.createCourse({ course_name, course_description, CategoryId, UserId, price }).then(() => {
                    this.setState({ course_name: '', course_description: '', CategoryId: 0, price: '', submitted: false })
                    this.props.history.push(`/chapters/${this.props.course.id}`)
                });
        }
    }
    handleUpdate = () => {
        this.setState({ submitted: true });
        if (this.state.course_name !== '' && this.state.course_description !== '' && this.state.CategoryId !== 0 && this.state.price !== '') {
            let { course_name, course_description, CategoryId, UserId, price } = this.state;
            if (price < 0)
                this.setState({ invalid: true })
            else
                this.props.editCourse(Number(this.props.match.params.id), { course_name, course_description, CategoryId, UserId, price }).then(() => {
                    this.setState({ course_name: '', course_description: '', CategoryId: 0, price: '', submitted: false })
                    this.props.history.push(`/course/details/${this.props.match.params.id}`)
                });
        }
    }
    render() {
        return (
            <div style={{ margin: 'auto', width: '50%', boxShadow: '2px 3px 2px 2px lightgrey', padding: '15px' }}>
                <Form>
                    <Form.Field>
                        <label>What would you like to name this course?*</label>
                        <Input type='text' value={this.state.course_name} name='course_name' onChange={this.handleChange} />
                        {this.state.submitted && this.state.course_name === '' ? <Label color='red' pointing basic>This field cannot be empty</Label> : null}
                    </Form.Field>
                    <Form.Field>
                        <label>How would you describe this course?*</label>
                        <TextArea value={this.state.course_description} name='course_description' onChange={this.handleChange} />
                        {this.state.submitted && this.state.course_description === '' ? <Label color='red' pointing basic>This field cannot be empty</Label> : null}
                    </Form.Field>
                    <Form.Field>
                        <label>Which category would best suit your course?*</label>
                        <Select onChange={(event, data) => this.setState({ CategoryId: data.value, submitted: false })} value={this.state.CategoryId} options={
                            this.props.category.categories.map(category => (
                                {
                                    key: category.id,
                                    value: category.id,
                                    text: category.category_name
                                }
                            ))
                        } />
                        {this.state.submitted && this.state.CategoryId === 0 ? <Label color='red' pointing basic>Please select a category for your course</Label> : null}
                    </Form.Field>
                    <Form.Field>
                        <label>Set a price for this course*:</label>
                        <Input type='number' value={this.state.price} name='price' onChange={this.handleChange} />
                        {this.state.submitted && this.state.price === '' ? <Label color='red' pointing basic>This field cannot be empty</Label> : null}
                        {this.state.submitted && this.state.invalid && this.state.price !== '' ? <Label color='red' pointing basic>Price cannot be negative</Label> : null}
                    </Form.Field>
                    <div>
                        {this.props.match.params.id ?
                            <div>
                                <Button color='linkedin' style={{ borderRadius: "0px" }} onClick={() => { this.props.history.push(`/chapters/${this.props.match.params.id}`) }}>Update Chapters</Button>
                                <Button type='submit' color='linkedin' style={{ borderRadius: '0px', marginBottom: '12px', width: '150px' }} onClick={this.handleUpdate}>Save Changes</Button>
                            </div>
                            : <Button type='submit' color='linkedin' style={{ borderRadius: '0px', marginBottom: '12px', width: '100px' }} onClick={this.handleSubmit}>Add</Button>}{" "}
                        <Button type='button' onMouseEnter={() => this.setState({ hover: true })} onMouseLeave={() => this.setState({ hover: false })} style={{ borderRadius: '0px', color: 'white', backgroundColor: this.state.hover ? '#c82333' : '#dc3545', marginLeft: '88%' }} onClick={() => (this.props.match.params.id ? this.props.history.push(`/course/details/${this.props.match.params.id}`) : this.props.history.push('/mycourses'))}>Cancel</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        category: state.category,
        course: state.course.course
    }
}
const mapDispatch = (dispatch) => {
    return {
        createCourse: bindActionCreators(courseActions.createCourseAction, dispatch),
        getCourseById: bindActionCreators(courseActions.getCourseById, dispatch),
        editCourse: bindActionCreators(courseActions.editCourseAction, dispatch)
    }
}
export default withRouter(connect(mapState, mapDispatch)(AddCourse));