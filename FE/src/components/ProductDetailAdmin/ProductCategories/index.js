import { faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useState } from "react";
import Checkbox from "../../Checkbox";
import style from "./ProductCategories.module.scss";

const cx = classNames.bind(style);

const categoriesValue = [
    {
        value: "Accessories",
    },
    {
        value: "Best Sellers",
    }, {
        value: "Consoles",
    }, {
        value: "Controllers",
    }, {
        value: "Games",
    }, {
        value: "On Sale",
    }
]

function ProductCategories({onChange, isChecked}) {

    const onChaneCategories = (e) => {
        onChange(e.target.value)
    }


    const handleUnCreate = () => {
        setNewCategory('')
        setIsCreating(false)
    }

    const [isCreating, setIsCreating] = useState(false)

    const [newCategory, setNewCategory] = useState("");


    return ( <div className={cx('wrapper')}>
        <div className={cx('title')}>
            <span>Categories</span>
        </div>
        <div className={cx('content')}>
                    <div  className={cx('category')}>
                        <label >
                        <Checkbox disabled={true} checked={true}  value="All" name='categories' id="A;;" />
                        <span className={cx('category-text')}>All Products</span>
                        </label>
                    </div>
            {categoriesValue.map((category, index) => {
                
                return (
                    <div key={index} className={cx('category')}>
                        <label htmlFor={category.value}>
                        <Checkbox checked={isChecked.includes(category.value)} handelChecked={onChaneCategories} handelUnChecked={onChaneCategories} value={category.value} name='categories' id={category.value} />
                        <span className={cx('category-text')}>{category.value}</span>
                        </label>
                    </div>
                )
            })}
            {
                isCreating && <div className={cx('new-category')}>
                    <div  className={cx('category')}>
                        <label htmlFor={newCategory === '' ? 'undefine': newCategory} >
                            <Checkbox checked={isCreating} handelUnChecked={handleUnCreate} value={newCategory === '' ? 'undefine': newCategory} name='categories' id={newCategory === '' ? 'undefine': newCategory} />
                        </label>
                        <div className={cx('input-new-category')}>
                            <input type='text' className={cx('field')} value={newCategory} onChange={(event) => setNewCategory(event.target.value)} />
                        </div>
                        <div className={cx('btns-action')}>
                            <button onClick={handleUnCreate} className={cx('btn', 'btn-cancel')}>
                                <FontAwesomeIcon icon={faXmark} className={cx('icon')} />
                            </button>
                            <button className={cx('btn', 'btn-submit')} disabled={newCategory === ''}>
                                <FontAwesomeIcon icon={faCheck} className={cx('icon')} />
                            </button>
                        </div>
                    </div>
                </div>
            }

            <div className={cx('add-category')}>
            <button onClick={() => setIsCreating(true)}>
                <FontAwesomeIcon icon={faPlus} className={cx('icon')} />
                <span>Create Category</span>
            </button>

        </div>
        </div>

        

    </div> );
} 

export default ProductCategories;