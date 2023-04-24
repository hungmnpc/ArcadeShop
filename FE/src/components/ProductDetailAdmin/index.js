import { faClone, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../configs/routes";
import Checkbox from "../Checkbox";
import ImageField from "./ImageField";
import Inventory from "./Inventory";
import ProductCategories from "./ProductCategories";
import style from "./ProductDetailAdmin.module.scss";
import ProductInfo from "./ProductInfo";
import toast from 'react-hot-toast'
import ProductPrice from "./ProductPrice";
import { addNewProduct, get, updateProduct } from "../../utils/request";
import styleActionDropDown from "./ActionDropDown.module.scss";
const _ = require('lodash')

const cx = classNames.bind(style);


// Chuyen doi sang su dung useContext + useReducer //

const productActionsType = Object.freeze({
    ADD_NEW_PRODUCT: 'ADD_NEW_PRODUCT',
    ADD_IMAGE_ID: 'ADD_IMAGE_ID',
    REMOVE_IMAGE_ID: 'REMOVE_IMAGE_ID',
    CHANGE_NAME_PRODUCT: 'CHANGE_NAME_PRODUCT',
    CHANGE_PRICE: 'CHANGE_PRICE',
    CHANGE_DISCOUNT_MODE: 'CHANGE_DISCOUNT_MODE',
    CHANGE_DISCOUNT_VALUE: 'CHANGE_DISCOUNT_VALUE',
    ADD_CATEGORY: 'ADD_CATEGORY',
    REMOVE_CATEGORY: 'REMOVE_CATEGORY',
    CHANGE_RIBBON: 'CHANGE_RIBBON',
    CHANGE_DESCRIPTION: 'CHANGE_DESCRIPTION',
    ADD_AN_INFO_SECTION: 'ADD_AN_INFO_SECTION',
    CHANGE_INVENTORY_STATUS: 'CHANGE_INVENTORY_STATUS',
    CHANGE_SKU: 'CHANGE_SKU',
    SET_IS_VISIBLE: 'SET_IS_VISIBLE',
    SAVE_PRODUCT: 'SAVE_PRODUCT',
    INIT_PRODUCT: 'INIT_PRODUCT',
    CHANGE_MAIN_IMAGE_ID: 'CHANGE_MAIN_IMAGE_ID',
    CHANGE_IMAGES_ID: 'CHANGE_IMAGES_ID' 
});

export const createNewProduct = () => ({
    type: productActionsType.ADD_NEW_PRODUCT
});

export const changeNameProduct = (name) => ({
    type: productActionsType.CHANGE_NAME_PRODUCT,
    name: name
});

export const addImageId = (ids = []) => ({
    type: productActionsType.ADD_IMAGE_ID,
    ids: ids
})

export const changeImagesId = (ids = []) => ({
    type: productActionsType.CHANGE_IMAGES_ID,
    ids: ids
})

export const removeImageId = (id) => ({
    type: productActionsType.REMOVE_IMAGE_ID,
    id: id
})

export const changePrice = (price) => ({
    type: productActionsType.CHANGE_PRICE,
    price: price
})

export const changeDiscountMode = (mode) => ({
    type: productActionsType.CHANGE_DISCOUNT_MODE,
    mode: mode
})

export const changeDiscountValue = (discountValue) => ({
    type: productActionsType.CHANGE_DISCOUNT_VALUE,
    discountValue: discountValue
})

export const addCategory = (category) => ({
    type: productActionsType.ADD_CATEGORY,
    category: category
})

export const removeCategory = (category) => ({
    type: productActionsType.REMOVE_CATEGORY,
    category: category
})

export const changeRibbon = (ribbon) => ({
    type: productActionsType.CHANGE_RIBBON,
    ribbon: ribbon
})

export const changeDescription = (description) => ({
    type: productActionsType.CHANGE_DESCRIPTION,
    description: description
})

export const addAnInfoSection = (infoSection) => ({
    type: productActionsType.ADD_AN_INFO_SECTION,
    infoSection: infoSection
})

export const changeInventoryStatus = (status) => ({
    type: productActionsType.CHANGE_INVENTORY_STATUS,
    status: status
})

export const changeSku = (sku) => ({
    type: productActionsType.CHANGE_SKU,
    sku: sku
})

export const setIsVisible = (isVisible) => ({
    type: productActionsType.SET_IS_VISIBLE,
    isVisible: isVisible
})

export const saveProduct = () => ({
    type: productActionsType.SAVE_PRODUCT,
})

export const initProduct = (product) => ({
    type: productActionsType.INIT_PRODUCT,
    product: product
})

export const changeMainImage = (mainImageId) => ({
    type: productActionsType.CHANGE_MAIN_IMAGE_ID,
    mainImageId: mainImageId
})


const initProductState = {};

const productReducer = (state = initProductState, action) => {
    switch (action.type) {
        case productActionsType.CHANGE_NAME_PRODUCT:
            return {
                ...state,
                name: action.name
            };
        case productActionsType.INIT_PRODUCT:
            return {
                ...action.product
            };
        case productActionsType.ADD_IMAGE_ID:
            console.log("WTF");
            return {
                ...state,
                imagesId: [...new Set(state.imagesId.concat(action.ids))]
            }
        case productActionsType.CHANGE_IMAGES_ID:
            return {
                ...state,
                imagesId: [...action.ids]
            }
        case productActionsType.REMOVE_IMAGE_ID:
            return {
                ...state,
                imagesId: state.imagesId.filter(id => id !== action.id)
            }
        case productActionsType.CHANGE_DESCRIPTION:
            return {
                ...state,
                description: action.description
            }
        case productActionsType.CHANGE_RIBBON:
            return {
                ...state,
                ribbon: action.ribbon
            }
        case productActionsType.CHANGE_PRICE:
            return {
                ...state,
                price: action.price
            }
        case productActionsType.CHANGE_DISCOUNT_MODE:
            return {
                ...state,
                discountMode: action.mode
            }
        case productActionsType.CHANGE_DISCOUNT_VALUE:
            return {
                ...state,
                discountValue: action.discountValue
            }
        case productActionsType.ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.category]
            }
        case productActionsType.REMOVE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(category => category !== action.category)
            }
        case productActionsType.CHANGE_SKU:
            return {
                ...state,
                sku: action.sku
            }
        case productActionsType.CHANGE_INVENTORY_STATUS:
            return {
                ...state,
                inventoryStatus: action.status
            }
        case productActionsType.ADD_AN_INFO_SECTION:
            return {
                ...state,
                additionalInfo: {
                    ...state.additionalInfo,
                    [action.infoSection.title]: action.infoSection.description
                }
            }
        case productActionsType.SET_IS_VISIBLE:
            return {
                ...state,
                visible: action.isVisible
            }
        case productActionsType.CHANGE_MAIN_IMAGE_ID:
            return {
                ...state,
                mainImageId: action.mainImageId
            }
        default:
            return state;
    }
}



export const ProductContext = createContext();
function ProductDetailAdmin({ isScrollOver, id, isCopy=false, ...prop }) {



    const UNTITLED_PRODUCT = "Untitled Product";
    const [isFocus, setIsFocus] = useState(false);
    const navigate = useNavigate();


    const [productState, dispatch] = useReducer(productReducer, initProductState)

    console.log(productState)

    useEffect(() => {
        let newProduct = {};
        if (id) {
            get(`/api/v1/admin/products/${id}`)
            .then(response => {
                console.log(response)
                newProduct = {
                    ...productState,
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
                }
                dispatch(initProduct(newProduct));
            })
        } else if (prop.productCopyId) {
            get(`/api/v1/admin/products/${prop.productCopyId}`)
            .then(response => {
                newProduct = {
                    ...productState,
                    name: response.data.name,
                    ribbon: response.data.ribbon,
                    description: response.data.description,
                    price: response.data.price,
                    discountMode: response.data.discountModeName,
                    discountValue: response.data.discountValue,
                    imagesId: [],
                    additionalInfo: response.data.additionalInfo,
                    categories: response.data.categoriesName,
                    visible: response.data.visible,
                    inventoryStatus: response.data.inventoryStatus,
                    sku: response.data.sku
                }
                dispatch(initProduct(newProduct));
            })
        } else {
            newProduct = {
                name: "",
                    ribbon: "",
                    description: "",
                    categories: [
                    ],
                    visible: true,
                    imagesId: [
                      
                    ],
                    mainImageId: undefined,
                    additionalInfo: {
                    },
                    price: null,
                    discountMode: "PERCENT",
                    discountValue: 0,
                    inventoryStatus: "In stock",
                    sku: ""
            }
            dispatch(initProduct(newProduct));
        }
        
    },[id, prop.productCopyId])

    console.log(productState)

    const handleSave = () => {
        console.log(productState)
        if (!id) {
            const data = {
                ...productState,
                discountValue: parseFloat(productState.discountValue),
                price: parseFloat(productState.price)
            }
                    
            toast.promise(addNewProduct(data), {
                loading: 'Creating.....',
                success: 'Successfull!',
                error: "Error. Try again!"
            }).then(response => {
                return navigate("/dashboard")
            }).catch(error => console.log(error))
        } else {
            const data = {
                ...productState,
                discountValue: parseFloat(productState.discountValue),
                price: parseFloat(productState.price)
            }

            toast.promise(updateProduct(data, id), {
                loading: 'Updating.....',
                success: 'Successfull!',
                error: "Error. Try again!"
            }).then(response => {
    
                return navigate("/dashboard")
            }).catch(error => console.log(error))
        }
    }

    const handleOnChaneCategories = (value) => {

        console.log("value: " + value);
        if (productState.categories.includes(value)) {
            dispatch(removeCategory(value))
        } else {
            dispatch(addCategory(value))
        }

    }


    const handleVisiable = () => {
        dispatch(setIsVisible(true))
    }

    const handleUnVisiable = () => {
        dispatch(setIsVisible(false))
    }

    return (
    !_.isEmpty(productState) && <ProductContext.Provider value={[productState, dispatch]}>
        
        <div className={cx('wrapper')}>
        <div className={cx('header-color')} />
        <div className={cx('content')}>
            <div className={cx('header', [isScrollOver ? 'minimize' : ''])}>
                <div className={cx("breadcrumbs")}>
                    <span className={cx('breadcrumb-item')}>
                        <Link to={`/dashboard${routes.dashboardStoreProducts.products}`}>Products</Link>
                    </span>
                    <span className={cx('breadcrumb-item')}>
                        {productState.name !== "" ? productState.name : UNTITLED_PRODUCT}
                    </span>
                </div>
                <div className={cx('header-row')}>
                    <div className={cx('header-title', [isFocus ? 'is-focus' : ''])}>
                        <label onClick={() => setIsFocus(true)} htmlFor="title" className={cx('label-title')}>{productState.name !== "" ? productState.name : UNTITLED_PRODUCT}</label>
                        <input className={cx('input-title')} onFocus={() => {
                            setIsFocus(true)
                        }} onBlur={() => {
                            setIsFocus(false)
                        }} name="title" id='title' value={productState.name} placeholder={UNTITLED_PRODUCT} onChange={(event) => {
                            dispatch(changeNameProduct(event.target.value))
                        }} />
                    </div>
                    <div className={cx('header-action')}>
                        <ActionsDropdown />
                        <button onClick={() => {
                            return navigate("/dashboard")
                        }} className={cx('btn', 'btn-cancel')}>Cancel</button>
                        <button onClick={handleSave} className={cx('btn', 'btn-save')}>Save</button>

                    </div>

                </div>
            </div>
            <div className={cx('main-content')}>
                <div className={cx('main-content-column')}>
                    <div className={cx('image-field')}>
                        <ImageField/>
                    </div>
                    <div className={cx('product-info')}>
                        <ProductInfo/>
                    </div>
                    <div className={cx('price')}>
                        <ProductPrice />
                    </div>
                    <div className={cx('inventory')}>
                        <Inventory/>
                    </div>

                </div>
                <div className={cx('main-content-column')}>
                    <div className={cx('visiable-section')}>
                        <label htmlFor="visiable" className={cx('visiable')}>
                            <Checkbox  checked={productState.visible} handelChecked={handleVisiable} handelUnChecked={handleUnVisiable} value='visiable' name='visiable' id='visiable' />
                            <span>Show in online store</span>
                        </label>
                    </div>
                    <div className={cx('categories-section')}>
                        <ProductCategories isChecked={productState.categories} onChange={handleOnChaneCategories} />
                    </div>
                </div>
            </div>

        </div>
        
    </div>
        </ProductContext.Provider>
        );
}


const cxAction = classNames.bind(styleActionDropDown);


export function ActionsDropdown() {

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

    return (<div ref={ref} className={cxAction('actions-dropdown', [show ? 'isShow' : ''])}>
        <div onClick={() => {
            setShow(!show)
        }} className={cxAction('btn-drop')}>
            <FontAwesomeIcon icon={faEllipsis} />
        </div>
        <div className={cxAction('drop-content')}>
            {
                dropdownItems.map((item, index) => (
                    <div className={cxAction('dropdown-item')} data-type={item.type} onClick={item.onClick} key={index}>
                        <FontAwesomeIcon icon={item.icon} className={cxAction('dropdown-item-icon')} />
                        <span className={cxAction('dropdown-item-text')}>{item.text}</span>
                    </div>
                ))
            }
        </div>
    </div>);
}








export default ProductDetailAdmin;