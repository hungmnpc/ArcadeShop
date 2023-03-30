import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider, Input, Select, Space } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useReducer, useRef, useState } from 'react';
import style from './ViewSelect.module.scss';

import { PlusOutlined } from '@ant-design/icons';


const cx = classNames.bind(style);



function ViewSelect() {

    const [newView, setNewView] = useState('');
    const [items, setItems] = useState(['jack', 'lucy']);


    const onNewViewChange = (e) => {
        setNewView(e.target.value)
    }


    return (
        <div className={cx('view')} >
            <div className={cx('select')}>
                <Select

                    style={{
                        width: 250,
                    }}
                    defaultValue={items[0]}
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider
                                style={{
                                    margin: '8px 0',
                                }}
                            />
                            <Space
                                style={{
                                    padding: '0 8px 4px',
                                }}
                            >
                                <Input
                                    value={newView}
                                    onChange={onNewViewChange}
                                />
                                <Button  type="primary" icon={<PlusOutlined />} >
                                    Add view
                                </Button>
                            </Space>
                        </>
                    )}
                    options={items.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
            </div>
        </div>
    );
}

export default ViewSelect;
