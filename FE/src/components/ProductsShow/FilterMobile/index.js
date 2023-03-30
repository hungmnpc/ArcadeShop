import { faAngleLeft, faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import DoubleSlider from '../../DoubleSlider';
import ShowAndHide from '../../ShowAndHide';
import Filter from '../Filter';
import styles from './FilterMobile.module.scss';

const cx = classNames.bind(styles);

function FilterMobile({ collections, collection, valueMinMax, onMounted, onClose, addParams }) {
    return (
        <div className={cx('wrapper', [onMounted ? 'mounted' : 'unmounted'])}>
            <div onClick={onClose} className={cx('close')}>
                <FontAwesomeIcon className={cx('icon')} icon={!onMounted ? faAngleLeft : faAngleRight} />
            </div>
            <div className={cx('filter')}>
                <Filter
                    addParams={addParams}
                    collections={collections}
                    collection={collection}
                    valueMinMax={valueMinMax}
                />
            </div>
        </div>
    );
}

export default FilterMobile;
