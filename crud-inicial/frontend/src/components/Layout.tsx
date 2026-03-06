import Titulo from "./Titulo";
import { Outlet } from "react-router-dom";
interface LayoutProps {
    titulo: string;
}

export default function Layout(props: LayoutProps) {
    return (
        <div
            className={`
      flex justify-center items-center h-screen
      bg-gradient-to-br from-slate-600 via-purple-600 to-slate-600
      text-white
    `}
        >
            <div
                className={`
            flex flex-col w-2/3
            bg-white text-gray-800 rounded-md
        `}
            >
                <Titulo>{props.titulo}</Titulo>
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
