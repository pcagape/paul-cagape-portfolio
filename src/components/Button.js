import React from 'react';

function Button(props) {

    if(props.href) return (
        <a className={"btn btn-lg btn-primary" + props.className} href={props.href || ''} target='_blank' rel="noopener noreferrer">
            {props.children}
        </a>
    ); else return (
        <button className={"btn btn-lg btn-primary" + props.className} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default Button;