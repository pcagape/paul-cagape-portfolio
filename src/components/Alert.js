import React from 'react';
import '../assets/styles/Footer.css';

function Alert({ list }) {
    return (
        <div className='alerts-list position-absolute start-0 w-100'>

            {list.map((item) => {
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