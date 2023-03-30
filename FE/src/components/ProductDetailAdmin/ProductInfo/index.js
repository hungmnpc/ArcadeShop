import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import style from "./ProductInfo.module.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./ReactQuillCustom.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from 'antd';
import AdditionalInfoModal from "../../ModalAdditionalInfo";
import FieldControl from "../../FieldControl";
import { addAnInfoSection, changeDescription, changeNameProduct, changeRibbon, ProductContext } from "..";

const cx = classNames.bind(style);

function ProductInfo() {


    const [modalOpen, setModalOpen] = useState(false);

    const [newAdditionInfo, setNewAdditionInfo] = useState({
        title: "",
        description: ""
    })

    const [productState, dispatch] = useContext(ProductContext);

    const closeModal = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        if (!modalOpen) {
            setNewAdditionInfo({
                title: "",
                description: "",
            })
        }
    }, [modalOpen])

    const handleAddAdditionalInfo = () => {
        if (newAdditionInfo.title !== '' && newAdditionInfo.description !== '') {
            dispatch(addAnInfoSection(newAdditionInfo))
        }
        closeModal()
    }

    const handleEditAdditionalInfo = (title, additionalInfo) => {
        delete productState.additionalInfo[title];
        dispatch(addAnInfoSection(additionalInfo))
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
                    <FieldControl value={productState.name} onChange={(data) => {
                        dispatch(changeNameProduct(data))
                    }} label="Name" type="text" colspan="2" required={true} name="name" placeholder="Add a product name" />
                    <FieldControl value={productState.ribbon} onChange={(data) => {
                        dispatch(changeRibbon(data))
                    }} label="Ribbon" type="text" colspan="1" required={true} name="ribbon" placeholder="e.g., New Arrival" />

                </div>
                <div className={cx('info-row')}>
                    <FieldControl value={productState.description} onChange={(data) => {
                        dispatch(changeDescription(data))
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
                {Object.entries(productState.additionalInfo).map((info, index) => {
                    return (
                        <RowAdditionalInfo onEdit={handleEditAdditionalInfo} key={index} title={info[0]} description={info[1]} />
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


function RowAdditionalInfo({ title = '', description = '' , onEdit}) {

    const [modalOpen, setModelOpen] = useState(false);
    const [additionalInfo, setAdditionInfo] = useState({
        title,
        description
    })

    const closeModal = () => {
        setModelOpen(false);
    }

    const handleEditAdditionInfo = () => {
        onEdit(title, additionalInfo);
        closeModal()
    }

    return (<><div onClick={() => setModelOpen(true)} className={cx('row-additional-info')}>
        <div title={title} className={cx('additional-info-title')}>
            {title}
        </div>
        <div dangerouslySetInnerHTML={{ __html: description }} className={cx('additional-info-description')}>
        </div>


    </div><AdditionalInfoModal value={additionalInfo} setValue={setAdditionInfo} open={modalOpen} onOk={handleEditAdditionInfo} onCancel={closeModal} /></>);
}



export default ProductInfo;