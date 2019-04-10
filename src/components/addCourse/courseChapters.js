import React, { Component } from 'react';
import FileUploader from 'react-files';
import { Form, Input, Button, Table, Icon, Accordion, Header, Confirm, Label } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import * as chapterActions from '../../actions/chapter.actions';
import { filePath } from '../../constants/path';

class CourseChapters extends Component {
    state = {
        chapterTitle: '',
        chapterFiles: [],
        activeIndex: -1,
        key: 0,
        editing: false,
        chapterId: 0,
        currentFiles: [],
        deleteFileId: [],
        showConfirm: false,
        submitted: false
    }
    componentWillMount() {
        this.props.getChapters(Number(this.props.match.params.id))
    }
    toggleConfirm = () => {
        this.setState(oldState => ({ showConfirm: !oldState.showConfirm }))
    }
    onFilesChange = (files) => {
        this.setState({ chapterFiles: files })
    }
    addChapter = () => {
        this.setState({ submitted: true });
        if (this.state.chapterTitle !== '') {
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
                key: oldState.key + 1,
                submitted: false
            }))
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            this.props.addChapter(data, config)
        }
    }
    editChapter = (chapter) => {
        this.setState({ chapterTitle: chapter.chapter_title, currentFiles: [...chapter.ChapterFiles], editing: true, chapterId: chapter.id })
    }
    deleteChapter = (id) => {
        this.props.deleteChapter(id)
        this.toggleConfirm()
    }
    updateChapter = () => {
        this.setState({ submitted: true });
        let { deleteFileId, chapterId, chapterFiles, chapterTitle } = this.state;
        if (chapterTitle !== '') {
            if (deleteFileId.length > 0) {
                deleteFileId.forEach(id => {
                    this.props.deleteFile(id, chapterId)
                })
            }

            let data = new FormData();
            data.append('chapter_title', chapterTitle);
            if (chapterFiles.length > 0) {
                this.state.chapterFiles.forEach(file => {
                    data.append('chapter_files', file);
                })
            }
            data.append('CourseId', Number(this.props.match.params.id))
            this.setState(oldState => ({
                chapterTitle: '',
                chapterFiles: [],
                key: oldState.key + 1,
                currentFiles: [],
                deleteFileId: [],
                editing: false,
                submitted: false
            }))
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            this.props.editChapter(chapterId, { chapterTitle }, data, config)
        }
    }
    deleteFile = (id) => {
        this.setState(oldState => ({ deleteFileId: [...oldState.deleteFileId, id] }))
        let { currentFiles } = this.state;
        let i = currentFiles.findIndex(file => file.id === id)
        currentFiles.splice(i, 1);
        this.setState({ currentFiles });
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
                            <Input type='text' placeholder='Chapter title*' value={this.state.chapterTitle} onChange={(e) => this.setState({ chapterTitle: e.target.value, submitted: false })} />
                            {this.state.submitted && this.state.chapterTitle === '' ? <Label basic color='red' pointing>This field cannot be empty</Label> : null}
                        </Form.Field>
                        <Form.Field style={{ textAlign: 'center' }}>
                            <FileUploader key={this.state.key} clickable multiple onChange={this.onFilesChange} accepts={['video/mp4', 'video/ogg', '.pdf']}>
                                <Button style={{ borderRadius: '0px' }} color='linkedin' content='Click to upload files' />
                            </FileUploader>
                            {this.state.chapterFiles.length > 0 || this.state.currentFiles.length > 0 ? <Table celled size='small' >
                                <Table.Body>
                                    {this.state.chapterFiles.map((file, i) => {
                                        return <Table.Row textAlign='center' key={i}>
                                            <Table.Cell>
                                                {file.type.match('video') ? <Icon size='big' name='video play' /> : <Icon size='big' name='file' />}
                                            </Table.Cell>
                                            <Table.Cell>{file.name}</Table.Cell>
                                            <Table.Cell>
                                                <Button size='mini' onClick={() => this.removeFile(file.id)} icon='remove' color='red' />
                                            </Table.Cell>
                                        </Table.Row>
                                    })}
                                    {this.state.editing ?
                                        this.state.currentFiles.map((file, i) => {
                                            return <Table.Row textAlign='center' key={i}>
                                                <Table.Cell>
                                                    {file.file_type.match('video') ? <Icon size='big' name='video play' /> : <Icon size='big' name='file' />}
                                                </Table.Cell>
                                                <Table.Cell>{file.file_name}</Table.Cell>
                                                <Table.Cell>
                                                    <Button size='mini' onClick={() => this.deleteFile(file.id)} icon='remove' color='red' />
                                                </Table.Cell>
                                            </Table.Row>
                                        })
                                        : null}
                                </Table.Body>
                            </Table> : null}

                        </Form.Field>
                        <Form.Field>
                            {this.state.editing ? <Button type='button' style={{ borderRadius: '0px' }} content='Save Changes' color='linkedin' onClick={this.updateChapter} />
                                : <Button type='button' style={{ borderRadius: '0px' }} content='Add Chapter' color='linkedin' onClick={this.addChapter} />}
                            <Button type='button' style={{ borderRadius: '0px' }} content='Done' basic color='linkedin' onClick={() => this.props.history.push(`/course/details/${Number(this.props.match.params.id)}`)} />
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
                                        <Button style={{ marginLeft: '400px' }} icon='pencil' color='linkedin' size='mini' onClick={() => this.editChapter(chapter)} />
                                        <Button icon='remove' basic color='linkedin' size='mini' onClick={this.toggleConfirm} />
                                        <Confirm
                                            open={this.state.showConfirm}
                                            size='mini'
                                            content={'This will delete all the files in this chapter '}
                                            header={
                                                < Header size='small'>
                                                    <Icon name='warning sign' color='yellow' />Are you sure you want to delete this chapter?
                                            </Header>
                                            }
                                            confirmButton='Yes'
                                            cancelButton='Cancel'
                                            onCancel={this.toggleConfirm}
                                            onConfirm={() => this.deleteChapter(chapter.id)}
                                        >
                                        </Confirm>
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
        deleteFile: bindActionCreators(chapterActions.deleteFileAction, dispatch),
        editChapter: bindActionCreators(chapterActions.editChapterAction, dispatch)
    }
}

export default withRouter(connect(mapState, mapDispatch)(CourseChapters))

