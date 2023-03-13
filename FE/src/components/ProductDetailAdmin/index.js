import { faClone, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../configs/routes";
import Checkbox from "../Checkbox";
import ImageField from "./ImageField";
import Inventory from "./Inventory";
import ProductCategories from "./ProductCategories";
import style from "./ProductDetailAdmin.module.scss";
import ProductInfo from "./ProductInfo";
import toast from 'react-hot-toast'
import ProductPrice from "./ProductPrice";
import { addNewProduct, get } from "../../utils/request";

const cx = classNames.bind(style);


// Chuyen doi sang su dung useContext + useReducer //


function ProductDetailAdmin({ isScrollOver, id, ...prop }) {


    const UNTITLED_PRODUCT = "Untitled Product";
    const [isFocus, setIsFocus] = useState(false);
    const [productInfo, setProductInfo] = useState()

    useEffect(() => {
        if (id) {
            get(`/api/v1/admin/products/${id}`)
            .then(response => {

                console.log(response.data);
                setProductInfo({
                    ...productInfo,
                    name: response.data.name,
                    ribbon: response.data.ribbon,
                    description: response.data.description,
                    price: response.data.price,
                    discountMode: response.data.discountModeName,
                    discountValue: response.data.discountValue,
                    imagesId: 
                      response.data.imageSet.map(image => image.id)
                    ,
                    additionalInfo: response.data.additionalInfo,
                    categories: response.data.categoriesName,
                    visible: response.data.visible,
                    inventoryStatus: response.data.inventoryStatus,
                    sku: response.data.sku
                })
            })
        } else {
            setProductInfo(
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
                  })
        }
    },[id])

    const handleSave = () => {
        const data = {
            ...productInfo,
            discountValue: parseFloat(productInfo.discountValue),
            price: parseFloat(productInfo.price)
        }
                
        toast.promise(addNewProduct(data), {
            loading: 'Creating.....',
            success: 'Successfull!',
            error: "Error. Try again!"
        }).catch(error => console.log(error))
    }

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


    const handleVisiable = () => {
        setProductInfo({
            ...productInfo,
            visible: true
        })
    }

    const handleUnVisiable = () => {
        setProductInfo({
            ...productInfo,
            visible: false
        })
    }



    console.log(productInfo);

    return (
    productInfo && <div className={cx('wrapper')}>
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
                        <button onClick={handleSave} className={cx('btn', 'btn-save')}>Save</button>

                    </div>

                </div>
            </div>
            <div className={cx('main-content')}>
                <div className={cx('main-content-column')}>
                    <div className={cx('image-field')}>
                        <ImageField value={productInfo} setValue={setProductInfo} images={[]} />
                    </div>
                    <div className={cx('product-info')}>
                        <ProductInfo value={productInfo} setValue={setProductInfo}/>
                    </div>
                    <div className={cx('price')}>
                        <ProductPrice value={productInfo} setValue={setProductInfo} />
                    </div>
                    <div className={cx('inventory')}>
                        <Inventory value={productInfo} setValue={setProductInfo} />
                    </div>

                </div>
                <div className={cx('main-content-column')}>
                    <div className={cx('visiable-section')}>
                        <label htmlFor="visiable" className={cx('visiable')}>
                            <Checkbox  checked={productInfo.visible} handelChecked={handleVisiable} handelUnChecked={handleUnVisiable} value='visiable' name='visiable' id='visiable' />
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