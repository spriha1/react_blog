import React from 'react';

const TextArea = ({ name, label, value, error, onChange }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <textarea 
                onChange={onChange}
                value={value}
                id={name} 
                name={name}
                className="form-control"
            >
            </textarea>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
     );
}
 
export default TextArea;