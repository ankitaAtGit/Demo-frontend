import React, { Component } from 'react';
import FileUploader from 'react-files';
import { Form, Input, Button, Table, Icon, Accordion, Header } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import * as chapterActions from '../../actions/chapter.actions';
// import { filePath } from '../../constants/path';

class CourseChapters extends Component {
    state = {
        chapterTitle: '',
        chapterFiles: [],
        activeIndex: -1,
    }
    componentWillMount() {
        // console.log(this.props.match.params.id, this.props.location.pathname)
        // if(this.props.location.pathname.match())
    }
    onFilesChange = (files) => {
        this.setState({ chapterFiles: files })
    }
    addChapter = () => {
        let data = new FormData();
        data.append('chapter_title', this.state.chapterTitle);
        if (this.state.chapterFiles.length > 0) {
            this.state.chapterFiles.forEach(file => {
                data.append('chapter_files', file);
            })
        }
        data.append('CourseId', Number(this.props.match.params.id))
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        this.props.addChapter(data, config)
    }
    removeFile = (id) => {
        let { chapterFiles } = this.state;
        let i = chapterFiles.findIndex(file => file.id === id)
        chapterFiles.splice(i, 1);
        this.setState({ chapterFiles });
    }
    render() {
        return (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                {/* <Button style={{ marginBottom: '12px' }} circular icon='plus' color='linkedin' onClick={this.addChapter} />
                <Button style={{ marginBottom: '12px' }} circular icon='minus' color='linkedin' onClick={this.removeChapter} /> */}
                <div style={{ margin: 'auto', width: '50%' }}>
                    <div style={{ boxShadow: '2px 3px 2px 2px lightgrey', padding: '15px', marginBottom: '15px' }}>
                        <Form>
                            <Form.Field>
                                <Input type='text' placeholder='Chapter title' value={this.state.chapterTitle} onChange={(e) => this.setState({ chapterTitle: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <FileUploader clickable multiple onChange={this.onFilesChange}>
                                    <Button style={{ borderRadius: '0px' }} color='linkedin' content='Click to upload files' />
                                </FileUploader>
                                <Table celled size='small' >
                                    <Table.Body>
                                        {this.state.chapterFiles.map((file, i) => {
                                            return <Table.Row textAlign='center' key={i}>
                                                <Table.Cell>
                                                    {file.type.match('video') ? <Icon size='big' name='video' /> : <Icon size='big' name='file' />}
                                                </Table.Cell>
                                                <Table.Cell>{file.name}</Table.Cell>
                                                <Table.Cell>
                                                    <Button size='mini' onClick={() => this.removeFile(file.id)} icon='remove' color='red' />
                                                </Table.Cell>
                                            </Table.Row>
                                        })}
                                    </Table.Body>
                                </Table>
                            </Form.Field>
                            <Button circular icon='plus' color='linkedin' onClick={this.addChapter} />
                        </Form>
                    </div>
                    {this.props.chapter.chapters.length > 0 ? <Accordion styled style={{ width: '850px' }}>
                        {this.props.chapter.chapters.map((chapter, i) => {
                            return (
                                <div key={i}>
                                    <Accordion.Title active={this.state.activeIndex === i} onClick={(e, { index }) => this.setState(oldState => ({ activeIndex: oldState.activeIndex === index ? -1 : index }))} index={i}>
                                        <Header size='medium'>{chapter.chapter_title}</Header>
                                    </Accordion.Title>
                                    <Accordion.Content active={this.state.activeIndex === i}>hvfdjgt</Accordion.Content>
                                </div>
                            )
                        })}

                    </Accordion> : null}
                </div>
            </div >
        )
    }
}

const mapState = (state) => {
    return {
        chapter: state.chapter
    }
}
const mapDispatch = (dispatch) => {
    return {
        // createCourse: bindActionCreators(courseActions.createCourseAction, dispatch),
        // getCourseById: bindActionCreators(courseActions.getCourseById, dispatch),
        // editCourse: bindActionCreators(courseActions.editCourseAction, dispatch)
        addChapter: bindActionCreators(chapterActions.addChapterAction, dispatch)
    }
}

export default withRouter(connect(mapState, mapDispatch)(CourseChapters))


