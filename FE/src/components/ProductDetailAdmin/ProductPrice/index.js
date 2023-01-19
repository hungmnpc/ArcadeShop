/* eslint-disable use-isnan */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ToggleSwith from "../../ToggleSwitch";
import style from "./ProductPrice.module.scss";

const cx = classNames.bind(style);

function ProductPrice({value, setValue}) {


    const [isSale, setIsSale] = useState(true);

    const [salePrice, setSalePrice] = useState(null)


    const handleIsSale = () => {
        setIsSale(true);
    }

    const handleUnSale = () => {
        setIsSale(false);
    }

    useEffect(() => {
        if (value.price != null) {
            if (value.discountMode === 'PERCENT' ) {
                setSalePrice(parseFloat((( value.price / 100 ) * (100 - value.discountValue)).toFixed(2)))
            } else if (value.discountMode === 'AMOUNT') {
                setSalePrice(value.price - value.discountValue)
            }

        }

    }, [value.price, value.discountValue])
    useEffect(() => {
        setValue({
            ...value,
            discountValue: 0
        })
        
    }, [value.discountMode])

    useEffect(() => {
        if (!isSale) {
            setValue({
                ...value,
                discountValue: 0
            })
        }
    }, [isSale])


    return ( <div className={cx('wrapper')}>
        <div className={cx('title')}>
            <span>Pricing</span>
        </div>
        <div className={cx('content')}>
           <div className={cx('price-row')}>
                <div className={cx('price', 'colspan-1')}>
                    <FieldPrice numberOnly value={value.price} onChange={(data) => {
                        setValue({
                            ...value,
                            price: data
                        })
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
                    <FieldPrice value={value.discountValue} danger={salePrice < 0} onChange={(data) => {
                        setValue({
                            ...value,
                            discountValue: data
                        })
                    }}  label="Discount" onChangePostfix={(postfix) => {
                        setValue({
                            ...value,
                            discountMode: postfix
                        })
                    }} name='discount-mode' type="radio" postfixs={[{value: 'percent', text: "%", maxValue: 100, defaultChosse: value.discountMode === 'PERCENT'}, {value: 'amount', text: "₫", maxValue: 999999999 ,defaultChosse: value.discountMode === 'AMOUNT'}]}  />
                </div>
                <div className={cx('sale-price', 'colspan-1')}>
                    <FieldPrice value={salePrice} onChange={(data) => {
                        setSalePrice(data)
                    } } label="Sale price" name='sale-price' type="normal" postfixs={[{value: 'amount', text: "₫", maxValue: 999999999, defaultChosse: true}]}/>
                </div>


            </div> 
            }

        </div>
    </div> );
}



function FieldPrice({name, danger=false, label, type, postfixs, value, onChange, onChangePostfix }) {

    console.log(danger)

    const [postfixValue, setPostfixValue] = useState(postfixs.find(postfix => postfix.defaultChosse))




    const handleOnChangePostfix = (e) => {
        onChangePostfix(e.target.value.toUpperCase())
        setPostfixValue(postfixs.find(postfix => postfix.value === e.target.value))
    }



    const handleOnChange = (e) => {
        const regex = /^[0-9]*(\.[0-9]{0,2})?$/
        console.log(regex.test(e.target.value))

        if (e.target.value !== '') {
            
            if (regex.test(e.target.value)){ 

                let inputValue = e.target.value;
                if (e.target.value.split('').pop() === '.') {
                    console.log('oke')
                    inputValue = e.target.value.slice(0, -1);
                }

                console.log(inputValue)
                if (parseFloat(inputValue) <= postfixValue.maxValue) {
                    console.log(parseFloat(e.target.value))
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
                    return (
                        <div key={index} id={name} className={cx('radio-postfix')}>
                            <input onChange={handleOnChangePostfix} className={cx('radio-postfix-input')} defaultChecked={postfix.value === postfixValue.value} id={postfix.value} type='radio' name={name} value={postfix.value}/>
                            <label className={cx('radio-postfix-label')} htmlFor={postfix.value}>{postfix.text}</label>
                        </div>
                    )
                })
            }
            
        </div>
    </div> );
}





export default ProductPrice;