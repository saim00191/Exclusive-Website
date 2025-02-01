import { MdOutlinePhoneIphone } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { BsSmartwatch } from "react-icons/bs";
import { IoCameraOutline } from "react-icons/io5";
import { CiHeadphones } from "react-icons/ci";
import { SiYoutubegaming } from "react-icons/si";

const CategoriesItem = [
  {
    icon: (
      <MdOutlinePhoneIphone/>
    ),
    title: "Phone",
  },
  {
    icon: (
     <RiComputerLine/>
    ),
    title: "Computers",
  },
  {
    icon: (
      <BsSmartwatch/>
    ),
    title: "SmartWatch",
  },
  {
    icon: (
      <IoCameraOutline/>
    ),
    title: "Camera",
  },
  {
    icon: (
      <CiHeadphones/>
    ),
    title: "HeadPhones",
  },
  {
    icon: (
      <SiYoutubegaming/>
    ),
    title: "Gaming",
  },
];

export default CategoriesItem;
