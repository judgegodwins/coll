
import React, { Component } from 'react';

import { socket } from '../AppContainer';
import query from '../util/query';


const configuration = {
    iceServers: [
        { urls: 'stun:stun.services.mozilla.com' },
        { urls: "stun:stun.services.mozilla.com:3478" },
        { urls: 'stun:stun.l.google.com:19302' }
    ]
}


class CallScreen extends Component {

    constructor() {
        super();

        this.state = {
            status: ''
        }

        this.localVideo = React.createRef();
        this.remoteVideo = React.createRef();
        this.localStream = null;
        this.room = null
        this.rtcPeerConnection = null;

        this.onIceCandidate = this.onIceCandidate.bind(this);
        this.onAddStream = this.onAddStream.bind(this);
        this.endCall = this.endCall.bind(this);
    }

    componentDidMount() {
        console.log(this.props)

        const { location, match, setCallState, setAnswered } = this.props;

        const streamConstraints = {
            audio: true,
            video: true
        }

        navigator.mediaDevices.getUserMedia(streamConstraints)
            .then(stream => {
                this.localVideo.current.srcObject = stream;
                this.localStream = stream;
                this.rtcPeerConnection = new RTCPeerConnection(configuration)
                this.rtcPeerConnection.onicecandidate = this.onIceCandidate;
                this.rtcPeerConnection.ontrack = this.onAddStream;
                this.rtcPeerConnection.addTrack(this.localStream.getTracks()[0], this.localStream);
                this.rtcPeerConnection.addTrack(this.localStream.getTracks()[1], this.localStream);
                setCallState(true);


                if (!location.search.includes('answer')) {

                    socket.emit('get_room', (room) => {
                        console.log('room: ', room);
                        this.room = room;

                        socket.emit('new_call', {
                            to: match.params.room,
                            room: this.room
                        })
                    });

                    socket.on('ready', ({ room }) => {
                        console.log('ready yea ', room)
                        if (this.room === room) {
                            console.log('yep inside')
                            this.rtcPeerConnection.createOffer()
                                .then(async sessionDescription => {
                                    await this.rtcPeerConnection.setLocalDescription(sessionDescription);

                                    console.log('emitting offer to: ', room)
                                    socket.emit('offer', {
                                        room: this.room,
                                        sdp: sessionDescription
                                    });

                                })
                        }
                    })

                    socket.on('answer', ({ room, sdp }) => {
                        console.log('answer received: ', sdp)
                        this.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
                    })

                } else {
                    console.log('I\'m answering yay!')
                    this.room = match.params.room;

                    socket.emit('ready', { room: this.room });


                    socket.on('offer', ({ sdp, room }) => {
                        console.log('offer ', sdp);
                        console.log(this.room, ' >>>> ', room)
                        if (this.room === room) {
                            console.log('this is it');
                            this.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(sdp));

                            this.rtcPeerConnection.createAnswer()
                                .then(async sessionDescription => {
                                    console.log('created answer: ', sessionDescription);
                                    await this.rtcPeerConnection.setLocalDescription(sessionDescription);

                                    socket.emit('answer', {
                                        room: room,
                                        sdp: sessionDescription
                                    })
                                })
                        }

                    })

                }
            })
            .catch(error => console.warn(error));

        socket.on('candidate', (data) => {
            console.log('data: ', data)
            const candidate = new RTCIceCandidate({
                sdpMLineIndex: data.label,
                candidate: data.candidate
            })

            this.rtcPeerConnection.addIceCandidate(candidate);
        })

        socket.on('end_call', (data) => {
            if (this.rtcPeerConnection && this.room === data.room) {
                console.log('ending call');
                this.endCall();
            }
        })

        socket.on('decline_call', ({ id }) => {
            if (match.params.room === id) {
                this.setState({
                    status: 'Call Declined'
                })

                this.props.setAnswered(true)

                setTimeout(() => {
                    this.endCall();
                }, 2000);
            }
        })

    }

    endCall(callback) {
        const { location, setCallState, setAnswered } = this.props;

        setCallState(false);
        setAnswered(false)

        if (this.rtcPeerConnection)
            this.rtcPeerConnection.close();

        if (location.search.includes('answer'))
            this.props.history.go(-2);
        else
            this.props.history.go(-1);

        if (callback) callback();

    }

    onIceCandidate(e) {
        console.log('event: ', e);
        console.log(this.room)
        if (e.candidate) {
            socket.emit('candidate', {
                label: e.candidate.sdpMLineIndex,
                id: e.candidate.sdpMid,
                candidate: e.candidate.candidate,
                room: this.room
            })
        }
    }

    onAddStream(e) {
        console.log('stream: ', e.streams);
        this.props.setAnswered(true);
        this.remoteVideo.current.srcObject = e.streams[0];
    }

    render() {
        const { people, match } = this.props;
        const { search } = this.props.location;
        const username = query('username', search);

        return (
            <div className="call-screen">
                <div className="about">
                    <h1>{username}</h1>
                </div>
                {this.state.status &&
                    <div className="status">
                        <p>{this.state.status}</p>
                    </div>
                }
                <div className="local-video-cover">
                    <video id="local-video" autoPlay muted ref={this.localVideo}></video>
                </div>
                {
                    this.props.answered
                        ? <video id="remote-video" autoPlay ref={this.remoteVideo}></video>
                        : <div className="loading">
                            <div className="rythmer">
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </div>
                        </div>

                }
                <div
                    className="call-action end-call"
                    onClick={() => this.endCall(
                        () => socket.emit('end_call', { room: this.room })
                    )}
                >
                    <i className="fas fa-phone"></i>
                </div>
            </div>
        )
    }
}

export default CallScreen