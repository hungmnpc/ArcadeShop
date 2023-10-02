import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import CarouselItem from './CarouselItem';
import classNames from 'classnames/bind';
import styles from './CarouselProducts.module.scss';
import './CustomSlick.scss';
import Button from '../../../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { get } from '../../../../utils/request';

const cx = classNames.bind(styles);

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleRight} />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleLeft} />
        </div>
    );
}

function CarouselProducts({info}) {
    const [data , setData] = useState([])
    useEffect(() => {
        if (info.title === 'Best Sellers') {
            get("/api/v1/admin/products/best_seller")
            .then(response => {
                console.log(response)
                Aos.init();
                setData(response.data)
            })
            .catch(error => {
                console.error(error)
            })
        } else if (info.title === 'Upgrage your gear') {
            get("/api/v1/admin/products/upgrade_gear")
            .then(response => {
                console.log(response)
                Aos.init();
                setData(response.data)
            })
            .catch(error => {
                console.error(error)
            })
        } else if (info.title === 'Trending games') {
            get("/api/v1/admin/products/best_game")
            .then(response => {
                console.log(response)
                Aos.init();
                setData(response.data)
            })
            .catch(error => {
                console.error(error)
            })
        }
    }, []);

    console.log(data)
    const settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <SampleNextArrow className="slick-next" />,
        prevArrow: <SamplePrevArrow className="slick-prev" />,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,

                    autoplay: true,
                    autoplaySpeed: 2000,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                },
            },
        ],
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <div
                        data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="1500"
                        data-aos-anchor-placement="top-bottom"
                        className={cx('title')}
                    >
                        <h2>{info.title}</h2>
                    </div>
                    <div className={cx('btn')}>
                        <Button rounded={true} to={info.viewAll}>
                            View all
                        </Button>
                    </div>
                </div>
                <div className={cx('slider')}>
                    <Slider {...settings}>
                        {data.map((product, index) => (
                            <CarouselItem data={product} key={index} />
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default CarouselProducts;
