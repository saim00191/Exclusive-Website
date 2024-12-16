import Image1 from "@/images/ProductsSalesImg1.png";
import Image2 from "@/images/ProductsSalesImg2.png";
import Image3 from "@/images/ProductsSalesImg3.png";
import Image4 from "@/images/ProductsSalesImg4.png";

const SalesItemsList = [
  {
    id: '1001',
    img: Image1,
    discount: -40,
    title: "HAVIT HV-G92 Gamepad",
    previousPrice: 160,
    description : 'The HAVIT HV-G92 Gamepad offers a comfortable and responsive gaming experience with its ergonomic design, customizable buttons, and vibration feedback. Perfect for long gaming sessions, it supports both PC and PlayStation platforms for versatile gameplay.',
    newPrice: 120,
    rated: "88",
    stars:5
  },
  {
    id: '1002',
    img: Image2,
    discount: -35,
    title: "AK-900 Wired Keyboard",
    description:'The AK-900 Wired Keyboard features a sleek, durable design with responsive keys, making it ideal for both gaming and productivity. Its ergonomic layout and anti-ghosting technology provide a smooth, reliable typing experience.',
    previousPrice: 1160,
    newPrice: 960,
    rated: "75",
    stars:5
  },
  {
    id: '1003',
    img: Image3,
    discount: -30,
    title: "IPS LCD Gaming Monitor",
    description:'The IPS LCD Gaming Monitor delivers vibrant colors and wide viewing angles, offering an immersive gaming experience with fast refresh rates and crystal-clear visuals. Perfect for gamers seeking smooth, high-quality performance.',
    previousPrice: 400,
    newPrice: 370,
    rated: "99",
    stars:5
  },
  {
    id: '1004',
    img: Image4,
    discount: -25,
    title: "S-Series Comfort Chair",
    description:'The S-Series Comfort Chair provides exceptional support and comfort with its ergonomic design, making it perfect for long hours of sitting. Its adjustable features and high-quality materials ensure a relaxing and productive seating experience.',
    previousPrice: 400,
    newPrice: 375,
    rated: "99",
    stars:5
  },
];

export default SalesItemsList;
