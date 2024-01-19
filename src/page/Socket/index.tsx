import {Button, Input, message} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";

// 创建WebSocket对象并指定连接URL
let socket = new WebSocket('ws://localhost:8080');

const Socket = () => {

  const [msgList, setMsgList] = useState<string[]>([]);
  const [messageData, setMessageData] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    return () => {
      axios.get("http://localhost:8081/api/ip")
        .then(({code, data, msg}) => {
          if (code === 200) {
            message.info(data.ip + '访问成功');
          } else {
            message.error(msg);
          }
        })
      // 监听连接成功事件
      socket.onopen = () => {
        message.success('WebSocket连接已建立')
        // 发送消息到服务器
        socket.send('Hello, server!');
        setLoading(false);
      };

      // 监听接收消息事件
      // socket.onmessage = (event) => {
      //   const message = event.data;
      //   setMsgList([...msgList, '接收到服务器消息:' + message]);
      //   console.log(msgList, message);
      // };

      socket.addEventListener('message', (event) => {
        const message = event.data;
        setMsgList([...msgList, '接收到服务器消息:' + message]);
        // console.log(msgList, message);
      })

      // 监听连接关闭事件
      socket.onclose = () => {
        socket.send('离开了！');
      };
    }
  }, [])


  return (
    <div style={{display: "flex", justifyContent: "center", flexDirection: "column", gap: 20}}>
      <Input.TextArea
        value={msgList.reduce((accumulator, currentValue) => accumulator + currentValue + '\n', '')}
        bordered={false} autoSize={{minRows: 15}}></Input.TextArea>
      <Input onChange={e => setMessageData(e.target.value.trim())} value={messageData}></Input>
      <div style={{display: "flex", justifyContent: "center", gap: 20}}>
        <Button style={{width: 200}} type="primary" loading={loading} disabled={!messageData.trim()}
                onClick={() => {
                  // 发送消息到服务器
                  socket.send(messageData);
                  setMsgList([...msgList, '发送的消息是：' + messageData]);
                  setMessageData('');
                }}>Click</Button>
        <Button style={{width: 200}} type="default" loading={loading} onClick={() => setMsgList([])}>Delete</Button>
        <Button style={{width: 200}} type="default" loading={loading}
                onClick={() => socket = new WebSocket('ws://localhost:8080')}>SetUp</Button>
        <Button style={{width: 200}} danger type="primary" loading={loading}
                onClick={() => socket.close()}>Close</Button>
      </div>

    </div>
  )
}

export default Socket;
