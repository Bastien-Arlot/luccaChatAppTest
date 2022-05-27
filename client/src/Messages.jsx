import {useEffect, useState} from "react";
import Chat from "./Chat";


export default function Messages({socket}) {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('msg', messages => {
            setMessages(messages);
        })
    }, [socket]);

    return (
        <ul className="space-y-2">
            {messages.map((message, i) => (
                <Chat key={i} msg={message}/>
            ))}
        </ul>
    );
}