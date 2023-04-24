import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useContext, useState } from "react";
import { CategoryContext, addProduct, changeProducts, removeProduct } from "..";
import style from "./ProductList.module.scss";
import { Link } from "react-router-dom";
import routes from "../../../configs/routes";
import { toast } from "react-hot-toast";
import { addProductToCategory, get, removeProductFromCategory } from "../../../utils/request";
import ModalAddProductInCategory from "../../ModalAddProductInCategory";

const cx = classNames.bind(style);

function ProductList() {

    const [categoryState, dispatch] = useContext(CategoryContext);

    const [isOpenModalAddProduct, setIsOpenModalAddProduct] = useState(false);


    const handleCloseModal = () => {
        setIsOpenModalAddProduct(false);
    }

    const handleOpenModal = () => {
        setIsOpenModalAddProduct(true);
    }

    

    const handleAddProductToCategory = (productIDs) => {
        toast.promise(addProductToCategory(categoryState.categoryName, productIDs), {
            loading: 'Waiting....',
            success: 'Success!',
            error: 'Error! Try again!'
        }).then(res => {
            setIsOpenModalAddProduct(false);
            dispatch(changeProducts(res.data.products))
        })
        .catch(error => console.log(error))
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span className={cx('title-span')}>Products in category <span className={cx('quantity')}>{categoryState.products.length}</span></span>
                {
                    categoryState.products.length !== 0 && categoryState.categoryName !== 'All' &&
                    <span onClick={() => {
                        handleOpenModal()
                    }} className={cx('add-product')}><FontAwesomeIcon icon={faPlus} className={cx('icon')} /> Add Products</span>

                }
            </div>
            <div className={cx('contents')}>
                {
                    categoryState.products.length > 0 ?
                    categoryState.products.sort((a, b) => a.id - b.id).map((product, index) => {
                        return <ProductItem canRemove={categoryState.id !== 'ALL'} product={product} index={index + 1} key={index} />
                    })
                    : (
                        <div className={cx('emty-list')}>
                            <span className={cx('header')}>Start adding products to your category</span>
                            <span className={cx('sub-header')}>Create a new category to display on your site.</span>
                            <button onClick={handleOpenModal} className={cx('btn-add')}><FontAwesomeIcon icon={faPlus} className={cx('icon')} /> Add Products</button>
                        </div>
                    )
                }
            </div>

            <ModalAddProductInCategory onCancel={handleCloseModal} onOk={handleAddProductToCategory} open={isOpenModalAddProduct} />
        </div>);
}

function ProductItem({product, canRemove, index}) {

    const [categoryState, dispatch] = useContext(CategoryContext);

    const handleRemoveProduct = () => {
        toast.promise(removeProductFromCategory(categoryState.categoryName, product.id), {
            loading: 'Waiting.....',
            success: 'Success!',
            error: 'Something wrong. F5 to refresh page'
        }).then((res) => {
            dispatch(removeProduct(product.id));
        }).catch(error => console.log(error))
    }
    return ( <div className={cx('product-pack')}>
        <span className={cx('index')}>{index}</span>
        <div onClick={handleRemoveProduct} className={cx('delete-button', [canRemove ? '' : 'hide'])}>
            <FontAwesomeIcon icon={faXmark} className={cx('icon-delete')} />
        </div>
        <img src={`data:image/png;base64, ${product.imageSet[0].imageBase64}`} alt={product.name} />
        <div className={cx('product-bottom')}>
        <span className={cx('product-name')}><Link to={`/dashboard/store-products/products/${product.id}`}>{product.name}</Link></span>
        </div>
        <div className={cx('shadown')} />
    </div> );
}


export default ProductList;