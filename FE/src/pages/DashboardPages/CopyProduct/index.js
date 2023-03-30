import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductDetailAdmin from "../../../components/ProductDetailAdmin";
import style from './CopyProduct.module.scss';

const cx = classNames.bind(style);

function CopyProduct({isScrollOver, ...prop}) {

    const [searchParams, setSearchParams] = useSearchParams();
    const [productCopyId, setProductCopyId] = useState();
    
    useEffect(() => {
        console.log(searchParams.get("product_id"));
        setProductCopyId(searchParams.get("product_id"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    return ( <ProductDetailAdmin isCopy={true} productCopyId={productCopyId} isScrollOver={isScrollOver} />);
}

export default CopyProduct;