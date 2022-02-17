import React from 'react';


const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className='btn'>
            {children}
        </button>
    );
};

export default MyButton;