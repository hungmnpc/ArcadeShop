import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import styles from './LoginPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import * as request from '../../utils/request';
import { AuthContext } from '../../context/userContext';
import { rememberAccount, userLoginSuccess } from '../../store/actions/userActions';
import { AppContext } from '../../context/AppContext';

const cx = classNames.bind(styles);

function LoginPage() {
    const [appState, appDispatch] = useContext(AppContext);
    const [email, setEmail] = useState(appState.account.email);
    const [password, setPassword] = useState(appState.account.password);
    const [saveInfo, setSaveInfo] = useState(appState.isRemember);
    const [errMessage, setErrMessage] = useState('');
    const emailLabel = 'Email';
    const passwordLabel = 'Password';
    const navigate = useNavigate();

    const [userState, dispatch] = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.getItem('username') !== null) {
            return navigate('/');
        }
    });

    const handleOnChangeField = (e) => {
        const fieldName = e.target.name;

        if (fieldName === emailLabel) {
            setEmail(e.target.value);
        } else if (fieldName === passwordLabel) {
            setPassword(e.target.value);
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (email !== '' && password !== '') {
            var qs = require('qs');
            var data = qs.stringify({
                email: email,
                password: password,
            });
            var config = {
                method: 'post',
                url: 'http://localhost:8080/login',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: data,
            };

            axios(config)
                .then(function (response) {
                    const userData = response.data;

                    dispatch(userLoginSuccess(userData));
                    if (saveInfo) {
                        appDispatch(
                            rememberAccount({
                                email: email,
                                password: password,
                            }),
                        );
                    }
                    return navigate('/');
                })
                .catch(function (error) {
                    console.log(error);
                    setErrMessage(error.response.data);
                    refreshField();
                });
        }
    };

    const refreshField = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3>Login</h3>
                <form onSubmit={handleOnSubmit}>
                    <div className={cx('form-control')}>
                        <input
                            required
                            placeholder=" "
                            type="email"
                            onChange={handleOnChangeField}
                            id={emailLabel}
                            name={emailLabel}
                            value={email}
                            onFocus={() => {
                                setErrMessage('');
                            }}
                        />
                        <label htmlFor={emailLabel}>{emailLabel}</label>
                    </div>
                    <div className={cx('form-control')}>
                        <input
                            required
                            placeholder=" "
                            type="password"
                            onChange={handleOnChangeField}
                            id={passwordLabel}
                            name={passwordLabel}
                            value={password}
                            onFocus={() => {
                                setErrMessage('');
                            }}
                        />
                        <label htmlFor={passwordLabel}>{passwordLabel}</label>
                    </div>
                    <span className={cx('err-message')}>{errMessage}</span>
                    <div className={cx('help')}>
                        <div className={cx('save')}>
                            <FontAwesomeIcon
                                onClick={() => setSaveInfo(!saveInfo)}
                                className={cx('icon')}
                                icon={saveInfo ? faSquareCheck : faSquare}
                            />
                            <p>Remember me</p>
                        </div>
                        <div className={cx('forgot_password')}>
                            <Link to="/forgot_password">Forgot Password</Link>
                        </div>
                    </div>
                    <div className={cx('submit')}>
                        <Button
                            className={cx('btn')}
                            primary
                            rounded={true}
                            rightIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
