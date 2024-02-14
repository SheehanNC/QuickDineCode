// import React, { useEffect, useRef, useState } from "react";
// // import Burger from "../components/burger.jpg";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import { useDispatchCart, useCart } from "./ContextReducer";

// export default function Card(props) {

//     let priceRef = useRef();
//     let data = useCart();
//     let dispatch = useDispatchCart();
//     let options = props.options;
//     let priceOptions = Object.keys(options);
//     const[qty, setQty] = useState(1);
//     const[size, setSize] = useState("");
    
//   const handleCart = async () =>{
//     await dispatch({type: "ADD", id: props.foodItems.id, name: props.foodItems.name, price: finalPrice, qty:qty, size:size})
//     console.log(data)
//   }


//   useEffect(()=>{
//     setSize(priceRef.current.value);
//   })
//   const finalPrice = qty * parseInt(options[size]);
//   return (
//     <div>
//       <div
//         className="card mt-4"
//         style={{
//           width: "18rem",
//           border: "0px",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
//         }}
//       >
//         <img src={props.foodItems.img} className="card-img-top" alt="..." style={{height:"190px", objectFit:"fill"}}></img>
//         <div className="card-body">
//           <h5 className="card-title">{props.foodItems.name}</h5>
//           <p className="card-text">Here's your food. Try this out!</p>
//           <div className="container 1-100">
//             <select className="m-2 h-100 w-10 bg-warning rounded text-black" onChange={ (e)=> setQty(e.target.value)}>
//               {Array.from(Array(5), (e, i) => {
//                 return (
//                   <option key={i + 1} value={i + 1}>
//                     {i + 1}
//                   </option>
//                 );
//               })}
//             </select>
//             <select className="m-2 h-100 w-10 bg-warning rounded text-black" ref={priceRef} onChange={ (e)=> setSize(e.target.value)}>
//               {priceOptions.map((data)=>{
//                 return <option key={data} value={data} >{data}</option>
//               })}
//             </select>
//             <hr></hr>
//             <div>
//               {finalPrice}/-
//             </div>
//           </div>
          
//         </div>
//         <button className="btn btn-warning m-4" onClick={handleCart}>
//                 Add to Cart {""}
//             <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
//         </button>
//       </div>
      
//     </div>
//   );
// }

import React, { useEffect, useRef, useState, useContext } from "react";
// import Burger from "../components/burger.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useDispatchCart, useCart } from "./ContextReducer";
import { UserContext } from "./UserContext.js";

export default function Card(props) {

    let priceRef = useRef();
    // let data = useCart();
    // let dispatch = useDispatchCart();
    const [loading, setLoading] = useState(false);
    let options = props.options;
    let priceOptions = Object.keys(options);
    const[qty, setQty] = useState(1);
    const[size, setSize] = useState("");
    

    // const userEmail = "abs";
    const { user } = useContext(UserContext);
    const userEmail = user ? user.email : null; // Use UserContext here
   


    const handleCart = async () => {
      setLoading(true);


      try {
        const response = await fetch("http://localhost:5000/api/addcart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              id: props.foodItems._id,
              name: props.foodItems.name,
              price: finalPrice,
              qty: qty,
              size: size,
              userEmail: userEmail
            })
        });
        console.log({ itemId: props.foodItems._id,
          name: props.foodItems.name,
          price: finalPrice,
          quantity: qty,
          size: size,
          userEmail: userEmail});
        
        if (response.ok) {
          console.log("Item added to cart successfully!");
          // Optionally, you can perform additional actions here after adding the item to the cart
        } else {
          console.error("Failed to add item to cart!");
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(()=>{
    setSize(priceRef.current.value);
  }, []);
  
  const finalPrice = qty * parseInt(options[size]);
  return (
    <div>
      <div
        className="card mt-4"
        style={{
          width: "18rem",
          border: "0px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
        }}
      >
        <img src={props.foodItems.img} className="card-img-top" alt="..." style={{height:"190px", objectFit:"fill"}}></img>
        <div className="card-body">
          <h5 className="card-title">{props.foodItems.name}</h5>
          <p className="card-text">Here's your food. Try this out!</p>
          <div className="container 1-100">
            <select className="m-2 h-100 w-10 bg-warning rounded text-black" onChange={ (e)=> setQty(e.target.value)}>
              {Array.from(Array(5), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 w-10 bg-warning rounded text-black" ref={priceRef} onChange={ (e)=> setSize(e.target.value)}>
              {priceOptions.map((data)=>{
                return <option key={data} value={data} >{data}</option>
              })}
            </select>
            <hr></hr>
            <div>
              {finalPrice}/-
            </div>
          </div>
          
        </div>
        <button className="btn btn-warning m-4" onClick={handleCart} disabled={loading}>
                Add to Cart {""}
            <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
        </button>
      </div>
      
    </div>
  );
}
