import React, { Component } from 'react';
import { Menu, Dropdown, Header as Message, Search, Button, Icon, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as authActions from '../../actions/auth.actions';
import * as categoryActions from '../../actions/category.actions';
import * as courseActions from '../../actions/course.actions';
import * as cartActions from '../../actions/cart.actions';

class Header extends Component {
    state = {
        searchResults: [],
        query: ''
    }

    componentWillMount() {
        if (this.props.course.allCourses.length === 0) {
            this.props.getAllCourses();
        }
        this.props.getCategoriesAction();
        if (localStorage.getItem('token') && localStorage.getItem('id')) {
            this.props.countCart(Number(localStorage.getItem('id')))
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.auth.id !== this.props.auth.id)
            if (localStorage.getItem('token') && localStorage.getItem('id')) {
                this.props.countCart(Number(localStorage.getItem('id')))
            }
    }
    handleSignInClick = () => {
        this.props.history.push('/sign-in')
    }
    handleSignOutClick = () => {
        this.props.signOutAction()
        this.props.history.push('/home')
    }
    showCourseById(id) {
        this.props.history.push(`/course/?id=${id}`)
    }
    addCourse = () => {
        this.props.history.push('/new-course')
    }
    resultSelect = (e, { result }) => {
        this.setState({ query: '' })
        this.props.history.push(`/course/details/${result.id}`)
    }
    searchCourse = (e, { value }) => {
        this.setState({ query: value })
        const results = [];
        if (value !== '') {
            const query = new RegExp(`^${value}+([a-z|A-z|0-9|/ ])*$`, 'ig')
            this.props.course.allCourses.map((course) => {
                if (course.course_name.match(query)) {
                    results.push({ key: course.id, title: course.course_name, description: course.course_description, id: course.id })
                }
                return true
            })
            this.setState({ searchResults: results })
        }
    }
    render() {
        return (
            <div>
                {this.props.auth.token === '' ?
                    <Menu style={{ backgroundColor: '#dc3545', height: "60px", borderRadius: '0px', padding: '12px' }} inverted>
                        <Menu.Item
                            name='Home'
                            onClick={() => this.props.history.push('/home')}
                        >
                            Home
                        </Menu.Item>
                        <Dropdown icon={<div><Icon name='th' />Categories</div>} pointing item>
                            <Dropdown.Menu>
                                {this.props.category.categories.length > 0 ? this.props.category.categories.map(category => (
                                    <Dropdown.Item key={category.id} onClick={() => this.showCourseById(category.id)}>{category.category_name}</Dropdown.Item>
                                )) : <Message size='small' color='red'>Could not load</Message>}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Search className='item' style={{ marginLeft: '325px', width: '400px' }}
                            placeholder='Search for a course...'
                            onSearchChange={this.searchCourse}
                            results={this.state.searchResults}
                            onResultSelect={this.resultSelect}
                            value={this.state.query}>
                        </Search>
                        <Menu.Item position='right'>
                            <Button className='link item' onClick={this.handleSignInClick} content='Login' />
                        </Menu.Item>
                        <Menu.Item>
                            <Button className='link item' onClick={() => this.props.history.push('/sign-up')} content='Sign Up' />

                        </Menu.Item>
                    </Menu> :
                    <Menu style={{ backgroundColor: '#dc3545', height: "60px", borderRadius: '0px', padding: '12px' }} inverted>
                        <Menu.Item
                            name='Home'
                            onClick={() => this.props.history.push('/home')}
                        >
                            Home
                        </Menu.Item>
                        <Dropdown icon={<div><Icon name='th' />Categories</div>} pointing item>
                            <Dropdown.Menu>
                                {this.props.category.categories.length > 0 ? this.props.category.categories.map(category => (
                                    <Dropdown.Item key={category.id} onClick={() => this.showCourseById(category.id)}>{category.category_name}</Dropdown.Item>
                                )) : <Message size='small' color='red'>Could not load</Message>}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Search className='item' style={{ marginLeft: '325px', width: '400px' }}
                            placeholder='Search for a course...'
                            onSearchChange={this.searchCourse}
                            results={this.state.searchResults}
                            onResultSelect={this.resultSelect}
                            value={this.state.query}>
                        </Search>
                        <Menu.Item name='cart' position='right' as='a' onClick={() => { this.props.history.push('/cart') }} >
                            <Icon name='cart' style={{ fontSize: '25px' }} />
                            {this.props.cart.count > 0 ? < Label size='mini' circular color='blue' floating>{this.props.cart.count}</Label> : null}
                        </Menu.Item>
                        <Menu.Item>
                            <Button content='Upload Course' className='link item' icon='plus' onClick={this.addCourse} />
                        </Menu.Item>
                        <Dropdown text='Profile' className='item'>
                            <Dropdown.Menu style={{ borderRadius: '0px' }}>
                                <Dropdown.Item onClick={() => this.props.history.push('/profile')}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.props.history.push('/mycourses')}>Courses</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Item>
                            <Button className='link item' onClick={this.handleSignOutClick} icon='user' content='Logout' />
                        </Menu.Item>
                    </Menu>}
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        auth: state.auth,
        category: state.category,
        course: state.course,
        cart: state.cart
    }
}
const mapDispatch = (dispatch) => {
    return {
        signOutAction: bindActionCreators(authActions.signOutAction, dispatch),
        getCategoriesAction: bindActionCreators(categoryActions.getCategoriesAction, dispatch),
        countCart: bindActionCreators(cartActions.countCartAction, dispatch),
        getAllCourses: bindActionCreators(courseActions.getAllCourses, dispatch)
    }
}
export default withRouter(connect(mapState, mapDispatch)(Header));