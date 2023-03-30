/* eslint-disable use-isnan */
import classNames from "classnames/bind";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { changeDiscountMode, changeDiscountValue, changePrice, ProductContext } from "..";
import ToggleSwith from "../../ToggleSwitch";
import style from "./ProductPrice.module.scss";

const cx = classNames.bind(style);

function ProductPrice() {


    const [isSale, setIsSale] = useState(true);

    const [salePrice, setSalePrice] = useState(null)

    const [productState, dispatch] = useContext(ProductContext);


    const handleIsSale = () => {
        setIsSale(true);
    }

    const handleUnSale = () => {
        setIsSale(false);
    }

    useEffect(() => {
        if (productState.price != null) {
            if (productState.discountMode === 'PERCENT' ) {
                setSalePrice(parseFloat((( productState.price / 100 ) * (100 - productState.discountValue)).toFixed(2)))
            } else if (productState.discountMode === 'AMOUNT') {
                setSalePrice(productState.price - productState.discountValue)
            }

        }

    }, [productState.price, productState.discountValue, productState.discountMode])




    return ( <div className={cx('wrapper')}>
        <div className={cx('title')}>
            <span>Pricing</span>
        </div>
        <div className={cx('content')}>
           <div className={cx('price-row')}>
                <div className={cx('price', 'colspan-1')}>
                    <FieldPrice productInfo={productState}  numberOnly value={productState.price} onChange={(data) => {
                        dispatch(changePrice(data))
                    }} label="Price" name='price' type="normal" postfixs={[{value: 'amount', text: "₫", maxValue: 999999999, defaultChosse: true}]} />
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
                    <FieldPrice productInfo={productState} value={productState.discountValue} danger={salePrice < 0} onChange={(data) => {
                        dispatch(changeDiscountValue(data))
                    }}  label="Discount" onChangePostfix={(postfix) => {

                        dispatch(changeDiscountMode(postfix))
                    }} name='discount-mode' type="radio" postfixs={[{value: 'percent', text: "%", maxValue: 100, defaultChosse: productState.discountMode === 'PERCENT'}, {value: 'amount', text: "₫", maxValue: 999999999 ,defaultChosse: productState.discountMode === 'AMOUNT'}]}  />
                </div>
                <div className={cx('sale-price', 'colspan-1')}>
                    <FieldPrice productInfo={productState}  value={salePrice} onChange={(data) => {
                        setSalePrice(data)
                    } } label="Sale price" name='sale-price' type="normal" postfixs={[{value: 'amount', text: "₫", maxValue: 999999999, defaultChosse: true}]}/>
                </div>


            </div> 
            }

        </div>
    </div> );
}



function FieldPrice({name, danger=false, label, type, postfixs, value, onChange, onChangePostfix, productInfo }) {

    const [postfixValue, setPostfixValue] = useState(postfixs.find(postfix => postfix.defaultChosse))


    useEffect(() => {
        setPostfixValue(postfixs.find(postfix => postfix.defaultChosse))
    }, [productInfo.discountMode])

    const handleOnChangePostfix = (e) => {
        onChangePostfix(e.target.value.toUpperCase())
        setPostfixValue(postfixs.find(postfix => postfix.value === e.target.value))
    }




    const handleOnChange = (e) => {
        const regex = /^[0-9]*(\.[0-9]{0,2})?$/

        if (e.target.value !== '') {
            
            if (regex.test(e.target.value)){ 

                let inputValue = e.target.value;
                if (e.target.value.split('').pop() === '.') {
                    inputValue = e.target.value.slice(0, -1);
                }

                if (parseFloat(inputValue) <= postfixValue.maxValue) {
                    onChange((e.target.value))
                }

            } 
        } else {
            onChange('')
        }
    }



    return ( <div className={cx('price-field', type, [danger ? 'danger' : ''])}>
        <span className={cx('title-price')}>{label}</span>
        <div className={cx('input')}>
            <input value={value === null ? '' : value}  onChange={handleOnChange} style={{"--postfix-width" : `calc(36px * ${postfixs.length})` }} name={name} id={name} className={cx('field-input')} />
            {
                type === 'normal' &&
                postfixs.map((postfix, index) => (
                    <label key={index} htmlFor={name} className={cx('field-postfix')}>
            {postfix.text}
        </label>
                ))
            }
            {
                type === 'radio' &&
                postfixs.map((postfix, index) => {
                    let checked = postfix.value === postfixValue.value;
                    return (
                        <div key={index} id={name} className={cx('radio-postfix')}>
                            <input onChange={handleOnChangePostfix} className={cx('radio-postfix-input')} defaultChecked={checked} id={postfix.value} type='radio' name={name} value={postfix.value}/>
                            <label className={cx('radio-postfix-label')} htmlFor={postfix.value}>{postfix.text}</label>
                        </div>
                    )
                })
            }
            
        </div>
    </div> );
}





export default ProductPrice;