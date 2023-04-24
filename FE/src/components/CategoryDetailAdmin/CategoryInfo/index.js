import classNames from "classnames/bind";
import { useContext } from "react";
import { CategoryContext } from "..";
import style from "./CategoryInfo.module.scss";

const cx = classNames.bind(style);


function CategoryInfo() {
    const [categoryState, dispatch] = useContext(CategoryContext);
    console.log()
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span className={cx('title-span')}>Category Info</span>
            </div>
            <div className={cx('contents')}>
                <div className={cx('category_name_field')}>
                    <label htmlFor="category_name">Category name</label>
                    <input id="category_name" name="category_name" value={categoryState.categoryName}/>
                </div>
                <div className={cx('category_image')}>
                    <span>Category image</span>
                    <label htmlFor="category_image">
                        <input id="category_image" className={cx('category_name_input')} />
                    </label>
                </div>
            </div>
        </div>);
}

export default CategoryInfo;