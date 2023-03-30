import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from '../Create.module.scss';
import Table from 'react-bootstrap/Table';

import * as CustomerService from '../../../../services/CustomerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

// const cx = classNames.bind(styles);

function CustomerCreate() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const data = await CustomerService.getAllCustomer();
            console.log(data);
            setCustomers(data);
        };
        fetchApi();
    }, []);

    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.id}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>
                                <FontAwesomeIcon icon={faTrash} />
                            </td>
                            <td>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CustomerCreate;
