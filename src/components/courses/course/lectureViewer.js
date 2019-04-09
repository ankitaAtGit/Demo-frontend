import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react'
import { filePath } from '../../../constants/path';

class LectureViewer extends Component {
    render() {
        let { lecture } = this.props
        return (
            <Modal trigger={this.props.trigger} open={this.props.open} onClose={this.props.toggle} dimmer='inverted' size='fullscreen'>
                {lecture && lecture.file_type.match('video') ?
                    < video key={lecture.id} controls>
                        <source src={filePath + lecture.file_name} type={lecture.file_type} />
                        Your browser does not support the video tag
                </video> : null}
            </Modal>
        )
    }
}

export default LectureViewer