import React, { Component } from 'react';
import { Segment, Sidebar } from 'semantic-ui-react'
import LectureViewer from './lectureViewer';
import CustomSidebar from './sidebar';

class Lecture extends Component {
    handleLectureComplete = (chapterId, fileId) => {
        console.log(chapterId, " :::: ", fileId)
    }
    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <CustomSidebar />
                    <Segment basic>
                        <LectureViewer />
                    </Segment>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default Lecture;