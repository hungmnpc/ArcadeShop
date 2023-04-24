import classNames from "classnames/bind";
import style from "./ModalAddProductInCategory.module.scss";
import MyModal from "../MyModal";
import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../CategoryDetailAdmin";
import { get } from "../../utils/request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { useDebounce } from "../../hooks";

const cx = classNames.bind(style);

function ModalAddProductInCategory({open, onOk, onCancel}) {

  const [categoryState, dispatch] = useContext(CategoryContext);
  
  const [productExclude, setProductExclude] = useState([]);

  const [productIdsChoosed, setProductIdsChoosed] = useState([]);

  const [productShow, setProductShow] = useState(productExclude);

  useEffect(() => {
    get(`/api/v1/admin/products?exclude_category=${categoryState.categoryName}`)
    .then(res => {
      setProductExclude(res.data.products);
      setProductShow(res.data.products)
    })  
    .catch(error => console.log(error))
  }, [categoryState.categoryName, categoryState.products])

  const [searchValue, setSearchValue] = useState('');

  const searchValueDebounce = useDebounce(searchValue, 200);

  useEffect(() => {
    setProductShow(productExclude.filter(product => product.name.includes(searchValueDebounce)))
  }, [searchValueDebounce])

  console.log(productIdsChoosed)

  const addProductsChoosed = (id) => {
    setProductIdsChoosed([...productIdsChoosed, id]);
  }

  const removeProductsChoosed = (id) => {
    setProductIdsChoosed(productIdsChoosed.filter(productId => productId !== id));
  }

  const onExit = () => {
    setProductIdsChoosed([]);
    onCancel();
  }

  const onOke = () => {
    setProductIdsChoosed([]);
    onOk(productIdsChoosed);
  }


    return ( <MyModal
        title="Add products to this category"
        centered
        open={open}
        onOk={onOke}
        onCancel={onExit}
        width={600}
        okText={"Add"}
      >
        <div className={cx('wrapper')}>
          <div className={cx('search')}>
            <label htmlFor="product_name"><FontAwesomeIcon className={cx('icon')} icon={faMagnifyingGlass} /></label>
            <input name="product_name" id="product_name" className="field-control" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products by name ..."
            />
          </div>
          <div className={cx('products')}>
            {
              productShow.map((product, index) => {
                return (
                  <ProductItem choosed={productIdsChoosed.includes(product.id)} product={product} key={index} handleAdd={addProductsChoosed} handlRemove={removeProductsChoosed} />
                )
              })
            }
          </div>
        </div>
      </MyModal> );
}

function ProductItem({product, handleAdd, handlRemove, choosed}) {
  const [isChoosed, setIsChoosed] = useState(choosed)

  useEffect(() => {
    if (choosed) {
      setIsChoosed(true);
    } else {
      setIsChoosed(false)
    }
  }, [choosed])

  useEffect(() => {
    if (isChoosed) {
      handleAdd(product.id)
    } else {
      handlRemove(product.id)
    }
  }, [isChoosed])
  return ( <div onClick={() => {
    setIsChoosed(!isChoosed)
  }} className={cx('product-wrapper')}>
    <div className={cx('image')}>
      <img src={`data:image/png;base64, ${product.imageSet[0].imageBase64}`} alt={product.name} />
    </div>
    <span>{product.name}</span>
    <div className={cx('checkbox')}>
      <FontAwesomeIcon className={cx('icon')}  icon={isChoosed ? faCheckCircle  : faCircle} />
    </div>
  </div> );
}


export default ModalAddProductInCategory;