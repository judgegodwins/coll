import React from 'react'
import CallBox from './CallBox';

function CallBoxCover({ people, username }) {

    const otherPeople = people.filter(person => person.username !== username)

    console.log('username: ', username, 'otherpeople: ', otherPeople)
    return (
        <div className="call-box-cover">
            {
                otherPeople.length > 0
                    ? otherPeople.map(person => (
                        <CallBox key={person.id} person={person} />
                    ))
                    : <div className="centered">
                        <p style={{textAlign: 'center', color: 'rgba(0,0,0, .68)'}}>
                          Other users are not online, when they are online you'll find them here or you can search for them.<br/>
                          You can try joining on another device to test the video call functionality using this device and the second device.
                        </p>
                    </div>
            }
        </div>
    )
}

export default CallBoxCover