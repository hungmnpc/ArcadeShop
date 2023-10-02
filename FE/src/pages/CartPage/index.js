import classNames from "classnames/bind";
import style from "./CartPage.module.scss";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "../../hooks";
import { addNewProductToCart, createOrder } from "../../utils/request";
import { addCart, emptyCart } from "../../store/actions/userActions";
import { toast } from "react-hot-toast";

const cx = classNames.bind(style);

function CartPage() {

    const [cartState, dispatch] = useContext(CartContext);
    console.log(cartState)

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const subTotalUpdate = cartState.cart.reduce(
            (pre, current) => pre + (current.price * (100 - current.discountValue) / 100 ) * current.quantity,
            0,
        );

        setTotal(subTotalUpdate);

    },[cartState.cart]) 

    const handleOrder = () => {
        const cartIds = cartState.cart.map(cart => cart.cartId)
        console.log(cartIds);
        toast.promise(createOrder(cartIds), {
            loading: "Waitting....",
            success: "Create order successful",
            error: "Some thing wrong try again",
        }).then(response => {
            console.log(response)
            dispatch(emptyCart())
        }).catch(error => {
            console.error(error)
        })
    }


    return ( <div className={cx('wrapper')}>
        <div className={cx('col-1')}>
            <div className={cx('my-cart')}>
                <div className={cx('title')}>
                    <span>My cart</span>
                </div>
                {
                    cartState.cart.map((cart, index) => (
                        <CartProductItem key={index} cart = {cart} />
                    ))
                }
                
            </div>

        </div>
        <div className={cx('col-2')}>
            <div className={cx('summary')}>
                <span className={cx('title')}>
                    Order summary
                </span>
                <div className={cx('infos')}>
                    <div className={cx('info')}>
                        <span className={cx('key')}>Subtotal</span>
                        <span className={cx('value')}>{total}₫</span>
                    </div>
                    <div className={cx('info')}>
                        <span className={cx('key')}>Shipping</span>
                        <span className={cx('value')}>FREE</span>
                    </div>
                </div>
            </div>
            <div className={cx('total')}>
                <span className={cx('key')}>Total</span>
                <span className={cx('value')}>{total}₫</span>
            </div>
            <button onClick={handleOrder} className={cx('order')}>
                Order
            </button>
        </div>
    </div> );
}


function CartProductItem({cart}) {

    const [cartState, dispatch] = useContext(CartContext);

    const [quantity, setQuantity] = useState(cart.quantity);

    const quantityDebounce = useDebounce(quantity, 500);

    useEffect(() => {
        if (quantityDebounce != cart.quantity) {
            addNewProductToCart(cart.id, quantityDebounce - cart.quantity)
                        .then(response => {
                            console.log(response.data.id);
                            dispatch(addCart(cart, quantityDebounce - cart.quantity, response.data.id));
                        })
                        .catch(error => {console.error(error)
                            setQuantity(cart.quantity)
                        })
        }
    }, [quantityDebounce]);

    useEffect(() => {
        setQuantity(cart.quantity);
    }, [cart.quantity])

    

    return ( <div className={cx('product')}>
        <div className={cx('image')}>
            <img src={`data:image/jpeg;base64,${cart.imageSet[0].imageBase64}`} alt={cart.name} />
        </div>
        <div className={cx('product-info')}>
            <span className={cx('name')}>{cart.name}</span>
            <div className={cx('price')}>{cart.discountValue > 0 && (<span className={cx('sale')}>{cart.price}₫</span>)}<span>{cart.price * (100 - cart.discountValue) / 100}₫</span></div>
        </div>

        <div className={cx('quantity')}>
                    <input
                        id="quantityInput"
                        value={quantity}
                        onChange={(e) => {
                            const quantity = e.target.value;
                            if (quantity >= 1 && quantity <= 9999) {
                                setQuantity(quantity);
                            } else if (quantity < 1) {
                                setQuantity(1);
                            }
                        }}
                        type="number"
                        min="1"
                        max="9999"
                    />
                    <div className={cx('spin')}>
                        <div
                            className={cx('sub', 'change')}
                            onClick={() => {
                                const changeQuantity = quantity - 1 < 1 ? 1 : quantity - 1;
                                setQuantity(changeQuantity);
                            }}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </div>
                        <div
                            className={cx('add', 'change')}
                            onClick={() => {
                                const changeQuantity = quantity + 1 > 9999 ? 9999 : quantity + 1;
                                setQuantity(changeQuantity);
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                </div>
        <div className={cx('total_price')}>
            <span>{(cart.price * (100 - cart.discountValue) / 100) * cart.quantity}₫</span>
        </div>
        <div className={cx('remove')}>
            <FontAwesomeIcon icon={faXmark} className={cx('icon')} />
        </div>
    </div> );
}


export default CartPage;