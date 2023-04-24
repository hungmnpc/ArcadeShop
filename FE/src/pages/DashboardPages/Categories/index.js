import classNames from "classnames/bind";
import style from "./Categories.module.scss";
import { images } from "../../../assets/images";
import Link from "antd/es/typography/Link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from "../../../components/Button";
import { useEffect, useRef, useState } from "react";
import { MoreOutlined } from '@ant-design/icons';
import { get } from "../../../utils/request";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function Categories({ isScrollOver, ...prop }) {

    const [isFocusInput, setIsFocusInput] = useState(false);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        get("/api/v1/categories")
            .then((response) => {
                setCategories(response.data.reverse())
            })
    }, [])

    return (<div className={cx('wrapper')}>
        <div className={cx('header', [isScrollOver ? 'sticky' : ''])}>
            <div className={cx('header-top-row')}>
                <div className={cx('title')}>
                    <h2>Categories <span className={cx('quantity')}>{categories.length}</span></h2>
                </div>
                <div className={cx('actions')}>
                    <div htmlFor="category" className={cx('searching', [isFocusInput ? 'focus' : 'blur'])}>
                        <label htmlFor="category">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon-search')} />
                        </label>
                        <input onFocus={() => {
                            setIsFocusInput(true)
                        }} onBlur={() => {
                            setIsFocusInput(false)
                        }} type='text' name="category" id='category' className={cx("search-input")} />
                    </div>
                    <div className={cx('btn-new-category')}>
                        <button><FontAwesomeIcon icon={faPlus} className={cx('icon')} /> New Category</button>
                    </div>
                </div>
            </div>
            <div className={cx('header-subtitle')}>
                <span>Group related products into categories and add them to your site. <Link className={cx('support')} to={"/"}>Learn how</Link></span>
            </div>
        </div>
        <div className={cx('content')}>
            {
                categories.map((category, index) => {
                    return <CategoryPack category={category} key={index} />
                })
            }
            <div className={cx('category-pack', 'add-category')}>
                <FontAwesomeIcon icon={faPlus} className={cx('icon-plus')} />
                <div className={cx('shadow')} />
            </div>


        </div>
    </div>);
}


function CategoryPack({ category }) {


    const [isFocus, setIsFocus] = useState(false);
    const [categoryName, setCategoryName] = useState(category.categoryName)
    const inputRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (inputRef !== null) {
            if (isFocus) {
                inputRef.current.focus()
            }
        }
    }, [inputRef, isFocus])

    const handleClickCategory = (e) => {
        return navigate("/dashboard/store-products/categories/" + categoryName);
    }



    return (
        <div onClick={handleClickCategory} className={cx('category-pack')}>
            <img src={category.image !== null ? `data:image/png;base64, ${category.image.imageBase64}` : images.defaultCategoryImage} alt="category" />
            <div className={cx('shadow')} />
            <div onClick={(e) => {
                e.stopPropagation()
            }} className={cx('header-category-name')}>
                <div className={cx('header-title', [isFocus ? 'is-focus' : ''], [categoryName === "" ? 'emty' : ''])}>
                    <label onClick={() => setIsFocus(true)} htmlFor="title" className={cx('label-title')}>{categoryName !== "" ? categoryName : "placeholder text"}</label>
                    <input ref={inputRef} className={cx('input-title')} onFocus={() => {
                        console.log("Focus");
                        setIsFocus(true)
                    }} onBlur={() => {
                        setIsFocus(false)
                    }} name="title" id='title' value={categoryName} placeholder={"placeholder text"} onChange={(event) => {
                        setCategoryName(event.target.value)
                    }} />
                </div>
                <span className={cx('quantity')}>{category.products.length}</span>
            </div>
            <div onClick={(e) => {
                e.stopPropagation()
            }} className={cx('options')}>
                <div onClick={(e) => {
                    
                }} className={cx('button')}>
                    <span className={cx('dot')} />
                </div>
            </div>
        </div>);
}


export default Categories;