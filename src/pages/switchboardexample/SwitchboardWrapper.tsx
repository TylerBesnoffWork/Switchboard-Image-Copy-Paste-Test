import { SwitchboardContextProvider } from "../../context/switchboard/switchboardContextProvider";
import Switchboard from "./Switchboard";

const SwitchboardWrapper = () => {
    return (
        <>
            <SwitchboardContextProvider>
                <Switchboard />
            </SwitchboardContextProvider>
        </>
    );
}

export default SwitchboardWrapper;