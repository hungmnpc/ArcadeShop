import classNames from "classnames/bind";
import { useState } from "react";
import ReactQuill from "react-quill";
import style from "./FieldControl.module.scss";

const cx = classNames.bind(style);

function FieldControl({ label, type = "text", required, name, placeholder, colspan, value, onChange }) {

    const [focused, setFocused] = useState(false)

    const module ={
        toolbar: [
            ['bold', 'italic', 'underline', 
                {color: ["red", "blue"]},
                'link',
                { "list": "ordered"}, { "list": "bullet" }, { "indent": "-1"}, { "indent": "+1" }
            ],
            
        ]
    }


    let Field;
    switch (type) {
        case "editor":
            Field = "textarea"
            break;
        default:
            Field = "input"
    }

    const handleOnChange = (event) => {
        if (type === 'editor') {
            onChange(event)
        } else {
            onChange(event.target.value)
        }
    }





    return (<div className={cx('field-control', `colspan${colspan}`)}>
        <label htmlFor={name}>{label}</label>
        {
            type === "editor" ? (
                <ReactQuill theme="snow" value={value} onChange={handleOnChange} className={cx('field-editor')} modules={module} />
            ) : (<Field onFocus={() => {
                setFocused(true)
            }} name={name} id={name} placeholder={placeholder} value={value} onChange={handleOnChange} className={cx('field-input')} />)
        }

    </div>);
}

export default FieldControl;