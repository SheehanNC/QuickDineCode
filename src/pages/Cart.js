
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../components/UserContext';
import { Link } from 'react-router-dom';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useContext(UserContext); // Use UserContext here
    const userEmail = user ? user.email : null;

    useEffect(() => {
        fetchCartData();
    }, [userEmail]);

    const fetchCartData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/cartItems?userEmail=${userEmail}`);
            setCartItems(response.data); // Assuming backend returns an array of cart items
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    const handleRemove = async (name) => {
        try {
            await axios.delete(`http://localhost:5000/api/deleteItems/${name}`);
            // After successful deletion, fetch updated cart data
            fetchCartData();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    // Function to calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

//     const handleCheckOut = async()=>{
//         let userEmail = localStorage.getItem("userEmail")
//         let response = await fetch("http://localhost:5000/api/orderData",{
//             method: "POST",
//             headers: {
//                 "Content-Type" : "application/json"
//             },
//             body:JSON.stringify({
//                 order_data: cartItems,
//                 email: userEmail,
//                 order_date:new Date().toDateString()
//             })
            
//         }
    
//    );
//    if(response.ok){
//     console.log("Order Successful!");
//     await axios.delete(`http://localhost:5000/api/deleteAllItems?userEmail=${userEmail}`);
//     // After successful order and clearing the cart, fetch updated cart data
//     fetchCartData();
//    }
//    console.log("Order Response: ", response);
//  }

const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    try {
        const response = await Promise.all(cartItems.map(async (item) => {
            await fetch("http://localhost:5000/api/orderData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    order_data: item,
                    email: userEmail,
                    order_date: new Date().toDateString()
                })
            });
        }));
            console.log("Order Successful!");
        
        await axios.delete(`http://localhost:5000/api/deleteAllItems?userEmail=${userEmail}`);
        // After successful order and clearing the cart, fetch updated cart data
        fetchCartData();
    } catch (error) {
        console.error("Error placing order:", error);
    }
};



    return (
        <div>
            {loading ? (
                <div className="m-5 w-100 text-center fs-3">Loading...</div>
            ) : cartItems.length === 0 ? (
                <div className="m-5 w-100 text-center fs-3 text-warning" style={{fontFamily:"cursive"}}>The Cart is Empty!</div>
            ) : (
                <div className="container m-auto mt-5" style={{fontFamily:"cursive"}}>
                    <h2 text-warning >Fill your cart with happiness!</h2>
                    
                    <br></br>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Option</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.size}</td>
                                    <td>{item.price}/-</td>
                                    <td>
                                        <button className="btn" onClick={() => handleRemove(item.name)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <h2>Total Price: {totalPrice}/-</h2>
                        <Link to="/">
                <button className="btn bg-warning text-black mt-5" onClick={handleCheckOut}>Check Out</button>
            </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
