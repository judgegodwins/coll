import React, { Component } from 'react';

import TopBar from '../components/TopBar';
import CallBoxCover from '../components/CallBoxCover'

class Home extends Component {

    render() {
        const {people, username} = this.props
        return (
            <div className="home">
                <TopBar username={this.props.username} />
                <CallBoxCover people={people} username={username} />
            </div>
        )
    }
}

export default Home;