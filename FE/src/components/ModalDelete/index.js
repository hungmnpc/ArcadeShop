import classNames from "classnames/bind";
import { images } from "../../assets/images";
import MyModal from "../MyModal";
import style from "./ModalDelete.module.scss";

const cx = classNames.bind(style);


function ModalDelete({open, onOk, onCancel}) {
    return (<MyModal
        title="Delete this product?"
        centered
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        width={500}
        danger={true}
        okText={"Delete"}
      >
        <div className={cx('wrapper')}>
            <img src={images.trash.default} alt='trash' />
            <span>Once deleted, you won’t be able to recover these products.</span>
        </div>
      </MyModal> );
}

export default ModalDelete;