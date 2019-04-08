import React, { Component } from 'react';
import ChapterCard from './chapterCard'
class StudyCourse extends Component {
    showLectures = (chapter) => {
        console.log(chapter)
    }
    render() {
        return (
            <ChapterCard chapters={this.props.chapters} showLectures={this.showLectures} />
        )
    }
}

export default StudyCourse