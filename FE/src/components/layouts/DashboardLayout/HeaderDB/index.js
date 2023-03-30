import classNames from "classnames/bind";
import { images } from "../../../../assets/images";
import style from "./HeaderDB.module.scss";

const cx = classNames.bind(style);

function HeaderDB() {
    return ( <div className={cx('wrapper')}>
        <div className={cx('logo')}>
            <img src={images.logoBlack.default} alt='logo' />
            <span>Dashboard</span>
        </div>
    </div> );
}

export default HeaderDB;