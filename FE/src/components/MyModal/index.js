import { Modal } from 'antd';
import FieldControl from '../FieldControl';
import './MyModal.scss';

function MyModal({children, okText= "OK", cancelText="Cancel", ...prop}) {

    return (  
        <Modal
        {...prop}
        className={prop.danger ? "danger" : ""}

        okText={okText}
        cancelText={cancelText}

      >
        {children}
      </Modal>
    );
}

export default MyModal;