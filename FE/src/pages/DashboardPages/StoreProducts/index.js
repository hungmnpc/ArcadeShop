import classNames from 'classnames/bind';
import style from './StoreProducts.module.scss';
import { faFilter, faMagnifyingGlass, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Space, Switch, Table } from 'antd';
import ViewSelect from './ViewSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { faClone } from '@fortawesome/free-regular-svg-icons';
import {images} from "../../../assets/images"
import { get } from '../../../utils/request';
import { Link } from 'react-router-dom';
import routes from "../../../configs/routes";
import { toast } from 'react-hot-toast';

const cx = classNames.bind(style);
const columns = [
    {
        title: ' ',
        dataIndex: 'image',
        key: 'image',
        width: 100,
        render: (_, record) => {
            return (<img className={cx('image')} src={ `data:image/png;base64, ${record.image}`} alt='logo' />)
        },
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'image',
        sorter: true
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type'
    },
    {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku'
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: true
    },
    {
        title: 'Inventory',
        dataIndex: 'inventory',
        key: 'inventory'
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Actions />
            </Space>
        ),
    },
];
const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        image: images.gameImage1,
        type: 'Physical',
        sku: '0001',
        price: 900 + i,
        inventory: 'In Stock'

    });
}

function StoreProducts() {
    const searchRef = useRef();
    const [focused, setFocused] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        toast("Hello")
        get("/api/v1/admin/products")
        .then((response) => {
            console.log(response)
            setProducts(response.products)
        })
        .catch(error =>  {
            console.log(error)
        })
    }, [])


    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <div className={cx('title')}>
                    <h2>
                        Products <span className={cx('number')}>{products.length}</span>
                    </h2>
                </div>
                <div className={cx('option')}>
                    <div className={cx('btn-add')}>
                        <Link to={'/dashboard' + routes.dashboardStoreProducts.newProduct}>
                            <Button type="primary" shape="round" icon={<PlusOutlined />} size='large'>
                                New Product
                            </Button>

                        </Link>
                    </div>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('options')}>
                    <ViewSelect />
                    <div className={cx('filter_search')}>
                        <div className={cx('filter')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faFilter} />
                            <span>Filter</span>
                        </div>
                        <div
                            className={cx('search', [focused ? 'focused' : ''])}
                            onClick={() => {
                                searchRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon className={cx('icon')} icon={faMagnifyingGlass} />
                            <input
                                ref={searchRef}
                                type="text"
                                name="productName"
                                id="productName"
                                placeholder="Search"
                                onFocus={() => {
                                    setFocused(true);
                                }}
                                onBlur={() => {
                                    setFocused(false);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Table rowSelection={rowSelection} sticky={true} columns={columns} dataSource={products.map((product, index) => {
                    return {
                        key: product.id,
                        name: product.name,
                        image: product.imageSet[0],
                        type: 'Physical',
                        sku: product.sku,
                        price: product.price,
                        inventory: product.inventoryStatus
                        
                    }
                })} />
            </div>
        </div>
    );
}

function Actions() {

    const [show, setShow] = useState(false);

    const handleShowClick = () => {
        setShow(!show);
    }

    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShow(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref])


    return (<div className={cx('actions')} ref={ref}>
        <div className={cx('btn')} onClick={handleShowClick}>
            <MoreOutlined />
        </div>
        <div className={cx('popup', [show ? 'show' : ''])}>
            <div className={cx('arrow')} />
            <div className={cx('content')}>
                <div className={cx('action')}>
                    <div className={cx('icon')}><FontAwesomeIcon icon={faPenToSquare} /></div>

                    <span>Edit</span>
                </div>
                <div className={cx('action')}>
                    <div className={cx('icon')}><FontAwesomeIcon icon={faClone} /></div>
                    <span>Duplicate</span>
                </div>
                <div className={cx('action')}>
                    <div className={cx('icon')}><FontAwesomeIcon icon={faTrash} /></div>
                    <span>Delete</span>
                </div>

            </div>


        </div>

    </div>);
}



export default StoreProducts;
