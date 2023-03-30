import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './ShowAndHide.module.scss';

const cx = classNames.bind(styles);

function ShowAndHide({ children, title, isOpen = false }) {
    const [isShow, setIsShow] = useState();

    const contentRef = useRef();
    useEffect(() => {
        setIsShow(isOpen);
    }, [contentRef]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')} onClick={() => setIsShow(!isShow)}>
                <p className={cx('title')}>{title}</p>
                <div className={cx('toggle-icon')}>
                    <FontAwesomeIcon className={cx('icon')} icon={isShow ? faMinus : faPlus} />
                </div>
            </div>
            <div
                className={cx('wrapper-content')}
                ref={contentRef}
                style={isShow ? { height: contentRef.current.scrollHeight + 'px' } : {}}
            >
                <div className={cx('content')}>{children} </div>
            </div>
        </div>
    );
}

export default ShowAndHide;
