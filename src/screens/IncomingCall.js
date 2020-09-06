import React from 'react';
import { socket } from '../AppContainer';


function IncomingCall(props) {

    const { history, people } = props;
    const { username, room } = props.match.params;

    console.log(props)
    return (
        <div className="incoming-call full">

            <h2 style={{textAlign: 'center'}}>{username}</h2>

            <div className="call-actions flex">
                <div className="call-action start-call"
                    onClick={() => {
                        props.history.push(`/call/${room}?answer=true&username=${username}`);
                    }}
                >
                    <i className="fas fa-phone"></i>
                </div>
                <div 
                    className="call-action end-call"
                    onClick={() => {
                        let socketId = people.find(
                            person => person.username === username
                        ).id;

                        socket.emit('decline_call', { to: socketId }, (truth) => {
                            history.go(-1);
                        });
                    }}
                >
                    <i className="fas fa-phone"></i>
                </div>
            </div>

        </div>
    )
}

export default IncomingCall;