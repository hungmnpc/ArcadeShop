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
import { images } from "../../../assets/images"
import { deleteProduct, get } from '../../../utils/request';
import { Link, useNavigate } from 'react-router-dom';
import routes from "../../../configs/routes";
import { toast } from 'react-hot-toast';
import ModalDelete from '../../../components/ModalDelete';

const cx = classNames.bind(style);
const columns = [
    {
        title: ' ',
        dataIndex: 'image',
        key: 'image',
        width: 100,
        render: (_, record) => {
            return (<img className={cx('image')} src={record.image ? `data:image/png;base64, ${record.image.imageBase64}` : ''} alt='logo' />)
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
                <Actions id={record.key} />
            </Space>
        ),
    },
];


function StoreProducts() {
    const searchRef = useRef();
    const [focused, setFocused] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        get("/api/v1/admin/products")
            .then((response) => {
                setProducts(response.data.products)
            })
            .catch(error => {
                console.log(error.response)
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
                <Table onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            return navigate(`/dashboard/store-products/products/${record.key}`)
                        }, // click row
                    };
                }} rowSelection={rowSelection} sticky={true} columns={columns} dataSource={products.map((product, index) => {
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

function Actions({ id }) {

    const [show, setShow] = useState(false);

    const handleShowClick = (e) => {
        e.stopPropagation();
        setShow(!show);
    }

    const navigate = useNavigate();

    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);


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

    const closeModalDelete = (e) => {
        e.stopPropagation();
        setIsOpenModalDelete(false);
    }

    const openModalDelete = (e) => {
        setIsOpenModalDelete(true)
    }

    const handleDeleteProduct = (e) => {
        
        toast.promise(deleteProduct(id), {
            loading: 'Deleting.....',
            success: 'Deleting successfull!',
            error: "Error. Try again!"
        }).then(response => {
            e.stopPropagation();
            return navigate("/dashboard")
        }).catch(error => {
            e.stopPropagation();
            console.log(error)
        })
    }


    return (<div className={cx('actions')} ref={ref}>
        <div className={cx('btn')} onClick={handleShowClick}>
            <MoreOutlined />
        </div>
        <div className={cx('popup', [show ? 'show' : ''])}>
            <div className={cx('arrow')} />
            <div className={cx('content')}>
                <div onClick={(e) => {
                    e.stopPropagation();
                    return navigate(`/dashboard/store-products/products/${id}`)
                }} className={cx('action')}>
                    <div className={cx('icon')}><FontAwesomeIcon icon={faPenToSquare} /></div>

                    <span>Edit</span>
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    return navigate(`/dashboard/store-products/products/copy-product?product_id=${id}`)
                }} className={cx('action')}>
                    <div className={cx('icon')}><FontAwesomeIcon icon={faClone} /></div>
                    <span>Duplicate</span>
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    openModalDelete()
                }} className={cx('action')}>
                    <div className={cx('icon')}><FontAwesomeIcon icon={faTrash} /></div>
                    <span>Delete</span>
                </div>

            </div>
            <ModalDelete onCancel={closeModalDelete} onOk={handleDeleteProduct} open={isOpenModalDelete} />
        </div>

    </div>);
}



export default StoreProducts;
