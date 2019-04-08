import React from 'react';
import { Card, Header } from 'semantic-ui-react';


const ChapterCards = (props) => {
    return (
        <div style={{ margin: 'auto' }}>
            <Card.Group itemsPerRow={4}>
                {props.chapters.map(chapter => (
                    <Card style={{ borderRadius: '0px', width: '250px' }} key={chapter.id} onClick={() => props.showLectures(chapter)}>
                        <Card.Header><Header style={{ margin: '5px' }} textAlign='center' size='medium'>{chapter.chapter_title}</Header></Card.Header>
                        <Card.Content>Num of videos</Card.Content>
                        <Card.Content>Num of files</Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </div>
    )
}
export default ChapterCards;