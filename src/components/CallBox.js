import React from 'react';
import { withRouter } from 'react-router-dom';

import profileImage from '../assets/images/profile.png';

function CallBox({ history, person }) {

    return (
        <div className="call-box tab">
            <div className="profile-img">
                <img src={profileImage} alt="profile" />
            </div>
            <div className="detail">
                <p>{person.username}</p>
            </div>
            <div className="icons">
                <div className="icon" onClick={() => history.push(`/call/${person.id}?username=${person.username}`)}>
                    <i className="fas fa-phone"></i>
                </div>
            </div>
        </div>
    )
}

export default withRouter(CallBox);