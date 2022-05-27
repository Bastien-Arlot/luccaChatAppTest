import {useContext} from "react";
import Context from "./Context";


export default function Chat({msg}) {

    const { member } = useContext(Context);

    const isCurrentMember = member.id === msg.member.id;

    return (
        <li className={`flex justify-${!isCurrentMember ? 'start' : 'end'}`}>
            <div
                className={`relative max-w-xl px-4 py-2 text-white bg-${
                    isCurrentMember ? 'cyan' : 'blue'
                }-500 rounded shadow`}
            >
                {!isCurrentMember ? <span className="block">{msg.member.name}</span> : null}
                <span>{msg.message}</span>
            </div>
        </li>
    );
}