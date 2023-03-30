import classNames from 'classnames/bind';
import styles from './ContactPage.module.scss';

const cx = classNames.bind(styles);

function ContactPage({ title }) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
        </div>
    );
}

export default ContactPage;
