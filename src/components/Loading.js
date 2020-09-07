import React from 'react';

function Loading({ color }) {

    const style = { backgroundColor: color ? color : "rgb(159, 105, 221)" };

    return (
        <div className="loading">
            <div className="rythmer">
                <div className="circle" style={style} ></div>
                <div className="circle" style={style}></div>
                <div className="circle" style={style}></div>
            </div>
        </div>
    )
}

export default Loading;