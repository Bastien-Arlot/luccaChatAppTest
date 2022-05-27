import {useContext, useEffect, useState} from "react";
import Context from "./Context";
import {io} from 'socket.io-client';
import Auth from "./Auth";

export default function Container() {

    const {member, setMember} = useContext(Context);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);
        setMember(null);

        return () => newSocket.close();

    }, [setSocket]);

    return (
        <div className='container mx-auto'>
            <h1 className='text-3x1 font-bold text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-b py-3 mb-5'>{member ? `Chatting as ${member.name}` : `Welcome to Lucca's Talks!`}</h1>
            {member && socket && socket.connected ? (<div>connected</div>) : null}
            {!member && socket ? (
                <div className='w-1/3 mx-auto'>
                    <Auth socket={socket}/>
                </div>
            ) : null}
        </div>
    );
}