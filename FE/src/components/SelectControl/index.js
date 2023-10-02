import classNames from "classnames/bind";
import style from "./SelectControl.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(style);


function SelectControl({label, value, onChange, selectItems, colspan}) {

    const [isDrop, setIsDrop] = useState(false);

    const handleClickDrop = () => {
        setIsDrop(!isDrop)
    }

    const handleChangeValue = (value) => {
        onChange(value);
        setIsDrop(false)
    }

    const fieldRef = useRef(null);

    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (fieldRef.current && !fieldRef.current.contains(event.target)) {
                setIsDrop(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutSide);

        return () => {
            document.removeEventListener("mousedown", handleClickOutSide)
        }
    },[fieldRef])

    return ( <div ref={fieldRef} className={cx('wrapper', `colspan${colspan}`)}>
        <span className={cx('label')}>{label}</span>
        <div onClick={handleClickDrop} className={cx('select-field', [isDrop ? 'drop': ''])}>
            <span className={cx('selected')}>{selectItems.find(item => item.value === value).text}</span>
            <FontAwesomeIcon className={cx('icon-dropdown')} icon={faAngleDown} />
        </div>
        <div className={cx('drop-items', [isDrop? 'show' : ''])}>
            {
                selectItems.map((item, index) => {

                    return (
                        <div className={cx('drop-item',[value === item.value ? 'isSelected' : ''])} key={index} onClick={() => {
                            handleChangeValue(item.value)
                        }}>{item.text}</div>
                    )
                })
            }
        </div>
    </div> );
}

export default SelectControl;