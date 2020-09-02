import React from 'react';
import profileImage from '../assets/images/profile.webp';


function TopBar() {

    return (
        <div className="topbar">
            <div className="profile-img">
                <img src={profileImage} alt="profile"/>
            </div>
            <div className="detail">
                <h3>Judge</h3>
            </div>
            <div className="icons">
                <div className="icon">
                    <i className="fas fa-search"></i>
                </div>
            </div>
        </div>
    )
}

export default TopBar;