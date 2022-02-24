import React, { useRef } from 'react';

export const Modalv2 = ({
    name,
    children,
    className
}) => {
    const thisModal = useRef(null);

    function openModal() {
        if(thisModal.current.className === 'modal shown') return;

        // force close open modal
        if(document.getElementsByClassName('modal shown').length > 0)
            document.getElementsByClassName('modal shown')[0].className = 'modal';
        
        setTimeout(()=>{
            thisModal.current.className = 'modal shown'
        }, 1);
        
    }

    function closeModal() {
        setTimeout(()=>{
            thisModal.current.className = 'modal'
        }, 1);
    }

    return (
        <div ref={thisModal} className={"modal " + className} onClick={openModal}>
            <div className='modal-header'>
                <label>{name}</label>
                <button className='modal-close-btn' onClick={closeModal}><i className='fas fa-times'/></button>
            </div>
            <div className='modal-body'>
                {children}
            </div>
        </div>
    );
};
