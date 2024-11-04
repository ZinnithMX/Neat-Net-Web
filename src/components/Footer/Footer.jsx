export default function Footer() {
    return (
        <footer
            className="bg-n-700 flex flex-col md:flex-row items-center justify-between w-full p-3 m-0 box-border overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                <a href="/terminos" className="text-sm text-g-50 mb-2 md:mb-0 md:mr-4">Términos y Condiciones</a>
                <a href="/privacidad" className="text-sm text-g-50 mb-2 md:mb-0 md:mr-4">Política de Privacidad</a>
                <a href="/soporte" className="text-sm text-g-50 mb-2 md:mb-0 md:mr-4">Soporte Técnico</a>
                <p className="text-sm text-g-50">&copy; Zinnith 2024</p>
            </div>
        </footer>
    )
}