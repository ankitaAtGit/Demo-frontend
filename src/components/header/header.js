import React, { Component } from 'react';
import { Menu, Dropdown, Header as Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as authActions from '../../actions/auth.actions';
import * as categoryActions from '../../actions/category.actions';

class Header extends Component {

    componentWillMount = () => {
        this.props.getCategoriesAction();
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
    render() {
        return (
            <div>
                {this.props.auth.token === '' ?
                    <Menu style={{ backgroundColor: 'firebrick', height: "57px", borderRadius: '0px' }} inverted>
                        <Menu.Item
                            name='Home'
                            onClick={() => this.props.history.push('/home')}
                        >
                            Home
                        </Menu.Item>
                        <Dropdown text='Categories' pointing className='link item'>
                            <Dropdown.Menu>
                                {this.props.category.categories.length > 0 ? this.props.category.categories.map(category => (
                                    <Dropdown.Item key={category.id} onClick={() => this.showCourseById(category.id)}>{category.category_name}</Dropdown.Item>
                                )) : <Message size='small' color='red'>Could not load</Message>}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Item
                            position='right'
                            name='signIn'
                            onClick={this.handleSignInClick}
                        >
                            Sign In
                        </Menu.Item>
                        <Menu.Item
                            name='signUp'
                            onClick={() => this.props.history.push('/sign-up')}
                        >
                            Sign Up
                        </Menu.Item>
                    </Menu> :
                    <Menu style={{ backgroundColor: 'firebrick', height: "55px", borderRadius: '0px' }} inverted>
                        <Menu.Item
                            name='Home'
                            onClick={() => this.props.history.push('/home')}
                        >
                            Home
                        </Menu.Item>
                        <Dropdown text='Categories' pointing className='link item'>
                            <Dropdown.Menu>
                                {this.props.category.categories.length > 0 ? this.props.category.categories.map(category => (
                                    <Dropdown.Item key={category.id} onClick={() => this.showCourseById(category.id)}>{category.category_name}</Dropdown.Item>
                                )) : <Message size='small' color='red'>Could not load</Message>}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Item
                            position='right'
                        >
                            <Dropdown icon='user' pointing className='link item' style={{ marginRight: "40px" }}>
                                <Dropdown.Menu style={{ borderRadius: '0px' }}>
                                    <Dropdown.Item onClick={() => this.props.history.push('/profile')}>Profile</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.props.history.push('/mycourses')}>Courses</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleSignOutClick}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    </Menu>}
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        auth: state.auth,
        category: state.category
    }
}
const mapDispatch = (dispatch) => {
    return {
        signOutAction: bindActionCreators(authActions.signOutAction, dispatch),
        getCategoriesAction: bindActionCreators(categoryActions.getCategoriesAction, dispatch)
    }
}
export default withRouter(connect(mapState, mapDispatch)(Header));