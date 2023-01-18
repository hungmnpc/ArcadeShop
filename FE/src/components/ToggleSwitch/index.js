import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import style from "./ToggleSwitch.module.scss";


const cx = classNames.bind(style);

function ToggleSwith({value, defaultChecked, handleChecked, handleUnChecked}) {

    const ref = useRef(null);

    const onChange = (event) => {
        if (event.target.checked) {
            handleChecked()
        } else {
            handleUnChecked()
        }
    }


    return ( <label className={cx("switch")}>
    <input ref={ref} onChange={onChange} type="checkbox" value={value} defaultChecked={defaultChecked} />
    <span className={cx("slider", "round")}></span>
  </label> );
}

export default ToggleSwith;