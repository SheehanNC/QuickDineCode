// OrderPage.js
import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../components/UserContext";
import axios from "axios";

// const MyOrders = ({ userEmail }) => {
//   return(
//     <div>
//       hello
//     </div>
//   )
// }
//

export default function MyOrders() {

  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);
  const userEmail = user ? user.email : null;

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/myOrderData",
          {
            email: userEmail,
          }
        );

        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, [userEmail]);

  return (
    <div>
    {orders.length > 0 ? (
      <>
        <h2 className="mt-5 mb-3 text-center"  style={{ fontWeight: "bold", fontFamily: "cursive" }}>Your Orders!</h2>
        {orders.map((order, index) => (
          <div key={index} className="container mt-4">
            <h3  style={{ fontWeight: "bold", fontFamily: "cursive" }}> {order.order_data[0].Order_date}</h3>
            <hr />
            <div   style={{ fontWeight: "bold", fontFamily: "cursive" }} className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Size</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.order_data.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.size}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </>
    ) : (
      <h2 className="mt-5 mb-3 text-center text-warning">
        You haven't placed any orders yet :( {" "} Place your first order from the cart!
      </h2>
    )}
  </div>
);
}

// export default MyOrders;
