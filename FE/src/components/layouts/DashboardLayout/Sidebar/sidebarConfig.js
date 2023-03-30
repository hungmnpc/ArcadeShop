import { faDroplet, faPencil, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import routes from "../../../../configs/routes";

export const sidebar =  [
    {
        items: [
            {
                text: 'Home',
                to: '/dashboard'
            },
            
        ]
    },
    {
        items: [
            {
                text: 'Store Products',
                subs: [
                    {
                        text: 'Products',
                        to: '/dashboard' + routes.dashboardStoreProducts.products
                    },
                    {
                        text: 'Inventory',
                        to: '/dashboard' + routes.dashboardStoreProducts.inventory
                    },
                    {
                        text: 'Categories',
                        to: '/dashboard' + routes.dashboardStoreProducts.categories
                    }
                ]
            },
            {
                text: 'Orders',
                subs: [
                    {
                        text: 'Orders',
                        to: '/dashboard' + routes.dashboardOrders.orders
                    },
                    {
                        text: 'Abandoned Carts',
                        to: '/dashboard' + routes.dashboardOrders.abandonedCarts
                    },
                ]
            }
        ]
    },
    
]
