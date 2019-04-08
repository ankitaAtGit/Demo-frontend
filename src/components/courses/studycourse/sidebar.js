import React, { Component } from 'react'
import { Sidebar, Menu, Icon } from 'semantic-ui-react';

class CustomSidebar extends Component {
    state = {
        visible: false
    }
    toggleSidebar = () => {

    }
    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={this.toggleSidebar}
                        vertical
                        visible={this.state.visible}
                        width='thin'
                    >
                        <Menu.Item as='a'>
                            <Icon name='home' />
                            Home
                            </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='gamepad' />
                            Games
                          </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='camera' />
                            Channels
                         </Menu.Item>
                    </Sidebar>

                    <Segment basic>
                        <Header as='h3'>Application Content</Header>
                    </Segment>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default CustomSidebar