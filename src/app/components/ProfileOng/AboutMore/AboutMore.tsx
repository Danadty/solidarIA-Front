import "./AboutMore.css"
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineGlobeAlt } from "react-icons/hi2";

const AboutMore = () => {
    return (
        <>
            <div className="container-icons">
                <div>
                    <HiMiniCurrencyDollar />
                    <p>20 Donaciones</p>
                </div>
                <div>
                    <HiOutlineGlobeAlt />
                    <p>5 Proyectos</p>
                </div>
                <div>
                    <HiOutlineUserGroup />
                    <p>9 Voluntarios</p>
                </div>
            </div>
        </>
    )
}

export default AboutMore;