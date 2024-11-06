import { useCookies } from 'react-cookie';
import Input from "../Input/Input.jsx";
import PrimaryButton from "../Button/PrimaryButton.jsx";
import { useState } from "react";
import PropTypes from "prop-types"; // Añadimos PropTypes para validación

export default function FormMetodoPago({ metodo, onSave, onCancel, onDelete }) {
    const [cookies] = useCookies(['idUsuario']);
    const usuario = cookies.idUsuario;
    const [nombre, setNombre] = useState({ error: false, value: metodo.nombre || "" });
    const [numeroTarjeta, setNumeroTarjeta] = useState({ error: false, value: metodo.numeroTarjeta || "" });
    const [titular, setTitular] = useState({ error: false, value: metodo.titular || "" });

    const handleGuardar = () => {
        const metodoPago = {
            titular: titular.value,
            nombre: nombre.value,
            numeroTarjeta: numeroTarjeta.value
        };
        handleActualizarMetodo(metodoPago);
    };

    const handleActualizarMetodo = (metodoPago) => {
        fetch(`http://localhost:8080/metodo-pago/actualizar?idUsuario=${usuario}`, {
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
            .then((result) => {
                console.log(result);
                onSave(metodoPago); // Llamamos a onSave con el nuevo método
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleEliminar = () => {
        fetch(`http://localhost:8080/eliminar?idUsuario=${usuario}&nombre=${nombre.value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Ingreso:visitante')
            }
        })
            .then(response => response.text())
            .then(result => {
                console.log(result);
                onDelete(nombre.value); // Llamamos a onDelete para eliminar el método de la lista
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className={"flex flex-col rounded-[8px] overflow-hidden px-6 py-4 bg-g-200 gap-6"}>
            <Input label={"Nombre"} required={true} response={value => setNombre({ error: false, value })} value={nombre.value}>Nombre del método de pago</Input>
            <Input
                label={"Nº tarjeta"}
                required={true}
                response={value => setNumeroTarjeta({ error: false, value })}
                value={numeroTarjeta.value}
                validate={true}
                regex={new RegExp('\\b(?<!\\d.)(3[47]\\d{2}([ -]?)(?!(\\d)\\3{5}|123456|234567|345678|424242|545454)\\d{6}\\2(?!(\\d)\\4{4})\\d{5}|((4\\d|5[1-5]|65)\\d{2}|6011)([ -]?)(?!(\\d)\\8{3}|4242|5454|1234|3456|5678|2345|4567)\\d{4}\\7(?!(\\d)\\9{3})\\d{4}\\7\\d{4})(\\b|\\s)(?!.\\d\\d)')}>
                0000 0000 0000</Input>
            <Input label={"Titular"} required={true} response={value => setTitular({ error: false, value })} value={titular.value}>Titular de la tarjeta</Input>

            <div className={"flex flex-row gap-4"}>
                <PrimaryButton onClick={handleGuardar} tamano={"pequeno"} estilo={"primary"} width={"flex-1"}>Guardar</PrimaryButton>
                <PrimaryButton onClick={onCancel} tamano={"pequeno"} estilo={"secondary"} width={"flex-1"}>Cancelar</PrimaryButton>
                {metodo.nombre && (
                    <PrimaryButton onClick={handleEliminar} tamano={"pequeno"} estilo={"error"} width={"flex-1"}>Eliminar</PrimaryButton>
                )}
            </div>
        </div>
    );
}

FormMetodoPago.propTypes = {
    metodo: PropTypes.shape({
        nombre: PropTypes.string,
        numeroTarjeta: PropTypes.string,
        titular: PropTypes.string
    }),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

FormMetodoPago.defaultProps = {
    metodo: { nombre: "", numeroTarjeta: "", titular: "" }
};