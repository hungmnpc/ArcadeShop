import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerCreate from '../Create/Customer';
import styles from './CRUDPage.module.scss';

const cx = classNames.bind(styles);

function CRUDPage() {
    const param = useParams();
    const [entity, setEntity] = useState();
    const [component, setComponent] = useState();

    useEffect(() => {
        setEntity(param.entity);
    }, [param.entity]);

    useEffect(() => {
        switch (entity) {
            case 'customers':
                setComponent(<CustomerCreate />);
                break;

            default:
                break;
        }
    }, [entity]);

    return <div className={cx('wrapper')}>{component}</div>;
}

export default CRUDPage;
