import React, { useEffect, useState } from 'react';

const OrderRow = ({order, handleDelete, handleStatusUpdate}) => {
    console.log(order)
    const {_id, serviceName, customer, email, price, phone, service, status} = order;
    const [orderService, setOrderService] = useState()


    useEffect( () => {
        fetch(`http://localhost:5000/services/${service}`)
            .then(res => res.json())
            .then(data => setOrderService(data))
    },[service])

    

    return (
        <tr>
            <th>
                <button onClick={() => handleDelete(_id)} className='btn btn-ghost' >X</button>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-20 h-20">
                           { 
                                orderService?.img &&
                           <img src={orderService.img} alt="Avatar Tailwind CSS Component" />}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50"></div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
                <br />
                <span className="badge badge-ghost badge-sm">{price}</span>
            </td>
            <td>{phone}</td>
            <th>
                <button 
                onClick={ () => handleStatusUpdate(_id)}
                className="btn btn-ghost btn-xs">{status ? status : 'Pending'}</button>
            </th>
        </tr>
    );
};

export default OrderRow;