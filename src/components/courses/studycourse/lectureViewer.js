import React from 'react';
import filePath from '../../../constants/path';
const LectureViewer = (props) => {
    let { file } = props
    return (
        <div>
            {file.file_type.match('video') ?
                < video key={file.id} controls onEnded={() => { console.log('video end') }}>
                    <source src={filePath + file.file_name} type={file.file_type} />
                    Your browser does not support the video tag
                      </video> : null
            }
        </div>
    )
}

export default LectureViewer