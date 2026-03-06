import { useNavigate } from "react-router-dom";

export default function useNavegar() {
    const navigate = useNavigate();
    const voltarInicio = () => navigate("/inicio");
    const voltarLogin = () => navigate("/");

    return { voltarInicio, voltarLogin };
}
