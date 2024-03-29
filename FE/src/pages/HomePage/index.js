import classNames from 'classnames/bind';
import { images } from '../../assets/images';
import Banner from './components/Banner';
import CarouselProducts from './components/CarouselProducts';
import Coupon from './components/Coupon';
import OnSale from './components/OnSale';
import ShopByCategory from './components/ShopByCategory';
import styles from './Home.module.scss';
import { GAMEID, products, sales, soldHigh, trendingGames } from '../../fakeApi/index.js';
import NewSletter from './components/NewSletter';

const cx = classNames.bind(styles);


const bestSellers = {
    title: 'Best Sellers',
    viewAll: '/best_sellers',
};

const shopByCategory = [
    {
        category: 'Consoles',
        to: '/consoles',
        image: 'https://i.im.ge/2022/08/18/OsFkwr.consoles.png',
    },
    {
        category: 'Accessories',
        to: '/accessories',
        image: 'https://i.im.ge/2022/08/18/OsFpX0.accessories.png',
    },
    {
        category: 'Controllers',
        to: '/controllers',
        image: 'https://i.im.ge/2022/08/18/OsFzZW.controllers.png',
    },
];

const gears = {
    title: 'Upgrage your gear',
    viewAll: '/accessories',
};

const _trendingGames = {
    title: 'Trending games',
    viewAll: '/games',
};

function HomePage() {
    console.log();
    return (
        <div className={cx('home')}>
            <Banner />
            <CarouselProducts info={bestSellers} />
            <ShopByCategory data={shopByCategory} />
            <Coupon />
            <CarouselProducts info={gears} />
            <OnSale />
            <CarouselProducts info={_trendingGames}  />
            <NewSletter />
        </div>
    );
}

export default HomePage;
