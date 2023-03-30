import {
    ACCESSORIESID,
    ALL,
    allProduct,
    BESTSELLERS,
    Collection,
    CONSOLEID,
    CONTROLLERID,
    GAMEID,
    NAME_ASC_SORT,
    NAME_DES_SORT,
    ONSALE,
    PRICE_ASC_SORT,
    PRICE_DES_SORT,
    soldHigh,
} from '../fakeApi';

export const getProductsByType = (list, collection = 'all') => {
    let result;

    switch (collection) {
        case Collection.find((collection) => collection.id === CONSOLEID).value:
            result = list.slice(0).filter((product) => product.typeId === CONSOLEID);

            break;
        case Collection.find((collection) => collection.id === ALL).value:
            result = list;

            break;
        case Collection.find((collection) => collection.id === CONTROLLERID).value:
            result = list.slice(0).filter((product) => product.typeId === CONTROLLERID);

            break;
        case Collection.find((collection) => collection.id === GAMEID).value:
            result = list.slice(0).filter((product) => product.typeId === GAMEID);

            break;
        case Collection.find((collection) => collection.id === ACCESSORIESID).value:
            result = list.slice(0).filter((product) => product.typeId === ACCESSORIESID);

            break;
        case Collection.find((collection) => collection.id === ONSALE).value:
            result = list.slice(0).filter((product) => product.sale_price !== undefined);

            break;
        case Collection.find((collection) => collection.id === BESTSELLERS).value:
            result = list.slice(0).filter((product) => product.sold >= soldHigh);
            if (result.length >= 6) {
                result = result.slice(0, 6);
            }

            break;
        default:
            result = list;
    }

    return result;
};

export const sortProducts = (list, type) => {
    let result;
    switch (type) {
        case PRICE_ASC_SORT:
            result = list
                .slice(0)
                .sort(
                    (a, b) =>
                        (a.sale_price ? a.sale_price : a.list_price) - (b.sale_price ? b.sale_price : b.list_price),
                );
            break;
        case PRICE_DES_SORT:
            result = list
                .slice(0)
                .sort(
                    (b, a) =>
                        (a.sale_price ? a.sale_price : a.list_price) - (b.sale_price ? b.sale_price : b.list_price),
                );
            break;
        case NAME_ASC_SORT:
            result = list.slice(0).sort((a, b) => +(a.name > b.name) || -(a.name < b.name));
            break;
        case NAME_DES_SORT:
            result = list.slice(0).sort((b, a) => +(a.name > b.name) || -(a.name < b.name));
            break;
        default:
            result = list;
    }

    return result;
};

export const getProductById = (id) => {
    return allProduct.find((product) => product.id === id);
};
