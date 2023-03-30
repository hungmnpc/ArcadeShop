import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryDetailAdmin from "../../../components/CategoryDetailAdmin";

function EditCategory({isScrollOver, ...prop}) {
    const params = useParams();
    
    const [id, setId] = useState();
    useEffect(() => {
        setId(params.id)
    }, [params.id])
    return ( id && <CategoryDetailAdmin categoryName={id} isScrollOver={isScrollOver} /> );
}

export default EditCategory;