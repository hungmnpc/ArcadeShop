import classNames from "classnames/bind";
import MyModal from "../MyModal";
import style from "./ModalUploadImage.module.scss";

const cx = classNames.bind(style);

function ModalUploadImage({ open, onOk, onCancel, value, setValue }) {
	return (<MyModal
		title="Upload Image"
		centered
		open={open}
		onOk={onOk}
		onCancel={onCancel}
		width={500}
	>
		<div className={cx('wrapper')}>
			<form onSubmit={(e) => {e.preventDefault()}}>
				<div></div>
			</form>
		</div>
	</MyModal>);
}

export default ModalUploadImage;