import {Cookies} from "react-cookie";
import {Navigate, Outlet} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect} from "react";
import {DomainContext} from "../../App.jsx";

export default function ProtectedRouteComprador({children, redirectTo}){

    const userCookie = new Cookies();
    const domain = useContext(DomainContext);


    useEffect(() => {
        if(!userCookie.get("sesionId")){
            return <Navigate to={redirectTo}/>
        }
        else{
            const url = domain + ":8080/login/sessionId?" + new URLSearchParams({
                sessionId: userCookie.get("sesionId")
            });
            const headers = new Headers();
            const encodedCredentials = btoa(`${"Ingreso"}:${"visitante"}`);
            headers.append("Authorization", `Basic ${encodedCredentials}`);
            headers.append("Content-Type", `application/json`);

            axios.get(url, {headers: headers}).then(res => {
                if(res.status === 200){
                    userCookie.set("idUsuario", res.data.idUsuario, {path: "/"});
                }
                else{
                    userCookie.remove("sesionId", {path: "/"});
                    return <Navigate to={redirectTo}/>
                }
            }).catch(err => {
                return <Navigate to={redirectTo}/>
            })
        }
    }, [userCookie]);



    return <Outlet/>


}