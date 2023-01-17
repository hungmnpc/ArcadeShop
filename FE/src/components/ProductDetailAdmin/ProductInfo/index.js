import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import style from "./ProductInfo.module.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./ReactQuillCustom.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

function ProductInfo() {
    return (<div className={cx('wrapper')}>
        <div className={cx('title')}>
            <span>Product info</span>
        </div>
        <div className={cx('basic-info', 'section')}>
            <span className={cx('header')}>
                Basic info
            </span>
            <div className={cx('form-info')}>
                <div className={cx('info-row')}>
                    <FieldControl label="Name" type="text" colspan="2" required={true} name="name" placeholder="Add a product name" />
                    <FieldControl label="Ribbon" type="text" colspan="1" required={true} name="ribbon" placeholder="e.g., New Arrival" />

                </div>
                <div className={cx('info-row')}>
                    <FieldControl label="Description" colspan="3" type="editor" required={true} name="description" />
                </div>
            </div>
        </div>
        <div className={cx('additional-info', 'section')}>
        <span className={cx('header')}>
                Additional Info Sections
            </span>
            <div className={cx('content')}>
                <RowAdditionalInfo />
                <RowAdditionalInfo />
            </div>
            <div className={cx('add-additional-info')} >
            <button >
                <FontAwesomeIcon icon={faPlus} className={cx('icon')} />
                <span>Add an Info Section</span>
            </button>
            </div>
        </div>
    </div>);
}

function FieldControl({ label, type = "text", required, name, placeholder, colspan }) {

    const [focused, setFocused] = useState(false)

    console.log(focused)

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

    const [value, setValue] = useState("")

    console.log(value)



    return (<div className={cx('field-control', `colspan${colspan}`)}>
        <label htmlFor={name}>{label}</label>
        {
            type === "editor" ? (
                <ReactQuill theme="snow" value={value} onChange={setValue} className={cx('field-editor')} modules={module} />
            ) : (<Field onFocus={() => {
                setFocused(true)
            }} name={name} id={name} placeholder={placeholder} className={cx('field-input')} />)
        }

    </div>);
}

function RowAdditionalInfo() {
    return ( <div className={cx('row-additional-info')}>
        <div className={cx('additional-info-title')}>
            Product Description
        </div>
        <div className={cx('additional-info-description')}>
            <p>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.

            </p>
        </div>
    </div> );
}



export default ProductInfo;