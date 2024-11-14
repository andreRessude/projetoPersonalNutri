import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import TelaPrato from "../pages/TelaPrato";
import TelaCamera from "../pages/TelaCamera";
import TelaDeveloper from "../pages/TelaDeveloper";

function RoutesMain(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/telaprato" element={<TelaPrato/>}/>
            <Route path="/telacamera" element={<TelaCamera/>}/>
            <Route path="/teladeveloper" element={<TelaDeveloper />} />
        </Routes>
    )
}

export default RoutesMain;
