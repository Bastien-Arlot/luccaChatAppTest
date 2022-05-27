import {Server} from "socket.io";
import {uuidv4 as uuid} from 'uuid';

const io = new Server(5000, {
    cors: {
        origin: '*',
    },
});

const members = new Map();
const messages = [];

io.on('connection', socket => {
    //member enters chat
    socket.on('member', member => {
        const newMember = {
            id: uuid(),
            name: member,

        };
        member.set(socket.id, newMember);

        //send new member info/messages to new member
        socket.emit('member', newMember);
        socket.emit('msg', messages);

        //send updated members list to all members
        io.emit('members', Array.from(members.values()));
    });

    //new messages sent
    socket.on('msg', msg => {
        messages.push(msg);

        io.emit('msg', messages);
    });

    //member leaves chat
    socket.on(' disconnect', () => {
        members.delete(socket.id);
        io.emit('members', Array.from(members.values()));
    });
});