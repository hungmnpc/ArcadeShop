import classNames from "classnames/bind";
import _ from "lodash";
import { createContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../configs/routes";
import { get } from "../../utils/request";
import { ActionsDropdown } from "../ProductDetailAdmin";
import style from "./CategoryDetailAdmin.module.scss";
import ProductList from "./ProductList";


const cx = classNames.bind(style);
const categoryActionsType = Object.freeze({
    ADD_NEW_CATEGORY: 'ADD_NEW_CATEGORY',
    CHANGE_NAME_CATEGORY: 'CHANGE_NAME_CATEGORY',
    DELETE_CATEGORY: 'DELETE_CATEGORY',
    CHANGE_RIBBON: 'CHANGE_RIBBON',
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
        default:
            return state;
    }

}

export const CategoryContext = createContext();

function CategoryDetailAdmin({ isScrollOver, categoryName, ...prop }) {
    const [isFocus, setIsFocus] = useState(false);

    const navigate = useNavigate();

    const [categoryState, dispatch] = useReducer(categoryReducer, initCategoryState);

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
            <div className={cx('header-color')} />
            <div className={cx('content')}>
                <div className={cx('header', [isScrollOver ? 'minimize' : ''])}>
                    <div className={cx("breadcrumbs")}>
                        <span className={cx('breadcrumb-item')}>
                            <Link to={`/dashboard${routes.dashboardStoreProducts.categories}`}>Categories</Link>
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
                                return navigate("/dashboard")
                            }} className={cx('btn', 'btn-cancel')}>Cancel</button>
                            <button className={cx('btn', 'btn-save')}>Save</button>

                        </div>

                    </div>
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('main-content-column')}>
                        <div className={cx('product-list')}>
                            <ProductList />
                        </div>
                    </div>
                    <div className={cx('main-content-column')}>
                        Hello
                    </div>
                </div>
            </div>
        </div></CategoryContext.Provider>);
}

export default CategoryDetailAdmin;
