const routes = {
    root: '/',
    onSale: '/on_sale',
    products: '/products',
    product_page: '/product_page/:id',
    games_page: '/games',
    best_sellers_page: '/best_sellers',
    consoles_page: '/consoles',
    controllers_page: '/controllers',
    accessories_page: '/accessories',
    cart_page: '/carts',
    contact_page: '/contact',
    crud: '/crud',
    crud_page: '/crud/:entity',
    login_page: '/login',
    dashboard: '/dashboard/*',
    dashboardStoreProducts: {
        products: '/store-products/products',
        newProduct: '/store-products/products/new-product',
        editProduct: '/store-products/products/:id',
        copyProduct: '/store-products/products/copy-product',
        inventory: '/store-products/inventory',
        categories: '/store-products/categories',
        editCategory: '/store-products/categories/:id',
    },
    dashboardOrders: {
        orders: '/orders',
        abandonedCarts: '/orders/abandoned-carts'
    },
    
    no_match: '*',
};

export default routes;
