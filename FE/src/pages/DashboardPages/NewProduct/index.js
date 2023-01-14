import classNames from "classnames/bind";
import ProductDetailAdmin from "../../../components/ProductDetailAdmin";
import style from "./NewProduct.module.scss";

const cx = classNames.bind(style);

function NewProduct() {
    return ( <ProductDetailAdmin /> );
}

export default NewProduct;