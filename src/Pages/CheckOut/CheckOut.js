import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const CheckOut = () => {
    const { user } = useContext(AuthContext);
    const { _id, title, price } = useLoaderData();

    const handlePlaceOrder = event => {
        event.preventDefault()
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
            
        }
        if(phone.length < 11) {
            alert('Phone number should be 11 characters')
        }
        else{

            fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers:{
                'content-type' : 'application/json',

            },
            body: JSON.stringify(order),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.acknowledged){
                    form.reset();
                    alert('Order placed successfully')
                }
            })
            .catch(error => console.error(error))
        }

        
    }

    

    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <p className='text-2xl font-bold text-orange-600'><span className='text-black '>You are about to : </span>{title}</p>
                <p className='text-2xl font-bold text-orange-600'>Price : ${price}</p>
                <div className='grid grid-cols-1, md:grid-cols-2 my-5 gap-5 lg:grid-cols-2'>
                    <input type="text" name='firstName' placeholder="First Name" defaultValue={user?.displayName} className="input input-bordered input-primary w-full " />
                    <input type="text" name='lastName' placeholder="Last Name"  className="input input-bordered input-primary w-full " />
                    <input type="email" required name='email' placeholder="Your Email" defaultValue={user?.email} readOnly className="input input-bordered input-primary w-full " />
                    <input type="number" name='phone' placeholder="Phone Number" required defaultValue={user?.phone} className="input input-bordered input-primary w-full " />

                </div>
                <textarea name='message' className="textarea textarea-primary h-24 w-full" placeholder="Type Your Message Here"></textarea>
                <input className='btn my-2' type="submit" value="Place Your Order" />
            </form>
        </div>
    );
};

export default CheckOut;