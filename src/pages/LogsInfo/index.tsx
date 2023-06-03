import {PageContainer,} from '@ant-design/pro-components';
import React, {useState} from 'react';
import CodeMirror from '@uiw/react-codemirror';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const LogsInfo: React.FC = () => {

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
      // 日志信息
    const [logs, setLogs] = useState<string>('');

    const [ws, setWS] = useState<any>(null);

    const getWS = () => {
      // let connectedLo: boolean = localStorage.getItem("connected");
      if (!ws) {

        // const defaultServer = "localhost:8080";
        const port = process.env.port
        // console.log(JSON.stringify(process.env))
        // const server = webSocketServer ? webSocketServer : defaultServer;
        const webSocket = new WebSocket(`ws://localhost/ws/webSocket`);

        webSocket.onopen = () => {
          console.log('连接建立成功')
        }

        webSocket.onclose = () => {
          console.log('连接关闭成功')
        }

        webSocket.onmessage = (message: any) => {
          // console.log(message.data)
          setLogs(message.data)

        }

        setWS(webSocket);

      }

    }

    getWS()

    return (
      <PageContainer>
        <CodeMirror editable={false}
                    readOnly={true}
                    theme={"dark"}
                    value={logs}
                    height="1000px"

          // extensions={[javascript({jsx: true})]}
          // onChange={onChange}
        />
      </PageContainer>
    );
  }
;

export default LogsInfo;
