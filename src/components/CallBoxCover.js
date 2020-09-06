import React from 'react'
import CallBox from './CallBox';

function CallBoxCover({ people, username }) {

    const otherPeople = people.filter(person => person.username !== username)

    return (
        <div className="call-box-cover">
            {
                otherPeople
                    ? otherPeople.map(person => (
                        <CallBox key={person.id} person={person} />
                    ))
                    : <div className="centered">
                        <p>People are not online</p>
                    </div>
            }
        </div>
    )
}

export default CallBoxCover