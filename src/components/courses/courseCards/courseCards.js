import React from 'react';
import { Card, Rating, Header, Image } from 'semantic-ui-react';
import { imgPath } from '../../../constants/path';

const CourseCards = (props) => {
    return (
        <div style={{ width: '90%', margin: 'auto' }}>
            <Card.Group itemsPerRow={5}>
                {props.courses.map(course => (
                    <Card style={{ borderRadius: '0px', boxShadow: '1px 2px 1px 1px lightgrey', width: '250px', height: '270px' }} onClick={() => props.selectCourse(course)} raised key={course.id}>
                        <Image src={imgPath + course.picture} />
                        <Card.Header><Header style={{ margin: '5px' }} textAlign='center' size='medium'>{course.course_name}</Header></Card.Header>
                        <Card.Content><Header size='small' color='black'>{course.course_description}</Header></Card.Content>
                        <Card.Content><Rating disabled maxRating={5} rating={course.course_rating} icon='star' /> {course.course_rating}/5</Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </div>
    )
}
export default CourseCards;