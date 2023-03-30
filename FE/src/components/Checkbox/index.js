import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import style from "./Checkbox.module.scss";

const cx = classNames.bind(style);


function Checkbox({ value, checked, name, id, handelChecked, handelUnChecked, disabled = false }) {



    const onChange = (event) => {
        if (event.target.checked) {
            handelChecked(event)
        } else {
            handelUnChecked(event)
        }
    }





    return (
        <div className={cx('checkbox')}>
            <input disabled={disabled} onChange={onChange} type="checkbox" value={value} name={name} checked={checked} id={id} />
            <FontAwesomeIcon className={cx('checkbox-icon')} icon={checked ? faSquareCheck : faSquare} />
        </div>
    );
}

export default Checkbox;