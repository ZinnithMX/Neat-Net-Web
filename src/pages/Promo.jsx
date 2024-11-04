import PrimaryButton from "../components/Button/PrimaryButton.jsx";
import {Navigate, useNavigate} from "react-router-dom";

export default function Promo() {

    const navigate = useNavigate();

    async function Comprar(){
        navigate("/login/comprador");
    }
    async function Vender(){
        navigate("/login/vendedor");
    }

    return(
      <>
        <div className={"w-full py-20 justify-center"}>
            <h1 className={"text-p-600 text-center"}>
                Neat-Net
            </h1>
            <p className={"text-xl text-center"}>
                Buenvenid@ a Neat-net
            </p>
        </div>
        <div>
            <div className={"flex flex-col items-center gap-12"}>
                <h2>
                    ¿Que quieres hacer el día de hoy?
                </h2>
                <div className={"flex gap-8"}>
                    <PrimaryButton onClick={Comprar} tamano={"normal"} estilo={"primary"} width={""}>
                        Comprar
                    </PrimaryButton>
                    <PrimaryButton onClick={Vender} tamano={"normal"} estilo={"primary"} width={""}>
                        Vender
                    </PrimaryButton>
                </div>
            </div>
        </div>
      </>
    );
}