import classNames from "classnames/bind";
import style from "./Inventory.module.scss";
import FieldControl from "../../FieldControl";
import SelectControl from "../../SelectControl";

const cx = classNames.bind(style);

function Inventory({ value, setValue }) {
    return (<div className={cx('wrapper')}>
        <div className={cx('title')}>
            <span>Inventory and shipping</span>
        </div>
        <div className={cx('content')}>
            <SelectControl label='Status' value={value.inventoryStatus} onChange={(data) => {
                setValue({
                    ...value,
                    inventoryStatus: data
                })
                
            }} colspan="1" selectItems={[{value: 'In stock', text: 'In stock'}, {value: 'Out of stock', text: 'Out of stock'}]} />
            <FieldControl value={value.sku} onChange={(data) => {
                setValue({
                    ...value,
                    sku: data
                })
            }} label="SKU" type="text" colspan="1" required={true} name="sku" placeholder="" />
        </div>
    </div>);
}

export default Inventory;