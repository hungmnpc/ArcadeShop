import classNames from "classnames/bind";
import { useState } from "react";
import ToggleSwith from "../../ToggleSwitch";
import style from "./ProductPrice.module.scss";

const cx = classNames.bind(style);

function ProductPrice() {


    const [isSale, setIsSale] = useState(true);

    const handleIsSale = () => {
        setIsSale(true);
    }

    const handleUnSale = () => {
        setIsSale(false);
    }


    return ( <div className={cx('wrapper')}>
        <div className={cx('title')}>
            <span>Pricing</span>
        </div>
        <div className={cx('content')}>
           <div className={cx('price-row')}>
                <div className={cx('price', 'colspan-1')}>
                    <FieldPrice label="Price" name='price' type="normal" postfixs={["₫"]} />
                </div>
            </div> 
            <div className={cx('price-row')}>
                <div className={cx('toggle-onsale', 'colspan-1')}>
                    <ToggleSwith handleChecked={handleIsSale} handleUnChecked={handleUnSale} defaultChecked={isSale} value='sale' />
                    <span className={cx('title-onsale')}>On sale</span>
                </div>
            </div>
            {
                isSale && 
            <div className={cx('price-row')}>
                
                <div className={cx('discount', 'colspan-1')}>
                    <FieldPrice  label="Discount" name='discount-mode' type="radio" postfixs={[{value: 'percent', text: "%"}, {value: 'amount', text: "₫"}]}  />
                </div>
                <div className={cx('sale-price', 'colspan-1')}>
                    <FieldPrice label="Sale price" name='sale-price' type="normal" postfixs={["₫"]}  />
                </div>


            </div> 
            }

        </div>
    </div> );
}



function FieldPrice({name, label, type, postfixs }) {
    return ( <div className={cx('price-field', type)}>
        <span className={cx('title-price')}>{label}</span>
        <div className={cx('input')}>
            <input style={{"--postfix-width" : `calc(36px * ${postfixs.length})` }} name={name} id={name} className={cx('field-input')} />
            {
                type === 'normal' &&
                postfixs.map((postfix, index) => (
                    <label key={index} htmlFor={name} className={cx('field-postfix')}>
            {postfix}
        </label>
                ))
            }
            {
                type === 'radio' &&
                postfixs.map((postfix, index) => {
                    return (
                        <div key={index} id={name} className={cx('radio-postfix')}>
                            <input className={cx('radio-postfix-input')} defaultChecked={index === 1} id={postfix.value} type='radio' name={name} value={postfix.value}/>
                            <label className={cx('radio-postfix-label')} htmlFor={postfix.value}>{postfix.text}</label>
                        </div>
                    )
                })
            }
            
        </div>
    </div> );
}





export default ProductPrice;