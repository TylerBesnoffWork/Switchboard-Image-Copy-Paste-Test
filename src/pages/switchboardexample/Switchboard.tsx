import { useContext } from "react";
import { SwitchboardContext } from "../../context/switchboard/switchboardContext";
import SwitchboardContextType from "../../context/switchboard/switchboardContextType";
import MessageBox from "./display/MessageDisplay";
import { useNavigate } from "react-router-dom";
import MessageBar from "./messagebar/MessageBar";

const Switchboard = () => {
    const navigate = useNavigate();
    const { clearMessages } = useContext(SwitchboardContext) as SwitchboardContextType;
    
    return (
        <div>
        <h1>Switchboard Example</h1>
            <MessageBox />
            <MessageBar />
            <button onClick={() => navigate("/")}>Back</button>
            <button onClick={() => clearMessages()}>Clear</button>
        </div>
    );
}

export default Switchboard;
