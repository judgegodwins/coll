import React from 'react';

import profileImage from '../assets/images/profile.png';
import { withRouter } from 'react-router-dom';

function TopBar({ username, history }) {

    return (
        <div className="topbar tab">
            <div className="profile-img">
                <img src={profileImage} alt="profile" />
            </div>
            <div className="detail">
                <h3>{username}</h3>
            </div>
            <div className="icons">
                <div 
                    className="icon"
                    onClick={() => {
                        history.push('/search')
                    }}
                >
                    <i className="fas fa-search"></i>
                </div>
            </div>
        </div>
    )
}

export default withRouter(TopBar);