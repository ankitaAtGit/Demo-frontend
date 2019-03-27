import React, { Component } from 'react';
import { Form, Button, Input, TextArea, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import * as courseActions from '../../actions/course.actions';
class EditCourse extends Component {
    state = {
        course_name: '',
        course_description: '',
        CategoryId: 0,
        UserId: Number(localStorage.getItem('id'))
    }
    componentWillMount() {
        if (!localStorage.getItem('token') || !localStorage.getItem('id')) {
            this.props.history.replace('/sign-in')
        }
    }
    handleSubmit = () => {
        this.props.createCourse(this.state).then(() => {
            this.props.history.push('/profile')
        });
    }
    render() {
        return (
            <div style={{ margin: 'auto', width: '50%', border: '3px solid #f2711c', padding: '15px' }}>
                <Form>
                    <Form.Field>
                        <label>What would you like to name this course?</label>
                        <Input type='text' value={this.state.course_name} onChange={(e) => this.setState({ course_name: e.target.value })} />
                    </Form.Field>
                    <Form.Field>
                        <label>How would you describe this course?</label>
                        <TextArea value={this.state.course_description} onChange={(e) => this.setState({ course_description: e.target.value })} />
                    </Form.Field>
                    <Form.Field>
                        <label>Which category would best suit your course?</label>
                        <Select onChange={(event, data) => this.setState({ CategoryId: data.value })} options={
                            this.props.category.categories.map(category => (
                                {
                                    key: category.id,
                                    value: category.id,
                                    text: category.category_name
                                }
                            ))
                        } />
                    </Form.Field>
                    <Button type='submit' color='orange' onClick={this.handleSubmit}>Add</Button>{" "}
                    <Button type='button' color='red' onClick={() => (this.props.history.push('/profile'))}>Cancel</Button>
                </Form>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        category: state.category
    }
}
const mapDispatch = (dispatch) => {
    return {
        editCourse: bindActionCreators(courseActions.createCourseAction, dispatch)
    }
}
export default withRouter(connect(mapState, mapDispatch)(EditCourse));