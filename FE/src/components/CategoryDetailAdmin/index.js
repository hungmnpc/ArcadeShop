import classNames from "classnames/bind";
import _ from "lodash";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { images } from "../../assets/images";
import routes from "../../configs/routes";
import { get } from "../../utils/request";
import { ActionsDropdown } from "../ProductDetailAdmin";
import style from "./CategoryDetailAdmin.module.scss";
import CategoryInfo from "./CategoryInfo";
import ProductList from "./ProductList";
import { createBrowserHistory } from "history";
import { AppContext } from "../../context/AppContext";
import { products } from "../../fakeApi";


const cx = classNames.bind(style);
const categoryActionsType = Object.freeze({
    ADD_NEW_CATEGORY: 'ADD_NEW_CATEGORY',
    CHANGE_NAME_CATEGORY: 'CHANGE_NAME_CATEGORY',
    DELETE_CATEGORY: 'DELETE_CATEGORY',
    CHANGE_RIBBON: 'CHANGE_RIBBON',
    REMOVE_PRODUCT: 'REMOVE_PRODUCT',
    ADD_PRODUCT: 'ADD_PRODUCT',
    CHANGE_PRODUCTS: 'CHANGE_PRODUCTS',
    SAVE_CATEGORY: 'SAVE_CATEGORY',
    INIT_CATEGORY: 'INIT_CATEGORY',
});

const initCategoryState = {};

export const initCategory = (category) => ({
    type: categoryActionsType.INIT_CATEGORY,
    category: category
})

const UNTITLED_CATEGORY = "Untitled Category"

export const changeCategoryName = (categoryName) => ({
    type: categoryActionsType.CHANGE_NAME_CATEGORY,
    categoryName: categoryName
})
export const removeProduct = (productID) => ({
    type: categoryActionsType.REMOVE_PRODUCT,
    productID: productID
})

export const addProduct = (products) => ({
    type: categoryActionsType.ADD_PRODUCT,
    products: products
})

export const changeProducts = (products) => ({
    type: categoryActionsType.CHANGE_PRODUCTS,
    products: products
})

const categoryReducer = (state = initCategoryState, action) => {
    switch (action.type) {
        case categoryActionsType.CHANGE_NAME_CATEGORY:
            return {
                ...state,
                categoryName: action.categoryName
            };

        case categoryActionsType.INIT_CATEGORY:
            return {
                ...action.category
            };
        case categoryActionsType.REMOVE_PRODUCT:
            console.log(action.productID)
            console.log(state.products.filter(product => product.id !== action.productID))
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.productID)
            }
        case categoryActionsType.ADD_PRODUCT:
            console.log(action)
            return {
                ...state,
                products: [...state.products, ...action.products]
            }
        case categoryActionsType.CHANGE_PRODUCTS:
            console.log(action)
            return {
                ...state,
                products: [...action.products]
            }
        default:
            return state;
    }

}

export const CategoryContext = createContext();

function CategoryDetailAdmin({ isScrollOver, categoryName, ...prop }) {
    const [isFocus, setIsFocus] = useState(false);

    const navigate = useNavigate();


    const [categoryState, dispatch] = useReducer(categoryReducer, initCategoryState);


    const [appState, appDispatch, history] = useContext(AppContext);

    history.listen(location => {
        console.log(location.pathname)
    })


    useEffect(() => {
        let newCategory = {};
        if (categoryName) {
            get(`/api/v1/categories/${categoryName}`)
                .then(response => {
                    newCategory = {
                        ...categoryState,
                        ...response.data
                    }
                    dispatch(initCategory(newCategory));
                })
        } else if (prop.categoryCopyName) {
            get(`/api/v1/category/${prop.categoryCopyName}`)
                .then(response => {
                    newCategory = {
                        ...categoryState,
                        ...response.data
                    }
                    dispatch(initCategory(newCategory));
                })
        } else {
            newCategory = {
                categoryName: ""
            }
            dispatch(initCategory(newCategory));
        }

    }, [categoryName, prop.categoryCopyName])
    return (
        !_.isEmpty(categoryState) && <CategoryContext.Provider value={[categoryState, dispatch]} ><div className={cx('wrapper')}>
            <div className={cx('header-color')}>
                <img src={categoryState.image === null ? images.defaultCategoryImage : `data:image/png;base64, ${categoryState.image.imageBase64}`} alt={categoryName} />
            </div>
            <div className={cx('content')}>
                <div className={cx('header', [isScrollOver ? 'minimize' : ''])}>
                    <div className={cx("breadcrumbs")}>
                        <span className={cx('breadcrumb-item')}>
                            <Link onClick={() => history.push(`/dashboard${routes.dashboardStoreProducts.categories}`)} to={`/dashboard${routes.dashboardStoreProducts.categories}`}>Categories</Link>
                        </span>
                        <span className={cx('breadcrumb-item')}>
                            {categoryState.categoryName !== "" ? categoryState.categoryName : UNTITLED_CATEGORY}
                        </span>
                    </div>
                    <div className={cx('header-row')}>
                        <div className={cx('header-title', [isFocus ? 'is-focus' : ''])}>
                            <label onClick={() => setIsFocus(true)} htmlFor="title" className={cx('label-title')}>{categoryState.categoryName !== "" ? categoryState.categoryName : UNTITLED_CATEGORY}</label>
                            <input type='text' className={cx('input-title')} onFocus={() => {
                                setIsFocus(true)
                            }} onBlur={() => {
                                setIsFocus(false)
                            }} name="title" id='title' value={categoryState.categoryName} placeholder={UNTITLED_CATEGORY} onChange={(event) => {
                                dispatch(changeCategoryName(event.target.value))
                            }} />
                        </div>
                        <div className={cx('header-action')}>
                            <ActionsDropdown />
                            <button onClick={() => {
                                return navigate(-1)
                            }} className={cx('btn', 'btn-cancel')}>Cancel</button>
                            <button className={cx('btn', 'btn-save')}>Save</button>

                        </div>

                    </div>
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('main-content-column')}>
                            <ProductList />
                    </div>
                    <div className={cx('main-content-column')}>
                            <CategoryInfo />
                    </div>
                </div>
            </div>
        </div></CategoryContext.Provider>);
}

export default CategoryDetailAdmin;
