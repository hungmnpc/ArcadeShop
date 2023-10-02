import classNames from "classnames/bind";
import style from "./Orders.module.scss";
import { useEffect, useState } from "react";
import { changeOrderStatus, get } from "../../../utils/request";
import { Space, Table } from "antd";
import { Actions } from "../StoreProducts";
import ModalOrderChange from "../../../components/ModalOrderChange";
import { toast } from "react-hot-toast";
import SelectControl from "../../../components/SelectControl";

const cx = classNames.bind(style);



function Orders() {

    const [orders, setOrders] = useState([])

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    

    console.log(orders);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getOrders = (status = '') => {
        if (status === 0) {
            status = ''
        }
        get("/api/v1/orders/admin?status=" + status)
            .then(response => {
                console.log(response)
                setOrders(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getOrders();
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

    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            sorter: true
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
            key: 'orderDate'
        },
        {
            title: 'Shipped Date',
            dataIndex: 'shippedDate',
            sorter: (a, b) => new Date(a.shippedDate) - new Date(b.shippedDate),
            key: 'shippedDate'
        },
    
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <div className={cx('status', record.status)}>
                    <span>{record.status}</span>
                </div>
            ),
        },
        {
            title: 'Total Price',
            key: 'totalPrice',
            sorter: (a, b) => a.subTotal - b.subTotal,
            render: (_, record) => (
                <div className={cx('price')}>
                    <span>{record.subTotal}₫</span>
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <OrderAction id={record.key} refresh={getOrders} currentStatus={record.statusValue} />
                </Space>
            ),
        },
    ]

    const [filter, setFilter] = useState(0);

    useEffect(() => {
        getOrders(filter)
    }, [filter])



    return (<div className={cx('wrapper')}>
        <div className={cx('top')}>
            <div className={cx('title')}>
                <h2>
                    Orders <span className={cx('number')}>{20}</span>
                </h2>
            </div>
        </div>
        <div className={cx('container')}>

            <div className={cx('filter')}>
                <SelectControl label='Status' value={filter} onChange={(data) => {
                    setFilter(data)
                }} selectItems={[{value: 0, text: 'ALL'},{value: 1, text: 'PROCESSING'}, {value: 2, text: 'SHIPPING'}, {value: 3, text: 'ACCOMPLISHED'}, {value: 4, text: 'CANCELLED'}]} />
            </div>

            <Table onRow={(record, rowIndex) => {
                return {
                    onClick: event => {
                        // return navigate(`/dashboard/store-products/products/${record.key}`)
                    }, // click row
                };
            }} rowSelection={rowSelection} sticky={true} columns={columns} dataSource={orders.map((order, index) => {
                return {
                    key: order.id,
                    user: order.user.firstName + " " + order.user.lastName,
                    orderDate: order.orderDate,
                    shippedDate: order.shippedDate,
                    status: order.statusValue,
                    statusValue: order.statusNumber,
                    subTotal: order.subTotal
                }
            })} />
        </div>
    </div>);
}

function OrderAction({id, currentStatus, refresh}) {

    const [status, setStatus] = useState(currentStatus);

    const handelChangeStatus = (newStatus) => {
        setStatus(newStatus);
    }


    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setStatus(currentStatus)
    }

    const handleOpen = () => {
        setShow(true);
    }
    

    const handleUpdateOrder = () => {
        console.log("id ", id);
        console.log("status ", status)
        toast.promise(changeOrderStatus(status, id), {
            loading: "Waitting...",
            error: "Something wrong. try again."
        }).then(response => {
            setShow(false)
            refresh()
        })
    }

    return ( <div className={cx('action')}>
        <button onClick={() => setShow(!show)} className={cx('btn-change')}>Change</button>
        <ModalOrderChange open={show} onCancel={handleClose} onOk={handleUpdateOrder} onChange = {handelChangeStatus} currentStatus = {status}/>
    </div> );
}


export default Orders;
