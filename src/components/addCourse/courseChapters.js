import React, { Component } from 'react';
import FileUploader from 'react-files';
import { Form, Input, Button, Table, Icon, Accordion, Header } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import * as chapterActions from '../../actions/chapter.actions';


class CourseChapters extends Component {
    state = {
        chapterTitle: '',
        chapterFiles: [],
        activeIndex: -1,
        key: 0
    }
    componentWillMount() {
        this.props.getChapters(Number(this.props.match.params.id))

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
        this.setState(oldState => ({
            chapterTitle: '',
            chapterFiles: [],
            key: oldState.key + 1
        }))
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        this.props.addChapter(data, config)
    }
    deleteChapter = (id) => {
        this.props.deleteChapter(id)
    }
    deleteFile = (file, id) => {
        this.props.deleteFile(file, id)
    }
    removeFile = (id) => {
        let { chapterFiles } = this.state;
        let i = chapterFiles.findIndex(file => file.id === id)
        chapterFiles.splice(i, 1);
        this.setState({ chapterFiles });
    }
    render() {
        return (
            <div style={{ margin: 'auto', width: '50%', marginTop: "15px" }}>
                <div style={{ boxShadow: '2px 3px 2px 2px lightgrey', padding: '15px', marginBottom: '15px' }}>
                    <Form>
                        <Form.Field>
                            <Input type='text' placeholder='Chapter title' value={this.state.chapterTitle} onChange={(e) => this.setState({ chapterTitle: e.target.value })} />
                        </Form.Field>
                        <Form.Field style={{ textAlign: 'center' }}>
                            <FileUploader key={this.state.key} clickable multiple onChange={this.onFilesChange}>
                                <Button style={{ borderRadius: '0px' }} color='linkedin' content='Click to upload files' />
                            </FileUploader>
                            {this.state.chapterFiles.length > 0 ? <Table celled size='small' >
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
                            </Table> : null}
                        </Form.Field>
                        <Form.Field>
                            <Button type='button' circular icon='plus' color='linkedin' onClick={this.addChapter} />
                            <Button type='button' style={{ borderRadius: '0px' }} content='Done' color='green' onClick={() => this.props.history.push('/mycourses')} />
                        </Form.Field>
                    </Form>
                </div>
                {this.props.chapter.chapters.length > 0 ? <Accordion styled style={{ width: '800px' }}>
                    {this.props.chapter.chapters.map((chapter, i) => {
                        return (
                            <div key={i}>
                                <Accordion.Title active={this.state.activeIndex === i} onClick={(e, { index }) => this.setState(oldState => ({ activeIndex: oldState.activeIndex === index ? -1 : index }))} index={i}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ width: '50%' }}>
                                            <Header size='medium'>{chapter.chapter_title}</Header>
                                        </div>
                                        <Button style={{ marginLeft: '400px' }} icon='remove' color='red' size='mini' onClick={() => this.deleteChapter(chapter.id)} />
                                    </div>
                                    <hr />
                                </Accordion.Title>
                                {JSON.parse(chapter.chapter_files).length > 0 ? <Accordion.Content active={this.state.activeIndex === i}>
                                    <Table>
                                        <Table.Body>
                                            {JSON.parse(chapter.chapter_files).map((file, i) => {
                                                return <Table.Row key={i}>
                                                    <Table.Cell textAlign='left'>{file}</Table.Cell>
                                                    <Table.Cell textAlign='right'>
                                                        <Button size='mini' icon='remove' color='red' onClick={() => this.deleteFile(file, chapter.id)} />
                                                    </Table.Cell>
                                                </Table.Row>
                                            })}
                                        </Table.Body>
                                    </Table>
                                </Accordion.Content> : null}
                            </div>
                        )
                    })}
                </Accordion> : null}
            </div>
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
        addChapter: bindActionCreators(chapterActions.addChapterAction, dispatch),
        getChapters: bindActionCreators(chapterActions.getChaptersAction, dispatch),
        deleteChapter: bindActionCreators(chapterActions.deleteChapterAction, dispatch),
        deleteFile: bindActionCreators(chapterActions.deleteFileAction, dispatch)
    }
}

export default withRouter(connect(mapState, mapDispatch)(CourseChapters))


