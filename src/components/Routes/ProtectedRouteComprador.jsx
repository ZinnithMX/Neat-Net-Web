import {Cookies} from "react-cookie";
import {Navigate, Outlet} from "react-router-dom";

export default function ProtectedRouteComprador({children, redirectTo}){

    const userCookie = new Cookies();



    if(!userCookie.get("sesionId")){
        return <Navigate to={redirectTo}/>
    }
    else{
        const url = "http://localhost:8080/login/sessionId?" + new URLSearchParams({
            sessionId: userCookie.get("sesionId")
        });


        const headers = new Headers();
        const encodedCredentials = btoa(`${"Ingreso"}:${"visitante"}`);

        headers.append("Authorization", `Basic ${encodedCredentials}`);
        headers.append("Content-Type", `application/json`);
        fetch(url, {
            method: 'GET',
            headers: headers
        }).then(res => {
            if(res.ok){
                userCookie.set("idUsuario", res.idUsuario, {path: "/"});
                return children ? children : <Outlet/>
            }
            else{
                userCookie.remove("sesionId", {path: "/"});
                return <Navigate to={redirectTo}/>
            }
        }).catch(err => {
            console.log(err);
            return <Navigate to={redirectTo}/>
        })
    }



}