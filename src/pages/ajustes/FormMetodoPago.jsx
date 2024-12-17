import {Cookies, useCookies} from 'react-cookie';
import Input from "../../components/Input/Input.jsx";
import PrimaryButton from "../../components/Button/PrimaryButton.jsx";
import {useContext, useState} from "react";
import {DomainContext} from "../../App.jsx";
import {useNavigate} from "react-router-dom";

export default function FormMetodoPago() {
    const navigate = useNavigate();
    const userCoockies = new Cookies();
    const usuario = userCoockies.get("userId")
    const [nombre, setNombre] = useState({ error: false, value: "" });
    const [numeroTarjeta, setNumeroTarjeta] = useState({ error: false, value: "" });
    const [titular, setTitular] = useState({ error: false, value: "" });
    const domain = useContext(DomainContext)
    const [metodoPago, setMetodoPago] = useState(null);

    const handleGuardar = () => {
        setMetodoPago({
            titular: titular.value,
            nombre: nombre.value,
            numeroTarjeta: numeroTarjeta.value
        });
        handleActualizarMetodo();
    };

    const handleActualizarMetodo = () => {

        const headers = new Headers();
        const encodedCredentials = btoa(`${"Ingreso"}:${"visitante"}`);

        headers.append("Content-Type", `application/json`);
        headers.append("Authorization", `Basic ${encodedCredentials}`);

        const url = domain + "/metodo-pago/actualizar?";

        fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(metodoPago)
        }).then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then((result) =>
                console.log(result)
            )
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className={"flex flex-col rounded-[8px] overflow-hidden px-6 py-4 bg-g-200 gap-6"}>
            <h3>Agregar Metodo Pago</h3>
            <Input label={"Nombre"} required={true} response={value => setNombre({ error: false, value })}>Nombre del método de pago</Input>
            <Input
                label={"Nº tarjeta"}
                required={true}
                response={value => setNumeroTarjeta({ error: false, value })}
                validate={true}
                regex={new RegExp('\\b(?<!\\d.)(3[47]\\d{2}([ -]?)(?!(\\d)\\3{5}|123456|234567|345678|424242|545454)\\d{6}\\2(?!(\\d)\\4{4})\\d{5}|((4\\d|5[1-5]|65)\\d{2}|6011)([ -]?)(?!(\\d)\\8{3}|4242|5454|1234|3456|5678|2345|4567)\\d{4}\\7(?!(\\d)\\9{3})\\d{4}\\7\\d{4})(\\b|\\s)(?!.\\d\\d)')}>
                0000 0000 0000
            </Input>
            <Input label={"Titular"} required={true} response={value => setTitular({ error: false, value })}>Titular de la tarjeta</Input>

            <div className={"flex flex-row gap-4"}>
                <PrimaryButton onClick={handleGuardar} tamano={"pequeno"} estilo={"primary"} width={"flex-1"}>Guardar</PrimaryButton>
                <PrimaryButton onClick={() => { navigate("/cuenta/") }} tamano={"pequeno"} estilo={"error"} width={"flex-1"}>Cancelar</PrimaryButton>
            </div>
        </div>
    );
}