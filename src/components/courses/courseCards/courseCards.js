import React from 'react';
import { Card, Rating, Header } from 'semantic-ui-react';

const CourseCards = (props) => {
    return (
        <Card.Group itemsPerRow={4}>
            {props.courses.map(course => (
                <Card style={{ borderRadius: '0px', boxShadow: '1px 2px 1px 1px lightgrey' }} onClick={() => props.selectCourse(course)} raised key={course.id}>
                    <Card.Header><Header style={{ margin: '5px' }} textAlign='center' color='orange' size='medium'>{course.course_name}</Header></Card.Header>
                    <Card.Content><Header size='small' color='black'>{course.course_description}</Header></Card.Content>
                    <Card.Content><Rating disabled maxRating={5} rating={course.course_rating} icon='star' /> {course.course_rating}/5</Card.Content>
                </Card>
            ))}
        </Card.Group>
    )
}
export default CourseCards;