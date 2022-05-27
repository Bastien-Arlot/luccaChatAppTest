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
            {member && socket && socket.connected ? (
                <div className="border rounded grid grid-cols-3 ">
                    <div className="border-r border-gray-300 col-span-1">Lucca's Talks Fans</div>
                    <div className="col-span-2">
                        <div className="w-full p-6 overflow-y-auto h-[40rem]">Message...</div>
                    </div>
                </div>
            ) : null}
            {!member && socket ? (
                <div className='w-1/3 mx-auto'>
                    <Auth socket={socket}/>
                </div>
            ) : null}
        </div>
    );
}