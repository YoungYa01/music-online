import {ContactList} from "react-jwchat";
import {useEffect, useState} from "react";

// const socket = new WebSocket('ws://localhost:8080');

const Chat = () => {

  const [contactList, setContactList] = useState([]);
  const [contact, setContact] = useState(null);
  const [my, setMy] = useState(null);
  const [chatListData, setChatListData] = useState(null);

  useEffect(() => {
    // // 监听连接成功事件
    // socket.onopen = () => {
    //   console.log('WebSocket连接已建立');
    //
    //   // 发送消息到服务器
    //   socket.send('Hello, server!');
    // };
    //
    // // 监听接收消息事件
    // socket.onmessage = (event) => {
    //   const message = event.data;
    //   console.log('接收到服务器消息:', message);
    // };
    //
    // // 监听连接关闭事件
    // socket.onclose = () => {
    //   console.log('WebSocket连接已关闭');
    // };
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#65a5ff',
        padding: 20,
      }}
    >
      <ContactList
        data={contactList}
        style={{
          marginRight: 10,
          height: 500,
          borderRadius: 5,
          overflow: 'hidden',
          width: 240,
        }}
      />
      <Chat
        // contact={contact}
        // me={my}
        // chatList={chatListData}
        // onSend={(msg: any) => setChatListData([...chatListData, msg])}
        // onEarlier={() => console.log('EarlierEarlier')}
        // style={{
        //   width: 600,
        //   height: 500,
        //   borderRadius: 5,
        // }}
      />
    </div>
  )
}

export default Chat;
