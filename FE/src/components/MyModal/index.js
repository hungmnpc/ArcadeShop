import { Modal } from 'antd';
import FieldControl from '../FieldControl';
import './MyModal.scss';

function MyModal({children, ...prop}) {
    return (  
        <Modal
        {...prop}
      >
        {children}
      </Modal>
    );
}

export default MyModal;