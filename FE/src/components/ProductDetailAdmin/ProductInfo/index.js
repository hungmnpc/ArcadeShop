import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import style from "./ProductInfo.module.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./ReactQuillCustom.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from 'antd';
import AdditionalInfoModal from "../../ModalAdditionalInfo";
import FieldControl from "../../FieldControl";

const cx = classNames.bind(style);

function ProductInfo({value, setValue}) {


    const [modalOpen, setModalOpen] = useState(false);

    const [newAdditionInfo, setNewAdditionInfo] = useState({
        title: "",
        description: ""
    })


    const closeModal = () => {
        setNewAdditionInfo({
            title: "",
            description: ""
        })
        setModalOpen(false)
    }

    const handleAddAdditionalInfo = () => {
        if (newAdditionInfo.title !== '' && newAdditionInfo.description !== '') {

            const title = newAdditionInfo.title;
            const description = newAdditionInfo.description;
            setValue({
                ...value,
                additionalInfo: {
                    ...value.additionalInfo,
                    [title]: description
                }
            })
        }

        closeModal()
    }



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
                    <FieldControl value={value.name} onChange={(data) => {
                        setValue({
                            ...value,
                            name: data
                        })
                    }} label="Name" type="text" colspan="2" required={true} name="name" placeholder="Add a product name" />
                    <FieldControl value={value.ribbon} onChange={(data) => {
                        setValue({
                            ...value,
                            ribbon: data
                        })
                    }} label="Ribbon" type="text" colspan="1" required={true} name="ribbon" placeholder="e.g., New Arrival" />

                </div>
                <div className={cx('info-row')}>
                    <FieldControl value={value.description} onChange={(data) => {
                        setValue({
                            ...value,
                            description: data
                        })
                    }} label="Description" colspan="3" type="editor" required={true} name="description" />
                </div>
            </div>
        </div>
        <div className={cx('additional-info', 'section')}>
        <span className={cx('header')}>
                Additional Info Sections
            </span>
            {
                true &&
                <span className={cx('explanation')}>Share information like return policy or care instructions with your customers.</span>
            }
            <div className={cx('content')}>
                {Object.entries(value.additionalInfo).map((info, index) => {
                    return (
                        <RowAdditionalInfo key={index} title={info[0]} descreption={info[1]} />
                    )
                })}
            </div>
            <div className={cx('add-additional-info')} >
            <button onClick={() => setModalOpen(true)}>
                <FontAwesomeIcon icon={faPlus} className={cx('icon')} />
                <span>Add an Info Section</span>
            </button>
            </div>
        </div>

        <AdditionalInfoModal value={newAdditionInfo} setValue={setNewAdditionInfo} open={modalOpen} onOk={handleAddAdditionalInfo} onCancel={closeModal} />
    </div>);
}


function RowAdditionalInfo({title='', descreption=''}) {



    return ( <div className={cx('row-additional-info')}>
        <div className={cx('additional-info-title')}>
            {title}
        </div>
        <div dangerouslySetInnerHTML={{__html: descreption}} className={cx('additional-info-description')}>
        </div>
    </div> );
}



export default ProductInfo;