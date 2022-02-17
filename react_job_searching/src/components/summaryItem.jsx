import React from "react";

const SummaryItem = (props) => {
    return (
        <div className='summary'>
            <div className='summary_content'>

            <strong> summary </strong>
            <div> 
                description of this summary 
            </div>

            </div>
            <div className='delete_summary'>
                <button> delete </button>
            </div>
        </div>
    );
};

export default SummaryItem;