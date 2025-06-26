import React, { useState } from "react";
import './Input.css';

const Input = (props) => {

    const [required, setRequired] = useState("");

    const handleOnBlur = () => {
        props.required ? setRequired(true) : setRequired(false);
    }

    return (
        <div className='input-container'>
            <input
                id={props.id}
                className={'input'}
                type={props.type}
                placeholder={props.placeholder}
                style={{...props.style, fontSize: '0.97rem'}}
                value={props.value}
                onChange={props.onChange}
                maxLength={props.maxLength || 120}
                readOnly={props.readOnly}
                disabled={props.disabled}
                list={props.list}
                onKeyUp={props.onKeyUp}
                onBlur={handleOnBlur}
                required={required}
            />
        </div>
    );
}

export default Input;