import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetailAdmin from "../../../components/ProductDetailAdmin";


function EditProduct({isScrollOver, ...prop}) {
    const params = useParams();
    
    const [id, setId] = useState();
    useEffect(() => {
        setId(params.id)
    }, [params.id])
    return ( id && <ProductDetailAdmin id={id} isScrollOver={isScrollOver} /> );
}

export default EditProduct;