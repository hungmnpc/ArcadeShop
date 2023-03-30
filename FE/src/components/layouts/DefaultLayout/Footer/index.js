import { faFacebookF, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { images } from '../../../../assets/images';
import Button from '../../../Button';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const mail = 'hungkaiken2@gmail.com';

const footer = [
    {
        title: 'Products',
        data: [
            {
                title: 'Games',
                to: '/games',
            },
            {
                title: 'Consoles',
                to: '/consoles',
            },
            {
                title: 'controllers',
                to: '/controllers',
            },
            {
                title: 'Accessories',
                to: '/accessories',
            },
        ],
    },
    {
        title: 'Store',
        data: [
            {
                title: 'Hà Nội, Việt Nam',
            },
            {
                title: 'Mon - Fri: 9am - 9pm',
            },
            {
                title: mail,
                href: `mailto:${mail}`,
            },
            {
                title: '123-456-7890',
            },
        ],
    },
    {
        title: 'Policy',
        data: [
            {
                title: 'Terms & Conditions',
                to: '/terms-and-conditions',
            },
            {
                title: 'Shipping Policy',
                to: '/shipping-policy',
            },
            {
                title: 'Refund Policy',
                to: '/refund-policy',
            },
            {
                title: 'Privacy Policy',
                to: '/privacy-policy',
            },
            {
                title: 'Cookie Policy',
                to: '/cookie-policy',
            },
            {
                title: 'FAQ',
                to: '/contact',
            },
        ],
    },
];

const methods = [
    {
        name: 'visa',
        image: images.visaImage,
    },
    {
        name: 'visa',
        image: images.visaImage,
    },
    {
        name: 'JCB',
        image: images.jcbImage,
    },
    {
        name: 'visa',
        image: images.visaImage,
    },
    {
        name: 'visa',
        image: images.visaImage,
    },
    {
        name: 'visa',
        image: images.visaImage,
    },
    {
        name: 'visa',
        image: images.visaImage,
    },
    {
        name: 'visa',
        image: images.visaImage,
    },
];

const communities = [
    {
        name: 'facebook',
        href: 'https://www.facebook.com/profile.php?id=100016046411034',
        icon: faFacebookF,
    },
    {
        name: 'instagram',
        href: 'https://www.instagram.com/gnuh_hnid/',
        icon: faInstagram,
    },
    {
        name: 'youtube',
        href: 'https://www.facebook.com/profile.php?id=100016046411034',
        icon: faYoutube,
    },
    {
        name: 'tiktok',
        href: 'https://www.facebook.com/profile.php?id=100016046411034',
        icon: faTiktok,
    },
];

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <div className={cx('col', 'logo')}>
                        <img src={images.logo.default} alt="logo" />
                        <h2 className={cx('name-web')}>ARCADE</h2>
                    </div>
                    <div className={cx('option')}>
                        {footer.map((itemParent, index) => (
                            <div className={cx('col', 'media-comp')} key={index}>
                                <h3 className={cx('title')}>{itemParent.title}</h3>
                                <div className={cx('items')}>
                                    {itemParent.data.map((itemChild, index) => {
                                        let Comp = 'p';
                                        const _props = {};
                                        if (itemChild.to) {
                                            Comp = Link;
                                            _props.to = itemChild.to;
                                        } else if (itemChild.href) {
                                            Comp = 'a';
                                            _props.href = itemChild.href;
                                        }

                                        return (
                                            <Comp {..._props} className={cx('item')} key={index}>
                                                {itemChild.title}
                                            </Comp>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('line')} />
                <div className={cx('bottom')}>
                    <div className={cx('payment-methods')}>
                        <h4 className={cx('title')}>Payment Methods</h4>
                        <div className={cx('methods')}>
                            {methods.map((method, index) => (
                                <div className={cx('image')} key={index}>
                                    <img src={method.image} alt={method.name} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('communities')}>
                        <h4 className={cx('title')}>Join the Community</h4>
                        <div className={cx('community-list')}>
                            {communities.map((item, index) => (
                                <Button
                                    href={item.href}
                                    className={cx('item-comm')}
                                    btn_icon
                                    icon={item.icon}
                                    key={index}
                                ></Button>
                            ))}
                        </div>
                    </div>
                </div>
                <p className={cx('dev')}>Developer: Hưng Đinh</p>
            </div>
        </div>
    );
}

export default Footer;
