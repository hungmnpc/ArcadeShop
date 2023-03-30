import { faImages } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import { addImageId, ProductContext, removeImageId } from "..";
import { get } from "../../../utils/request";
import ModalImage from "../../ModalImage";
import style from "./ImageField.module.scss";

const cx = classNames.bind(style);


function ImageField() {
    const dragStart = (e, position) => {
        dragItem.current = position;
    };

    const [productState, dispatch] = useContext(ProductContext)


    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(productState.imagesId)

    useEffect(() => {
        setList(productState.imagesId)
    }, [productState])


    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false)
    }

    const onOk = (idlist) => {
        dispatch(addImageId(idlist));
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
                    <ImageDisplay dragEnter={dragEnter} dragStart={dragStart} drop={drop} type='main' id={list[0]} />
                    <div className={cx('child-images')}>
                        {
                            list.slice(1).map((id, index) => {
                                return (
                                    <ImageDisplay index={index} dragEnter={dragEnter} dragStart={dragStart} drop={drop} key={index} type='child' id={id} />
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
        <ModalImage open={modalOpen} onOk={onOk} onCancel={closeModal} />
    </div>);


}
function ImageDisplay({ type, id, dragStart, dragEnter, drop, index  }) {

    const [image, setImage] = useState('');
    const [productState, dispatch] = useContext(ProductContext);

    useEffect(() => {
        if (id) {
            get(`/api/v1/images/${id}`).
                then(response => setImage(response.data))
        }
    }, [id])

    const handleRemove = () => {
        console.log(id);
        dispatch(removeImageId(id));
    }


    return (
        type === 'main' ? <div className={cx('main-image', 'image')}>
            <img draggable onDragStart={(e) => dragStart(e, 0)}
                            onDragEnter={(e) => dragEnter(e, 0)} onDragEnd={drop} src={`data:image/jpeg;base64,${image.imageBase64}`} alt="main" />
            <div onClick={handleRemove} className={cx('remove-image')}>
                <FontAwesomeIcon icon={faXmark} className={cx('icon-remove')} />
            </div>
        </div> : <div className={cx('child-image', 'image')}>
            <img draggable onDragStart={(e) => dragStart(e, index + 1)}
                            onDragEnter={(e) => dragEnter(e, index + 1)} onDragEnd={drop} src={`data:image/jpeg;base64,${image.imageBase64}`} alt='child' />
            <div onClick={handleRemove} className={cx('remove-image')}>
                <FontAwesomeIcon icon={faXmark} className={cx('icon-remove')} />
            </div>
        </div>

    )
}




export default ImageField;