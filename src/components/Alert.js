import React from 'react';
import '../styles/Footer.css'

function Alert({ alerts }) {
    return (
        <div className='position-absolute start-0 w-100'>

            {alerts.map((item) => {
                return (
                    <div key={item.id} className={`alert mx-2 alert-${item.type} text-center`} style={{zIndex: 9999}} role="alert">
                        {item.message}
                    </div>
                );
            })}

        </div>

    );
}

export default Alert;