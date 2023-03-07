import classNames from "classnames/bind";
import MyModal from "../MyModal";
import style from "./ModalUploadImage.module.scss";


import { faCircleXmark, faCloudArrowUp, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

const cx = classNames.bind(style);

function ModalUploadImage({ open, onOk, onCancel, value, setValue }) {
	const [imagePreview, setImagePreview] = useState(null);
	const [selectedFile, setSelectedFile] = useState();
	const inputRef = useRef(null);

	const handleOnChange = (e) => {
        let fReader = new FileReader();
        fReader.readAsDataURL(e.target.files[0]);
        fReader.onloadend = (event) => {
            setImagePreview(event.target.result);
        } 

        setSelectedFile(e.target.files[0])
    }

	const handleReset = () => {
        setImagePreview(null)
        setSelectedFile(null)
        inputRef.current.value = null
    }

	const onClose = () => {
		handleReset();
		onCancel();
	}

	const onUpload = () => {
		onOk(selectedFile)
		handleReset();
	}
    

	return (<MyModal
		title="Upload Image"
		centered
		open={open}
		onOk={onUpload}
		onCancel={onClose}
		width={800}
	>
		<div className={cx('wrapper')}>
		<form className={cx([imagePreview !== null ? 'hidden' : ''])}>
            <input ref={inputRef} id={cx("file-upload")}  style={{display: 'none'}} type='file' accept="image/*" onChange={handleOnChange}/>
            <label htmlFor='file-upload'>
                <div className={cx("start", [imagePreview !== null ? 'hidden' : ''])}>
                    <FontAwesomeIcon icon={faCloudArrowUp} className={cx('icon-upload')} />
                    <span>Select a file or drag here</span>
                    <div className={cx('btn-select')}><span>Select a file</span></div>
                </div>
            </label>

            {/* <input type="submit" value="Predict" /> */}
        </form>
        <div id={cx('file-image')} className={cx([imagePreview === null ? 'hidden' : ''])} >
            <img  src={imagePreview} alt="Preview"  />
            <FontAwesomeIcon onClick={handleReset} icon={faCircleXmark} className={cx('icon-close')}/>
        </div>
		</div>
	</MyModal>);
}

export default ModalUploadImage;