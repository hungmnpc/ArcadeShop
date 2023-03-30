import { Modal } from "antd";
import classNames from "classnames/bind";
import FieldControl from "../FieldControl";
import MyModal from "../MyModal";
import style from "./ModalAdditionalInfo.scss";

function AdditionalInfoModal({open, onOk, onCancel, value, setValue}) {

    return ( <MyModal
        title="Add an info section"
        centered
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        width={620}
      >
        <div className='modal-content'>
            <div className="modal-row">
                <FieldControl value={value.title} onChange={(data) => {
                        setValue({
                            ...value,
                            title: data
                        })
                    }} label="Info section title" colspan="3" type="normal" required={true} name="title" />
            </div>
            <div className='modal-row'>
            <FieldControl value={value.description} onChange={(data) => {
                        setValue({
                            ...value,
                            description: data
                        })
                    }} label="Description" colspan="3" type="editor" required={true} name="description" />
            </div>
        </div>
      </MyModal>);
}

export default AdditionalInfoModal;