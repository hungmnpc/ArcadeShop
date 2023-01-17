import { faClone, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCopy, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import classNames from "classnames/bind";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../assets/images";
import routes from "../../configs/routes";
import ImageField from "./ImageField";
import style from "./ProductDetailAdmin.module.scss";
import ProductInfo from "./ProductInfo";

const cx = classNames.bind(style);

function ProductDetailAdmin({isScrollOver, ...prop }) {


    const UNTITLED_PRODUCT = "Untitled Product";


    const [title, setTitle] = useState("")

    const [isFocus, setIsFocus] = useState(false);








    return (<div className={cx('wrapper')}>
        <div className={cx('header-color')} />
        <div  className={cx('content')}>
            <div className={cx('header', [isScrollOver ? 'minimize' : ''])}>
                <div className={cx("breadcrumbs")}>
                    <span className={cx('breadcrumb-item')}>
                        <Link to={`/dashboard${routes.dashboardStoreProducts.products}`}>Products</Link>
                    </span>
                    <span className={cx('breadcrumb-item')}>
                        {title !== "" ? title : UNTITLED_PRODUCT}
                    </span>
                </div>
                <div className={cx('header-row')}>
                    <div className={cx('header-title', [isFocus ? 'is-focus' : ''])}>
                        <label onClick={() => setIsFocus(true)} htmlFor="title" className={cx('label-title')}>{title !== "" ? title : UNTITLED_PRODUCT}</label>
                        <input className={cx('input-title')} onFocus={() => {
                            setIsFocus(true)
                        }} onBlur={() => {
                            setIsFocus(false)
                        }} name="title" id='title' value={title} placeholder={UNTITLED_PRODUCT} onChange={(event) => {
                            setTitle(event.target.value)
                        }} />
                    </div>
                    <div className={cx('header-action')}>
                        <ActionsDropdown />
                        <button className={cx('btn', 'btn-cancel')}>Cancel</button>
                        <button className={cx('btn', 'btn-save')}>Save</button>

                    </div>

                </div>
            </div>
            <div className={cx('main-content')}>
                <div className={cx('main-content-column')}>
                    <div className={cx('image-field')}>
                        <ImageField images={[images.accessories.blaze_wireless_mouse, images.accessories.blaze_wireless_mouse, images.accessories.blaze_wireless_mouse, images.accessories.blaze_wireless_mouse, images.accessories.blaze_wireless_mouse, images.accessories.blaze_wireless_mouse]}/>
                    </div>
                    <div className={cx('product-info')}>
                        <ProductInfo />
                    </div>
                    
                </div>
                <div className={cx('main-content-column')}>
                    hello
                </div>
            </div>
            
        </div>
    </div>);
}


function ActionsDropdown() {

    const [show, setShow] = useState(false);

    const ref = useRef(null);

    const dropdownItems = [
        {
            icon: faClone,
            text: 'Save and duplicate',
            onClick: () => {
                console.log('save and duplicate')
            },
            type: 'normal',

        },
        {
            icon: faTrashCan,
            text: 'Delete product',
            onClick: () => {
                console.log('delete')
            },
            type: 'danger',
        }
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShow(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref])

    return ( <div ref={ref} className={cx('actions-dropdown',[show ? 'isShow' : ''])}>
        <div onClick={() => {
            setShow(!show)
        }} className={cx('btn-drop')}>
            <FontAwesomeIcon icon={faEllipsis} />
        </div>
        <div className={cx('drop-content')}>
            {
                dropdownItems.map((item, index) => (
                    <div className={cx('dropdown-item')} data-type={item.type} onClick={item.onClick} key={index}>
                        <FontAwesomeIcon icon={item.icon} className={cx('dropdown-item-icon')} />
                        <span className={cx('dropdown-item-text')}>{item.text}</span>
                    </div>
                ))
            }
        </div>
    </div> ); 
}



export default ProductDetailAdmin;