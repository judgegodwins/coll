import React, { Component, Fragment } from 'react';
import { Route } from 'react';
import io from 'socket.io-client'

import PrivateRoute from './components/PrivateRoute';
import Home from './screens/Home';
import CallScreen from './screens/CallScreen';
import IncomingCall from './screens/IncomingCall';

var socket;

class AppContainer extends Component {

    constructor(props) {
        super(props);

        this.socket = ''

        this.state = {
            socketConnected: false,
            people: [],
            onCall: false,
            answered: false
        }

        this.setCall = this.setCall.bind(this);
        this.setAnswered = this.setAnswered.bind(this);
    }

    async componentDidMount() {
        this.socket = await io.connect('/');

        socket = this.socket

        this.setState({
            socketConnected: true
        })

        socket.emit('setusername', { username: this.props.username });

        socket.on('people', ({ people }) => {
            console.log('socket received: ', people);
            this.setState({
                people: people
            });
        });

        socket.on('new_call', data => {
            console.log(data);
            console.log('children: ', this.props.children);
            this.props.history.push(`/incoming-call/${data.room}/${data.from}`)
        })

        socket.on('full', () => {
            console.log("line busy");
        })
    }

    setCall(truth) {
        this.setState({
            onCall: truth,
        });
    }

    setAnswered(truth) {
        this.setState({
            answered: truth
        })
    }

    render() {
        console.log(this.state)
        const { username } = this.props;
        const { people, answered, socketConnected } = this.state;
        const bg = { backgroundColor: "#0f0" }

        return (
            <Fragment>
                {
                    socketConnected
                        ? <Fragment>
                            <PrivateRoute path="/" exact component={Home} username={username} people={people} />
                            <PrivateRoute 
                                path="/call/:room" 
                                exact 
                                component={CallScreen} 
                                username={username} 
                                answered={answered} 
                                setAnswered={this.setAnswered} 
                                setCallState={this.setCall}
                                people={people}
                            />
                            <PrivateRoute path="/incoming-call/:room/:username" exact people={people} component={IncomingCall} username={username} setCallState={this.setCall} />
                        </Fragment>
                        : <div className="centered full">
                            <div className="loading">
                                <div className="rythmer">
                                    <div className="circle" style={bg}></div>
                                    <div className="circle" style={bg}></div>
                                    <div className="circle" style={bg}></div>
                                </div>
                            </div>
                        </div>
                }
            </Fragment>
        )
    }
}

export default AppContainer;
export { socket }