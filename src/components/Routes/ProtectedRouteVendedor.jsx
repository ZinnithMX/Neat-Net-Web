import {Cookies} from "react-cookie";
import {Navigate, Outlet} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect} from "react";
import {DomainContext} from "../../App.jsx";

export default function ProtectedRouteVendedor({children, redirectTo}){

    const userCookie = new Cookies();
    const domain = useContext(DomainContext);


    function verificarVendedor(data){

        const url2 = domain + "/login/verificarVendedor?" + new URLSearchParams({
            "idUsuario": data.usuario.idUsuario,
        })
        const headers = new Headers();
        const encodedCredentials = btoa(`${"Ingreso"}:${"visitante"}`);
        headers.append("Authorization", `Basic ${encodedCredentials}`);
        headers.append("Content-Type", `application/json`);

        axios.get(url2, {headers: headers}).then(res => {
            if(res.status === 200){
                userCookie.set("idVendedor", res.data, {path: "/"});
                userCookie.set("sesionId", data.sessionId, {path: "/"});
                userCookie.set("idUsuario", data.usuario.idUsuario, {path: "/"});
                console.log(res.data);
            }
        }).catch(err => {
            return <Navigate to={redirectTo}/>
        })
    }

    if(!userCookie.get("sesionId")){
        return <Navigate to={redirectTo}/>
    }
    else{
        const url = domain + "/login/sessionId?" + new URLSearchParams({
            sessionId: userCookie.get("sesionId")
        });
        const headers = new Headers();
        const encodedCredentials = btoa(`${"Ingreso"}:${"visitante"}`);
        headers.append("Authorization", `Basic ${encodedCredentials}`);
        headers.append("Content-Type", `application/json`);

        axios.get(url, {headers: headers}).then(res => {
            if(res.status === 200){
                verificarVendedor(res.data);
            }
            else{
                userCookie.remove("sesionId", {path: "/"});
                return <Navigate to={redirectTo}/>
            }
        }).catch(err => {
            return <Navigate to={redirectTo}/>
        })
    }

    return <Outlet/>


}