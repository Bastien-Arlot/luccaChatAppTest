import Context from "./Context";
import {useState} from "react";
import Container from "./Container";

function App() {

    const [member, setMember] = useState(null);

    const store = {
        member,
        setMember,

    };

    return (
        <Context.Provider value={store}>
            <Container />
        </Context.Provider>
    );
}

export default App
