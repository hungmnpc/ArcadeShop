import classNames from "classnames/bind";
import style from "./Inventory.module.scss";
import FieldControl from "../../FieldControl";
import SelectControl from "../../SelectControl";
import { useContext } from "react";
import { changeInventoryStatus, changeQuantity, changeSku, ProductContext } from "..";

const cx = classNames.bind(style);

function Inventory() {

    const [productState, dispatch] = useContext(ProductContext)
    console.log(productState)

    return (<div className={cx('wrapper')}>
        <div className={cx('title')}>
            <span>Inventory and shipping</span>
        </div>
        <div className={cx('content')}>
            <SelectControl label='Status' value={productState.inventoryStatus} onChange={(data) => {
                dispatch(changeInventoryStatus(data))
                
            }} colspan="1" selectItems={[{value: 'In stock', text: 'In stock'}, {value: 'Out of stock', text: 'Out of stock'}]} />
            <FieldControl value={productState.sku} onChange={(data) => {
                dispatch(changeSku(data))
            }} label="SKU" type="text" colspan="1" required={true} name="sku" placeholder="" />
            <FieldControl value={productState.quantity} onChange={(data) => {
                dispatch(changeQuantity(data))
            }} label="Quantity" type="text" colspan="1" required={true} name="sku" placeholder="" />
        </div>
    </div>);
}

export default Inventory;