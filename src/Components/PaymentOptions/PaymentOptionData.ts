import { IconType } from "react-icons";
import { BsCash, BsCreditCard2Back } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";
import { HiOutlineTruck } from "react-icons/hi";
import { SiExpress } from "react-icons/si";

import { PaymentType, DeliveryType } from "../OrderInterface";

const data: DataInterface = {
    payments: [
        {
            Icon: BsCash,
            current: "cash",
            title: "Cash"
        },
        {
            Icon: BsCreditCard2Back,
            current: "card",
            title: "Card"
        },
        {
            Icon: FaRegHandshake,
            current: "credit",
            title: "Credit"
        }
    ],
    delivery: [
        {
            title: "Standard",
            current: "standard",
            Icon: HiOutlineTruck
        },
        {
            title: "Premium",
            current: "premium",
            Icon: SiExpress
        }
    ]
}

interface DataInterface {
    delivery: Array<DeliveryInterface>;
    payments: Array<PaymentInterface>
}

interface PaymentInterface {
    title: string;
    current: PaymentType;
    Icon: IconType
}

interface DeliveryInterface {
    title: string;
    current: DeliveryType;
    Icon: IconType
}

export default data;