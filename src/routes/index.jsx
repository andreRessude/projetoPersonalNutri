import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import TelaPrato from "../pages/TelaPrato";
import TelaCamera from "../pages/TelaCamera";

function RoutesMain(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/telaprato" element={<TelaPrato/>}/>
            <Route path="/telacamera" element={<TelaCamera/>}/>
        </Routes>
    )
}

export default RoutesMain;
