import { images } from '../assets/images';

export const CONSOLEID = 1;
export const GAMEID = 2;
export const CONTROLLERID = 3;
export const ACCESSORIESID = 4;
export const ONSALE = 5;
export const BESTSELLERS = 6;
export const ALL = 7;
export const PRICE_ASC_SORT = 'price_ascending';
export const PRICE_DES_SORT = 'price_descending';
export const NAME_ASC_SORT = 'name_ascending';
export const NAME_DES_SORT = 'name_descending';
export const NEWEST = 'newest';

export const optionsSort = [
    { value: NEWEST, label: 'Newest' },
    { value: PRICE_ASC_SORT, label: 'Price (low to hight)' },
    { value: PRICE_DES_SORT, label: 'Price (hight to low)' },
    { value: NAME_ASC_SORT, label: 'Name A-Z' },
    { value: NAME_DES_SORT, label: 'Name Z-A' },
];

export const Collection = [
    {
        text: 'All',
        value: 'all',
        id: ALL,
    },
    {
        text: 'Consoles',
        value: 'consoles',
        id: CONSOLEID,
    },
    {
        text: 'Games',
        value: 'games',
        id: GAMEID,
    },
    {
        text: 'Controllers',
        value: 'controllers',
        id: CONTROLLERID,
    },
    {
        text: 'Accessories',
        value: 'accessories',
        id: ACCESSORIESID,
    },
    {
        text: 'On Sale',
        value: 'on_sale',
        id: ONSALE,
    },
    {
        text: 'Best Sellers',
        value: 'best_sellers',
        id: BESTSELLERS,
    },
];

export const types = [
    {
        id: 1,
        type: 'console',
    },
    {
        id: 2,
        type: 'game',
    },
    {
        id: 3,
        type: 'controller',
    },
    {
        id: 4,
        type: 'accessories',
    },
];

export const products = [
    {
        id: 1,
        name: 'Gameflow',
        typeId: 1,
        list_price: 580,
        image: images.consoles.gameflow,
        sold: 20,
        total_in_stock: 100,
    },
    {
        id: 2,
        name: 'Gameflow Black',
        typeId: 1,
        list_price: 1000,
        image: images.consoles.gameflow_black,
        sold: 21,
        total_in_stock: 100,
    },
    {
        id: 3,
        name: 'Veritas VR Set',
        typeId: 1,
        list_price: 630,
        image: images.consoles.veritas_vr_set,
        sold: 20,
        total_in_stock: 100,
    },
    {
        id: 4,
        name: 'Playbox XZ',
        typeId: 1,
        list_price: 580,
        image: images.consoles.playbox_xz,
        sold: 20,
        total_in_stock: 100,
    },
    {
        id: 5,
        name: 'Playbox XZ Gold Edition',
        typeId: 1,
        list_price: 1000,
        image: images.consoles.playbox_xz_gold,
        sold: 20,
        total_in_stock: 100,
    },
    {
        id: 6,
        name: 'Wave Gen RX',
        typeId: 1,
        list_price: 580,
        image: images.consoles.wave_gen_rx,
        sold: 38,
        total_in_stock: 100,
    },
    {
        id: 7,
        name: 'Cyber Kid Infinite',
        typeId: 2,
        list_price: 40,
        image: images.games.cyber_kid_infinite,
        sold: 19,
        total_in_stock: 100,
    },
    {
        id: 8,
        name: 'Chronosplit',
        typeId: 2,
        list_price: 40,
        image: images.games.chronosplit,
        sold: 35,
        total_in_stock: 100,
    },
    {
        id: 9,
        name: 'Ice Dome: Exile',
        typeId: 2,
        list_price: 40,
        image: images.games.ice_dome_exile,
        sold: 20,
        total_in_stock: 100,
    },
    {
        id: 10,
        name: 'Ancient Souls',
        typeId: 2,
        list_price: 40,
        image: images.games.ancient_souls,
        sold: 20,
        total_in_stock: 100,
    },
    {
        id: 11,
        name: 'Kira and the Fading Islands',
        typeId: 2,
        list_price: 40,
        image: images.games.kira_and_the_fading_islands,
        sold: 20,
        total_in_stock: 100,
    },
    {
        id: 12,
        name: 'Dead at Last',
        typeId: 2,
        list_price: 40,
        image: images.games.dead_at_last,
        sold: 25,
        total_in_stock: 100,
    },
    {
        id: 13,
        name: 'Wave',
        typeId: 3,
        list_price: 30,
        image: images.controllers.wave,
        sold: 20,
        total_in_stock: 100,
    },
    {
        id: 14,
        name: 'Stealth X',
        typeId: 3,
        list_price: 30,
        image: images.controllers.stealth_x,
        sold: 30,
        total_in_stock: 100,
    },
    {
        id: 15,
        name: 'Libra 2.0',
        typeId: 3,
        list_price: 30,
        image: images.controllers.libra2,
        sold: 20,
        total_in_stock: 100,
    },
    {
        id: 16,
        name: 'Flint',
        typeId: 3,
        list_price: 30,
        image: images.controllers.flint,
        sold: 20,
        total_in_stock: 100,
    },
    {
        id: 17,
        name: 'Raptor',
        typeId: 3,
        list_price: 30,
        image: images.controllers.raptor,
        sold: 20,
        total_in_stock: 100,
    },
    {
        id: 18,
        name: 'Ghost',
        typeId: 3,
        list_price: 30,
        image: images.controllers.ghost,
        sold: 50,
        total_in_stock: 100,
    },
    {
        id: 19,
        name: 'L503 Headset',
        typeId: 4,
        list_price: 30,
        image: images.accessories.l503_headset,
        sold: 49,
        total_in_stock: 100,
    },
    {
        id: 20,
        name: 'Echo Headset',
        typeId: 4,
        list_price: 40,
        image: images.accessories.echo_headset,
        sold: 20,
        total_in_stock: 100,
    },
    {
        id: 21,
        name: 'Impact Gaming Chair',
        typeId: 4,
        list_price: 160,
        image: images.accessories.impact_gaming_chair,
        sold: 20,
        total_in_stock: 100,
    },
    {
        id: 22,
        name: 'Mach Gaming Chair',
        typeId: 4,
        list_price: 130,
        image: images.accessories.mach_gaming_chair,
        sold: 33,
        total_in_stock: 100,
    },
    {
        id: 23,
        name: 'X-2 Wireless Mouse',
        typeId: 4,
        list_price: 25,
        image: images.accessories.x2_wireless_mouse,
        sold: 20,
        total_in_stock: 100,
    },
    {
        id: 24,
        name: 'Blaze Wireless Mouse',
        typeId: 4,
        list_price: 25,
        image: images.accessories.blaze_wireless_mouse,
        sold: 12,
        total_in_stock: 100,
    },
    {
        id: 25,
        name: 'Spartan Mechanical Keyboard',
        typeId: 4,
        list_price: 45,
        image: images.accessories.spartan_mechanical_keyboard,
        sold: 23,
        total_in_stock: 100,
    },
    {
        id: 26,
        name: 'CO-21 Mechanical Keyboard',
        typeId: 4,
        list_price: 45,
        image: images.accessories.co21_mechanical_keyboard,
        sold: 40,
        total_in_stock: 100,
    },
];

export const sales = [
    {
        id: 1,
        sale_off_percent: 20,
    },
    {
        id: 5,
        sale_off_percent: 50,
    },
    {
        id: 3,
        sale_off_percent: 20,
    },
    {
        id: 7,
        sale_off_percent: 20,
    },
    {
        id: 2,
        sale_off_percent: 20,
    },
    {
        id: 9,
        sale_off_percent: 20,
    },
    {
        id: 19,
        sale_off_percent: 20,
    },
    {
        id: 21,
        sale_off_percent: 20,
    },
];

export const sort = products.sort((a, b) => b.sold - a.sold);
export const soldHigh = sort[9].sold;

export const onSale = sales.map((sale, index) => {
    const _product = products.find((product) => product.id === sale.id);
    return {
        ..._product,
        sale_price: !!_product ? (_product.list_price * (100 - sale.sale_off_percent)) / 100 : undefined,
    };
});

export const allProduct = products.map((product, index) => {
    const sale = sales.find((sale) => sale.id === product.id);

    return {
        ...product,

        sale_price: !!sale ? (product.list_price * (100 - sale.sale_off_percent)) / 100 : undefined,
    };
});

export const trendingGames = sort.filter((product) => product.typeId === GAMEID)[4].sold;

// export const bestSellers = products.filter((product) => product.sold >= soldHigh);
