import MyModal from "../MyModal";
import SelectControl from "../SelectControl";

function ModalOrderChange( {open, onOk, onCancel, currentStatus, onChange}) {
    return ( <MyModal
		title="Update Order"
		centered
		open={open}
		onOk={onOk}
		onCancel={onCancel}
		width={400}
	>

        <SelectControl label='Status' value={currentStatus} onChange={(data) => {
                onChange(data)
            }} selectItems={[{value: 1, text: 'PROCESSING'}, {value: 2, text: 'SHIPPING'}, {value: 3, text: 'ACCOMPLISHED'}, {value: 4, text: 'CANCELLED'}]} />
    </MyModal> );
}

export default ModalOrderChange;