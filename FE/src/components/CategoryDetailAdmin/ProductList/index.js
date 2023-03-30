import classNames from "classnames/bind";
import { useContext } from "react";
import { CategoryContext } from "..";
import style from "./ProductList.module.scss";

const cx = classNames.bind(style);

function ProductList({ }) {

    const [categoryState, dispatch] = useContext(CategoryContext);
    console.log()
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span className={cx('title-span')}>Products in category <span className={cx('quantity')}>{categoryState.products.length}</span></span>
            </div>
            <div className={cx('contents')}></div>
        </div>);
}

export default ProductList;