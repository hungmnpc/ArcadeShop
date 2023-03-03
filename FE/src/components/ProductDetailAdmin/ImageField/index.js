import { faImages } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import ModalImage from "../../ModalImage";
import style from "./ImageField.module.scss";

const cx = classNames.bind(style);


function ImageField({ images }) {

    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(images)

    const dragStart = (e, position) => {
        dragItem.current = position;
    };


    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false)
    }


    const drop = (e) => {
        const copyListItems = [...list];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(copyListItems);
    };
    return (<div className={cx('wrapper')}>
        <div className={cx('title')}>
            <span>Images</span>
        </div>
        <div className={cx('contents')}>
            {
                list.length === 0 ? (<div onClick={() => {
                    setModalOpen(true)
                }} className={cx('image-btn')}>
                    <FontAwesomeIcon icon={faImages} className={cx('icon')} />
                    <span>Add Images</span>
                </div>) : (<div className={cx('images')}>
                    <div className={cx('main-image', 'image')}>
                        <img draggable onDragStart={(e) => dragStart(e, 0)}
                            onDragEnter={(e) => dragEnter(e, 0)} onDragEnd={drop} src={list[0]} alt="main" />
                        <div className={cx('remove-image')}>
                            <FontAwesomeIcon icon={faXmark} className={cx('icon-remove')} />
                        </div>
                    </div>
                    <div className={cx('child-images')}>
                        {
                            list.slice(1).map((image, index) => {
                                return (
                                    <div className={cx('child-image', 'image')} key={index}>
                                        <img onDragEnd={drop} onDragStart={(e) => dragStart(e, index + 1)}
                                            onDragEnter={(e) => dragEnter(e, index + 1)} src={image} alt='child' />
                                        <div className={cx('remove-image')}>
                                            <FontAwesomeIcon icon={faXmark} className={cx('icon-remove')} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            list.slice(1).length < 8 &&
                            <div onClick={() => {
                                setModalOpen(true)
                            }} className={cx('image-btn-small')}>
                                <div>
                                    <span>

                                        <FontAwesomeIcon icon={faPlus} />
                                    </span>

                                </div>
                            </div>
                        }
                    </div>
                </div>)
            }

        </div>
        <ModalImage open={modalOpen} onOk={closeModal} onCancel={closeModal} />
    </div>);
}

export default ImageField;