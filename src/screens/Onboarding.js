import React, { useState } from 'react';

function OnBoarding({ history, setUsername }) {

    const [username, setUsernameForm] = useState('');

    const handleChange = (e) => {
        
        setUsernameForm(e.target.value);
    }

    return (
        <div className="onboarding">
            <form>
                <input placeholder="Username" value={username} className="input" type="text" onChange={handleChange} />
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        setUsername(username);
                        history.push('/');
                    }}
                >Connect</button>
            </form>
        </div>
    )
}

export default OnBoarding;