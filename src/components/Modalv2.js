import React, {} from 'react';

export const Modalv2 = ({
    show = true,
    setShow = ()=>{},
    headerName = '',
    children
}) => {
    return (
        <div className={"modal" + (show ? ' shown' : '')}>
            <div className='modal-header'>
                <label>{headerName}</label>
                <button className='modal-close-btn' onClick={setShow(false)}><i className='fas fa-times'/></button>
            </div>
            <div className='modal-body'>
                {children}
            </div>
        </div>
    );
};
