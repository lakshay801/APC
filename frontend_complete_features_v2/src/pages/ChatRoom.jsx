import { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ChatRoom() {
  const { projectId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const stompRef = useRef(null);
  const { user } = useAuth();
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/projects/${projectId}`)
      .then((r) => {
        const p = r.data;
        setOtherUser(p.owner === user.username ? 'owner' : p.owner);
      })
      .catch(() => {});

    axios
      .get(`/api/messages/project/${projectId}`)
      .then((r) => setMessages(r.data))
      .catch(() => {});

    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);
    const token = localStorage.getItem('token');

    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        client.subscribe('/user/queue/messages', (m) => {
          try {
            const msg = JSON.parse(m.body);
            setMessages((prev) => [...prev, msg]);
          } catch (e) {
            console.error(e);
          }
        });
      },
      (err) => {
        console.error('STOMP ERR', err);
      }
    );

    stompRef.current = client;

    return () => {
      try {
        stompRef.current && stompRef.current.disconnect();
      } catch (e) {}
    };
  }, [projectId, user]);

  const send = async () => {
    if (!text.trim()) return;

    const from = user?.username || 'anonymous';
    const to = otherUser || 'owner';

    const payload = {
      projectId: Number(projectId),
      fromUser: from,
      toUser: to,
      content: text,
    };

    try {
      await axios.post('/api/messages', payload);
      setText('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-4 rounded shadow">
      <div className="mb-2">
        <strong>Chat with: </strong>
        {otherUser || '...'}
      </div>

      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((m) => (
          <div key={m.id}>
            <b>{m.fromUser}:</b> {m.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={send}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}
