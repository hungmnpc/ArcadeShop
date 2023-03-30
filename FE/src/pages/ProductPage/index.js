import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import ShowAndHide from '../../components/ShowAndHide';
import routes from '../../configs/routes';
import { getProductById } from '../../services/ProductService';
import { CartContext } from '../../context/CartContext';

import styles from './ProductPage.module.scss';
import { addCart } from '../../store/actions/userActions';

const cx = classNames.bind(styles);

const detail = [
    {
        title: 'Product Info',
        content:
            "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty.",
    },
    {
        title: 'Return and Refund Policy',
        content:
            "I'm a Return and Refund policy. I'm a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
    },
    {
        title: 'Shipping Info',
        content:
            "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
    },
];

function ProductPage({ id }) {
    let params = useParams();
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [cartState, dispatch] = useContext(CartContext);

    useEffect(() => {
        setProduct(getProductById(Number(params.id)));
    }, [params.id]);

    useEffect(() => {
        if (!!!quantity) {
            setQuantity(1);
        }
    }, [quantity]);

    const handleAddProductToCart = () => {
        dispatch(addCart(product, quantity));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <div className={cx('navigation')}>
                        <p>
                            <Link to={routes.root}>Home</Link>
                            <span> / </span>
                            <Link to={routes.products}>Products</Link>
                            {product && (
                                <>
                                    <span> / </span>
                                    <span className={cx('disable')}>{product.name}</span>
                                </>
                            )}
                        </p>
                    </div>
                    <div className="prev_next">Prev Next</div>
                </div>
                {product && (
                    <div className={cx('content')}>
                        <div className={cx('image_description')}>
                            <div className={cx('image')}>
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className={cx('description')}>
                                <p>
                                    I'm a product description. This is a great place to "sell" your product and grab
                                    buyers' attention. Describe your product clearly and concisely. Use unique keywords.
                                    Write your own description instead of using manufacturers' copy.
                                </p>
                            </div>
                        </div>
                        <div className={cx('product-detail')}>
                            <h2 className={cx('product-name')}>{product.name}</h2>
                            <p className={cx('sku')}>SKU: 0003</p>
                            <div className={cx('price')}>
                                <p className={cx([product.sale_price ? 'sale' : ''])}>
                                    &nbsp;{product.list_price}$&nbsp;
                                </p>
                                {product.sale_price && <p>{product.sale_price}$</p>}
                            </div>
                            <div className={cx('quantity')}>
                                <label htmlFor="quantityInput">
                                    <h3>Quantity</h3>
                                </label>
                                <input
                                    id="quantityInput"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    type="number"
                                    min="1"
                                    max="999"
                                />
                                <div className={cx('spinner-arrows')}>
                                    <span className={cx('spinner')}>
                                        <FontAwesomeIcon
                                            icon={faAngleUp}
                                            onClick={() => setQuantity((prev) => (prev + 1 <= 999 ? prev + 1 : prev))}
                                        />
                                    </span>
                                    <span className={cx('spinner')}>
                                        <FontAwesomeIcon
                                            icon={faAngleDown}
                                            onClick={() => setQuantity((prev) => (prev - 1 >= 1 ? prev - 1 : prev))}
                                        />
                                    </span>
                                </div>
                            </div>

                            <Button
                                className={cx('btn-add')}
                                rounded={true}
                                primary
                                w50
                                onClick={handleAddProductToCart}
                            >
                                Add to Cart
                            </Button>
                            <div className={cx('detail')}>
                                {detail.map((detail, index) => (
                                    <ShowAndHide key={index} title={detail.title}>
                                        <p>{detail.content} </p>
                                    </ShowAndHide>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductPage;
