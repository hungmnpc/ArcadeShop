import { faClone, faSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCopy, faEllipsis, faSquareCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import classNames from "classnames/bind";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../assets/images";
import routes from "../../configs/routes";
import Checkbox from "../Checkbox";
import ImageField from "./ImageField";
import ProductCategories from "./ProductCategories";
import style from "./ProductDetailAdmin.module.scss";
import ProductInfo from "./ProductInfo";
import ProductPrice from "./ProductPrice";

const cx = classNames.bind(style);



function ProductDetailAdmin({ isScrollOver, ...prop }) {


    const UNTITLED_PRODUCT = "Untitled Product";



    const [isFocus, setIsFocus] = useState(false);

    const [isVisiable, setIsVisiable] = useState(true);

    const [productInfo, setProductInfo] = useState(
        {
            name: "",
            ribbon: "",
            description: "",
            categories: [
            ],
            visible: true,
            imagesId: [
              
            ],
            additionalInfo: {
            },
            price: null,
            discountMode: "PERCENT",
            discountValue: 0,
            inventoryStatus: "In stock",
            sku: ""
          }
    )

    const handleOnChaneCategories = (value) => {

        if (productInfo.categories.includes(value)) {
            setProductInfo({
                ...productInfo,
                categories: productInfo.categories.filter((category) => category !== value)
            })
        } else {
            
            setProductInfo({
                ...productInfo,
                categories: [
                    ...productInfo.categories,
                    value,
                ]
            })
        }

    }

    

    // handleAddAdditionalInfo({'new': 'hello'});
    // console.log(productInfo)





    const handleVisiable = () => {
        setIsVisiable(true);
    }

    const handleUnVisiable = () => {
        setIsVisiable(false);
    }


console.log(productInfo)




    return (<div className={cx('wrapper')}>
        <div className={cx('header-color')} />
        <div className={cx('content')}>
            <div className={cx('header', [isScrollOver ? 'minimize' : ''])}>
                <div className={cx("breadcrumbs")}>
                    <span className={cx('breadcrumb-item')}>
                        <Link to={`/dashboard${routes.dashboardStoreProducts.products}`}>Products</Link>
                    </span>
                    <span className={cx('breadcrumb-item')}>
                        {productInfo.name !== "" ? productInfo.name : UNTITLED_PRODUCT}
                    </span>
                </div>
                <div className={cx('header-row')}>
                    <div className={cx('header-title', [isFocus ? 'is-focus' : ''])}>
                        <label onClick={() => setIsFocus(true)} htmlFor="title" className={cx('label-title')}>{productInfo.name !== "" ? productInfo.name : UNTITLED_PRODUCT}</label>
                        <input className={cx('input-title')} onFocus={() => {
                            setIsFocus(true)
                        }} onBlur={() => {
                            setIsFocus(false)
                        }} name="title" id='title' value={productInfo.name} placeholder={UNTITLED_PRODUCT} onChange={(event) => {
                            setProductInfo({
                                ...productInfo,
                                name: event.target.value
                            })
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
                        <ImageField images={[images.accessories.blaze_wireless_mouse, images.accessories.blaze_wireless_mouse, images.accessories.blaze_wireless_mouse, images.accessories.blaze_wireless_mouse, images.accessories.blaze_wireless_mouse, images.accessories.blaze_wireless_mouse]} />
                    </div>
                    <div className={cx('product-info')}>
                        <ProductInfo value={productInfo} setValue={setProductInfo}/>
                    </div>
                    <div className={cx('price')}>
                        <ProductPrice value={productInfo} setValue={setProductInfo} />
                    </div>

                </div>
                <div className={cx('main-content-column')}>
                    <div className={cx('visiable-section')}>
                        <label htmlFor="visiable" className={cx('visiable')}>
                            <Checkbox  checked={isVisiable} handelChecked={handleVisiable} handelUnChecked={handleUnVisiable} value='visiable' name='visiable' id='visiable' />
                            <span>Show in online store</span>
                        </label>
                    </div>
                    <div className={cx('categories-section')}>
                        <ProductCategories isChecked={productInfo.categories} onChange={handleOnChaneCategories} />
                    </div>
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

    return (<div ref={ref} className={cx('actions-dropdown', [show ? 'isShow' : ''])}>
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
    </div>);
}







export default ProductDetailAdmin;