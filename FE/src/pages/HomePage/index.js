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

const _products = products.map((product, index) => {
    const sale = sales.find((sale) => sale.id === product.id);

    return {
        ...product,
        // sale_price: sale ? (product.list_price * (100 - sale.sale_off_percent)) / 100 : ,

        sale_price: !!sale ? (product.list_price * (100 - sale.sale_off_percent)) / 100 : undefined,
    };
});

const bestSellers = {
    title: 'Best Sellers',
    products: _products.filter((product) => product.sold >= soldHigh),

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
    products: _products.filter((product) => product.typeId === 4),

    viewAll: '/gears',
};

const _trendingGames = {
    title: 'Trending games',
    products: _products.filter((product) => product.typeId === GAMEID && product.sold >= trendingGames).slice(0, 5),

    viewAll: '/games',
};

function HomePage() {
    console.log();
    return (
        <div className={cx('home')}>
            <Banner />
            <CarouselProducts data={bestSellers} />
            <ShopByCategory data={shopByCategory} />
            <Coupon />
            <CarouselProducts data={gears} />
            <OnSale />
            <CarouselProducts data={_trendingGames} />
            <NewSletter />
        </div>
    );
}

export default HomePage;
