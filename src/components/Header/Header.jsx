import Input from "../Input/Input.jsx";
import {useState} from "react";
import {Link, NavLink} from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full py-3 px-6 items-center">
            <div className="flex flex-row w-full items-center justify-between">
                <div className="text-p-600">
                    <h4><Link to={"/productos/"}>Neat Net</Link></h4>
                </div>
                <nav className="flex justify-end gap-4 items-center">
                    <NavLink
                        className={({isActive}) => isActive ? "link" : "text-n-200 hover:text-p-600"} to={"/buscar/producto"}>
                        <span className={"material-symbols-rounded icon"}>search</span>
                    </NavLink>
                    <NavLink
                        className={({isActive}) => isActive ? "link" : "text-n-200 hover:text-p-600"} to={"/carrito/"}>
                        <span className={"material-symbols-rounded icon"}>shopping_cart</span>
                    </NavLink>
                    <NavLink
                        className={({isActive}) => isActive ? "link" : "text-n-200 hover:text-p-600"} to={"/listas/"}>
                        <span className={"material-symbols-rounded icon"}>list</span>
                    </NavLink>
                    <NavLink
                        className={({isActive}) => isActive ? "link" : "text-n-200 hover:text-p-600"} to={"/notificaciones/"}>
                        <span className={"material-symbols-rounded icon"}>notifications</span>
                    </NavLink>
                    <NavLink
                        className={({isActive}) => isActive ? "link" : "text-n-200 hover:text-p-600"} to={"/cuenta/"}>
                        <span className={"material-symbols-rounded icon"}>person</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}