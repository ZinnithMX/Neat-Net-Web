import Input from "../Input/Input.jsx";
import PrimaryButton from "../Button/PrimaryButton.jsx";
import {useContext, useState} from "react";
import {DomainContext} from "../../App.jsx";

export default function AddMetodoP() {
    const [nombre, setNombre] = useState({ error: false, value: "" });
    const [numeroTarjeta, setNumeroTarjeta] = useState({ error: false, value: "" });
    const [titular, setTitular] = useState({ error: false, value: "" });
    const Domain = useContext(DomainContext);
    const handleActualizarMetodo = (metodoPago) => {
        fetch(Domain + `/metodo-pago/actualizar?usuario=Ingreso`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Ingreso:visitante')
            },
            body: JSON.stringify(metodoPago)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(data => {
                alert("Método de pago actualizado exitosamente");
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error al actualizar el método de pago: " + error.message);
            });
    };

    const handleGuardar = () => {
        const metodoPago = {
            titular: titular.value,
            nombre: nombre.value,
            numeroTarjeta: numeroTarjeta.value
        };
        handleActualizarMetodo(metodoPago);
    };

    return (
        <div className={"flex flex-col rounded-[8px] overflow-hidden px-6 py-4 bg-g-200 gap-6"}>
            <Input label={"Nombre"} required={true} response={value => setNombre({ error: false, value })}>Nombre del método de pago</Input>
            <Input
                label={"Nº tarjeta"}
                required={true}
                response={value => setNumeroTarjeta({ error: false, value })}
                validate={true}
                regex={new RegExp('\\b(?<!\\d.)(3[47]\\d{2}([ -]?)(?!(\\d)\\3{5}|123456|234567|345678|424242|545454)\\d{6}\\2(?!(\\d)\\4{4})\\d{5}|((4\\d|5[1-5]|65)\\d{2}|6011)([ -]?)(?!(\\d)\\8{3}|4242|5454|1234|3456|5678|2345|4567)\\d{4}\\7(?!(\\d)\\9{3})\\d{4}\\7\\d{4})(\\b|\\s)(?!.\\d\\d)')}>
                0000 0000 0000</Input>
            <Input label={"Titular"} required={true} response={value => setTitular({ error: false, value })}>Titular de la tarjeta</Input>

            <div className={"flex flex-row gap-4"}>
                <PrimaryButton onClick={handleGuardar} tamano={"pequeno"} estilo={"primary"} width={"flex-1"}>Guardar</PrimaryButton>
                <PrimaryButton onClick={() => { alert("Cancelado"); }} tamano={"pequeno"} estilo={"error"} width={"flex-1"}>Cancelar</PrimaryButton>
            </div>
        </div>
    );
}