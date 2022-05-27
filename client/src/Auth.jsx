import {LoginIcon} from '@heroicons/react/outline';
import {useContext, useEffect, useState} from "react";
import Context from "./Context";


export default function Auth({socket}) {

    const {setMember} = useContext(Context);
    const [localMember, setLocalMember] = useState('');

    useEffect(() => {
        socket.on('member', member => {
            setMember(member);
        })
    }, [socket]);

    const handleAuth = (e) => {
        e.preventDefault();
        socket.emit('member', localMember);
        setLocalMember('');
    }

    return (
        <form onSubmit={handleAuth}>
            <input
                type='text'
                className='w-full py-2 pl-4 mb-3 bg-slate-100 rounded-lg outline-none focus:text-slate-800 text-center'
                placeholder="Name my friend?"
                value={localMember}
                onChange={(e) => setLocalMember(e.target.value)}
            />
            <button type="submit"
                    className='flex items-center justify-center w-full bg-blue-500 text-white text-lg p-2 rounded-lg'>
                <LoginIcon className='w-7 h-7 mr-2'/>
                <span>Come as you are</span>
            </button>
        </form>
    );
}