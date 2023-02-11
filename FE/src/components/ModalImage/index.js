import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import FieldControl from "../FieldControl";
import MyModal from "../MyModal";
import style from "./ModalImage.module.scss";

const cx = classNames.bind(style);

function ModalImage({open, onOk, onCancel, value, setValue}) {
    return ( <MyModal
        title="Choose Images"
        centered
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        width={1500}
      >
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
              <div className={cx('upload')}>
                <button className={cx('btn-upload')}>
                  <FontAwesomeIcon icon={faPlus} className={cx('icon-upload')} />
                  <span>Upload Images</span>
                </button>
              </div>
            </div>
            <div className={cx('main-content')}>Main Content</div>
            <div className={cx('choosed')}>Choosed</div>
        </div>
      </MyModal> );
}

export default ModalImage;