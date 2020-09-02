
import React, { Component } from 'react'

class CallScreen extends Component {

    constructor() {
        super();

        this.state = {
            stream: null
        }

        this.localVideo = React.createRef();
        this.remoteVideo = React.createRef();
    }

    componentDidMount() {
        const streamConstraints = {
            audio: true,
            video: true
        }

        navigator.mediaDevices.getUserMedia(streamConstraints)
            .then(stream => {
                this.localVideo.current.srcObject = stream;
                this.remoteVideo.current.srcObject = stream;   
            })
            .catch(error => console.warn(error));
    }

    render() {
        console.log(this.localVideo.current);
        return (
            <div className="call-screen">
                <div className="local-video-cover">
                    <video id="local-video" autoPlay muted ref={this.localVideo}></video>
                </div>
                <video id="remote-video" autoPlay ref={this.remoteVideo}></video>
            </div>
        )
    }
}

export default CallScreen