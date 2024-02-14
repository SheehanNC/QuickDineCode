import React from 'react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import Card from "../components/Card";

export default function Home() {

  const [search, setSearch] = useState('');

  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const loadData = async()=>{
    let response = await fetch ("http://localhost:5000/api/foodData",{
      method:"POST",
      headers:{ 
        'Content-Type':'application/json'
      }
    }
    );
    response = await response.json();

    setFoodItems(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);
  }

  useEffect(()=>{
    loadData()
  },[])

  return (
   <div>
        {/* <div><Header/></div> */}
        <div><Carousel setSearch={setSearch}></Carousel></div>
        <div className='container mt-3'>
          {
            foodCat.length !== 0
              ? foodCat.map((data)=>{
                  return( <div className='row mb-3 me-3'> 
                    <div key ={data._id} className='m-3 fs-3' style={{ fontFamily: 'cursive', fontWeight: 'bold' }} >{data.CategoryName}</div>
                    <hr></hr>
                    {
                      foodItems.length !== 0 ? 
                        foodItems.filter((item)=> (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map(filteredItems =>{
                          return(
                            <div key={filteredItems._id} className='col-12 col-md-6 col-lg-3' style={{ fontFamily: 'cursive', fontWeight: 'bold' }} >
                              
                              <Card foodItems={filteredItems}
                              options = {filteredItems.options[0]}
                              >
                              </Card>
                            </div>
                          )
                        })
                       : <div>Item not available : </div>
                    }
                    </div>
                  )
                })
            :<div>""</div>
          } 
          {/* <Card></Card> */}
        </div>
        <div><Footer/></div>
   </div>
  )
}
