import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { Header, Button, Confirm, Icon, Rating, Accordion, Table } from 'semantic-ui-react';

import * as courseActions from '../../../actions/course.actions';
import * as wishlistActions from '../../../actions/wishlist.action'
import * as chapterActions from '../../../actions/chapter.actions';
import * as cartActions from '../../../actions/cart.actions'
import CheckoutModal from '../../checkout/checkout';
// import LectureViewer from './lectureViewer'
import { filePath } from '../../../constants/path';

class Course extends Component {
    state = {
        cart: [],
        showConfirm: false,
        course_rating: 0,
        subbedCourses: [],
        hover: false,
        activeIndex: -1,
        open: false,
        showError: false,
        subscriberCount: 0,
        wishlist: []
    }
    componentWillMount() {
        if (localStorage.getItem('id') && localStorage.getItem('token')) {
            this.props.getCart(Number(localStorage.getItem('id')))
            this.props.getWishlist(Number(localStorage.getItem('id'))).then(() => {
                if (this.props.wishlist.error === '') {
                    this.setState({ wishlist: this.props.wishlist.wishlist })
                }
            })
            this.props.getSubscribeCourses(Number(localStorage.getItem('id'))).then(() => {
                let i = this.props.course.subbedCourses.findIndex(course => course.CourseId === Number(this.props.match.params.id));
                if (i !== -1)
                    this.setState({ course_rating: this.props.course.subbedCourses[i].course_rating, subbedCourses: this.props.course.subbedCourses })
            })
        }
        else {
            this.setState({ cart: this.props.userCart })
        }
        this.props.getCourseById(Number(this.props.match.params.id)).then(() => {
            this.setState({ subscriberCount: this.props.course.course.subscriberCount })
        })
        this.props.getChapters(Number(this.props.match.params.id))
    }
    componentWillReceiveProps(newProps) {
        if (newProps.match.params.id !== this.props.match.params.id) {
            if (localStorage.getItem('id') && localStorage.getItem('token')) {
                this.props.getSubscribeCourses(Number(localStorage.getItem('id'))).then(() => {
                    let i = newProps.course.subbedCourses.findIndex(course => course.CourseId === Number(newProps.match.params.id));
                    if (i !== -1)
                        this.setState({ course_rating: newProps.course.subbedCourses[i].course_rating, subbedCourses: newProps.course.subbedCourses })
                })
            }
            this.props.getCourseById(Number(newProps.match.params.id))
            this.props.getChapters(Number(newProps.match.params.id))
        }
        if (newProps.course.subbedCourses !== this.props.course.subbedCourses) {
            this.setState({ subbedCourses: newProps.course.subbedCourses })
        }
        if (newProps.userCart !== this.props.userCart) {
            this.setState({ cart: newProps.userCart })
        }
        if (newProps.wishlist.wishlist !== this.props.wishlist.wishlist) {
            this.setState({ wishlist: newProps.wishlist.wishlist })
        }
        this.setState({ subscriberCount: newProps.course.course.subscriberCount })
    }
    toggleConfirm = () => {
        this.setState(oldState => ({ showConfirm: !oldState.showConfirm, showError: false }));
    }
    handleDelete = () => {
        this.props.deleteCourse(Number(this.props.match.params.id)).then(() => {
            if (this.props.course.error === '') {
                this.props.history.push('/mycourses')
            }
            else {
                this.setState({
                    showError: true
                })
            }
        })
    }
    goToCart = () => {
        this.props.history.push('/cart')
    }
    toggle = () => {
        this.setState(oldState => ({ open: !oldState.open }))
    }
    subscribe = () => {
        if (localStorage.getItem('id') && localStorage.getItem('token')) {
            this.toggle()
        }
        else {
            this.props.history.replace({ pathname: '/sign-in', state: { from: { pathname: this.props.location.pathname } } })
        }
    }
    removeWishlist = (courseId) => {
        this.props.removeFromWishlist(Number(localStorage.getItem('id')), courseId)
    }
    addWishlist = (courseId) => {
        this.props.addToWishlist({ UserId: Number(localStorage.getItem('id')), CourseId: courseId })
    }
    rateCourse = (event, { rating }) => {
        this.setState({ course_rating: rating })
        this.props.rateCourse(this.props.course.course.id, { UserId: Number(localStorage.getItem('id')), course_rating: rating })
    }
    addToCart = () => {
        if (localStorage.getItem('token'))
            this.props.addToCart({ UserId: Number(localStorage.getItem('id')), CourseId: this.props.course.course.id })
        else {
            this.props.addToUserCart(this.props.course.course);
        }
    }
    editCourse = () => {
        this.props.history.push(`/edit-course/${this.props.course.course.id}`)
    }
    render() {
        let { course } = this.props.course;
        return (
            <div>
                {!course.author ? null :
                    (<div style={{ display: 'flex' }}>
                        <div style={{ textAlign: 'center', padding: '26px', height: window.outerHeight, width: '300px', boxShadow: "2px 5px 5px grey" }}>
                            <Header size='medium'>{course.course_name}</Header>
                            <div style={{ margin: 'auto', width: '19%' }}>
                                <div style={{ color: 'white', height: 'fit-content', padding: '7px', backgroundColor: '#fc0', borderRadius: '5px', width: 'fit-content' }}>
                                    {course.course_rating} <Icon name='star' inverted />
                                </div>
                            </div>
                            <Header size='small'>{course.course_description}</Header>
                            {course.price > 0 ? <Header size='small'>Learn for {course.price}/-</Header>
                                : <Header size='small'>Free</Header>}
                            <p>by {course.author.firstName} {course.author.lastName}</p>
                            <p>by {course.author.email}</p>
                            {this.state.subscriberCount !== 1 ? <p>Subscribed by {this.state.subscriberCount} users</p>
                                : <p>Subscribed by {this.state.subscriberCount} user</p>}

                            {(localStorage.getItem('token') && localStorage.getItem('id') && Number(localStorage.getItem('id')) === course.author.id) ?
                                <div>
                                    <Button color='linkedin' style={{ borderRadius: '0px', marginBottom: '12px', width: '100px' }} onClick={this.editCourse}>Edit</Button>
                                    <br />
                                    <Button onClick={this.toggleConfirm} onMouseEnter={() => this.setState({ hover: true })} onMouseLeave={() => this.setState({ hover: false })} style={{ borderRadius: '0px', width: '100px', color: 'white', backgroundColor: this.state.hover ? '#c82333' : '#dc3545', marginBottom: '12px' }}>Delete</Button>
                                    <Confirm
                                        open={this.state.showConfirm}
                                        size='mini'
                                        content={
                                            this.state.showError ? < Header size='tiny' color='red'>
                                                {this.props.course.error}
                                            </Header> : null
                                        }
                                        header={
                                            <Header size='small'>
                                                <Icon name='warning sign' color='yellow' />Are you sure you want to delete this course?
                                            </Header>
                                        }
                                        confirmButton='Yes'
                                        cancelButton='Cancel'
                                        onCancel={this.toggleConfirm}
                                        onConfirm={this.handleDelete}
                                    >
                                    </Confirm>
                                </div> :
                                this.state.subbedCourses.findIndex((c) => c.CourseId === course.id) === -1 ?
                                    <div>
                                        <CheckoutModal
                                            toggle={this.toggle}
                                            price={course.price}
                                            courses={[course]}
                                            open={this.state.open}
                                            trigger={<Button onClick={this.subscribe} style={{ borderRadius: '0px' }} color='linkedin'>Buy Now</Button>} />
                                        {localStorage.getItem('id') && localStorage.getItem('token') ?
                                            this.props.cart.cart.findIndex((cart => cart.CourseId === course.id)) === -1 ?
                                                <Button style={{ borderRadius: '0px' }} onClick={this.addToCart} color='linkedin'>Add to Cart</Button> :
                                                <Button style={{ borderRadius: '0px' }} onClick={this.goToCart} color='linkedin'>Go to Cart</Button> :
                                            this.state.cart.findIndex(c => c.id === course.id) === -1 ?
                                                <Button style={{ borderRadius: '0px' }} onClick={this.addToCart} color='linkedin'>Add to Cart</Button> :
                                                <Button style={{ borderRadius: '0px' }} onClick={this.goToCart} color='linkedin'>Go to Cart</Button>}
                                        {localStorage.getItem('id') && localStorage.getItem('token') ?
                                            this.state.wishlist.findIndex((w => w.CourseId === course.id)) === -1 ?
                                                <Button style={{ borderRadius: '0px', marginTop: '10px' }} onClick={() => this.addWishlist(course.id)} inverted icon='heart' color='red' content='Add to Wishlist' /> :
                                                <Button style={{ borderRadius: '0px', marginTop: '10px' }} basic icon='heart' content='Remove From Wishlist' onClick={() => this.removeWishlist(course.id)} />
                                            : null}
                                    </div>
                                    :
                                    (
                                        <div>
                                            <Header size='small'>Rate this course: </Header>
                                            <Rating maxRating={5} onRate={this.rateCourse} rating={this.state.course_rating} icon='star' />{" "}
                                        </div>
                                    )
                            }
                        </div>
                        <div style={{ marginLeft: '170px', marginTop: '30px' }}>
                            {(localStorage.getItem('token') && (this.state.subbedCourses.findIndex((c) => c.CourseId === course.id) !== -1)) ||
                                (localStorage.getItem('token') && Number(localStorage.getItem('id')) === course.author.id) ?
                                <div>
                                    <Header>Course Content</Header>
                                    {this.props.chapter.chapters.length > 0 ? <Accordion styled style={{ width: '800px' }}>
                                        {this.props.chapter.chapters.map((chapter, i) => {
                                            return (
                                                <div key={i}>
                                                    <Accordion.Title active={this.state.activeIndex === i} onClick={(e, { index }) => this.setState(oldState => ({ activeIndex: oldState.activeIndex === index ? -1 : index }))} index={i}>
                                                        <div style={{ display: 'flex' }}>
                                                            <div style={{ width: '50%' }}>
                                                                <Header size='medium'>{chapter.chapter_title}</Header>
                                                            </div>
                                                        </div>
                                                    </Accordion.Title>
                                                    {chapter.ChapterFiles.length > 0 ? <Accordion.Content active={this.state.activeIndex === i}>
                                                        <Table>
                                                            <Table.Body>
                                                                {chapter.ChapterFiles.map((file, i) => {
                                                                    return <Table.Row key={i}>
                                                                        <Table.Cell>
                                                                            <a target='new' href={filePath + file.file_name}>
                                                                                <Header style={{ cursor: 'pointer' }} color='grey' size='tiny'>
                                                                                    {file.file_type.match('video') ? <Icon name='video play' /> : <Icon name='file' />}
                                                                                    {file.file_name}
                                                                                </Header>
                                                                            </a>

                                                                        </Table.Cell>
                                                                    </Table.Row>
                                                                })}
                                                            </Table.Body>
                                                        </Table>
                                                    </Accordion.Content> : null}
                                                </div>
                                            )
                                        })}
                                    </Accordion> : null
                                    }
                                </div> :
                                this.props.chapter.chapters.length > 0 ?
                                    <div style={{ marginLeft: '70px' }}>
                                        <Header>Course Content</Header>
                                        <Accordion styled style={{ width: '800px' }}>
                                            {this.props.chapter.chapters.map((chapter, i) => {
                                                return (
                                                    <div key={i}>
                                                        <Accordion.Title active={this.state.activeIndex === i} onClick={(e, { index }) => this.setState(oldState => ({ activeIndex: oldState.activeIndex === index ? -1 : index }))} index={i}>
                                                            <div style={{ display: 'flex' }}>
                                                                <div style={{ width: '50%' }}>
                                                                    <Header size='medium'>{chapter.chapter_title}</Header>
                                                                </div>
                                                            </div>
                                                        </Accordion.Title>
                                                        {chapter.ChapterFiles.length > 0 ? <Accordion.Content active={this.state.activeIndex === i}>
                                                            <Table>
                                                                <Table.Body>
                                                                    {chapter.ChapterFiles.map((file, i) => {
                                                                        return <Table.Row key={i}>
                                                                            <Table.Cell textAlign='left'>
                                                                                <Header color='grey' size='tiny'>
                                                                                    {file.file_type.match('video') ? <Icon name='video play' /> : <Icon name='file' />}
                                                                                    {file.file_name}
                                                                                </Header>
                                                                            </Table.Cell>
                                                                        </Table.Row>
                                                                    })}
                                                                </Table.Body>
                                                            </Table>
                                                        </Accordion.Content> : null}
                                                    </div>
                                                )
                                            })}
                                        </Accordion>
                                    </div> : null}
                        </div>
                    </div >)
                }
            </div >
        )
    }
}


const mapState = (state) => {
    let { course, chapter, cart, wishlist } = state;
    return {
        course, chapter, cart, wishlist
    }
}

const mapDispatch = (dispatch) => {
    return {
        getCourseById: bindActionCreators(courseActions.getCourseById, dispatch),
        subscribeCourse: bindActionCreators(courseActions.subscribeCourse, dispatch),
        getSubscribeCourses: bindActionCreators(courseActions.getSubscribeCourses, dispatch),
        deleteCourse: bindActionCreators(courseActions.deleteCourseAction, dispatch),
        rateCourse: bindActionCreators(courseActions.rateCourseAction, dispatch),
        getChapters: bindActionCreators(chapterActions.getChaptersAction, dispatch),
        getCart: bindActionCreators(cartActions.getCartAction, dispatch),
        addToCart: bindActionCreators(cartActions.addToCartAction, dispatch),
        addToWishlist: bindActionCreators(wishlistActions.addWishlistAction, dispatch),
        getWishlist: bindActionCreators(wishlistActions.getWishlistAction, dispatch),
        removeFromWishlist: bindActionCreators(wishlistActions.removeWishlistAction, dispatch)
    }
}

export default withRouter(connect(mapState, mapDispatch)(Course))