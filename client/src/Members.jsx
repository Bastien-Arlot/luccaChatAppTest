import {useEffect, useState} from "react";
import Member from "./Member";


export default function Members({socket}) {

    const [members, setMembers] = useState([]);

    useEffect(() => {

        socket.on('members', members => {
            setMembers(members);
        });

    }, [socket]);


    return (
        <ul className="overflow-auto h-[32rem]">
            {members.map((member, i) => (
                <li key={i}>
                    <Member member={member} />
                </li>
            ))}
        </ul>
    )
}