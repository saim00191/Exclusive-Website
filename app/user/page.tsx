'use client'
import React, { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client' 

const Home = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await client.fetch(
            `*[_type == "order" && _id == $orderId]`, // If `_id` is the correct field
            { orderId: "0q3uKZxnfB1z4qeWZulE8p" }
          );
          
          
          setOrder(orderData);
          console.log(orderData)
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {order ? (
        <pre>{JSON.stringify(order, null, 2)}</pre>
      ) : (
        <p>Loading order...</p>
      )}
    </div>
  );
};

export default Home;
