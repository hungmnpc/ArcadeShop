import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '../Button';
import styles from './FormEmail.module.scss';

const cx = classNames.bind(styles);

function FormEmail() {
    const [email, setEmail] = useState('');

    const [isFocus, setIsFocus] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={cx('wrapper')}>
            <form>
                <label className={cx('label')} htmlFor="email">
                    Email*
                </label>
                <input
                    onFocus={() => {
                        setIsFocus(true);
                    }}
                    className={cx('field', [isFocus && email === '' ? 'emty' : ''])}
                    required="required"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={handleSubmit} submit>
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default FormEmail;
