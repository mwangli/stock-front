import {PageContainer,} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import CodeMirror from '@uiw/react-codemirror';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const LogsInfo: React.FC = () => {

    // 日志信息
    const [init, setInit] = useState<boolean>(true);

    const [logs, setLogs] = useState<string>('');

    useEffect(() => {
      const localServer = "localhost:8080";
      const remoteServer = "124.220.36.95:8080";

      const server = process.env.NODE_ENV == 'production' ? remoteServer : localServer;
      const webSocket = new WebSocket(`ws://${server}/webSocket/logs`);

      webSocket.onmessage = (message: any) => {
        setLogs((old) => old == '' ? message.data : `${old}\r${message.data}`
        )
      };
      return () => webSocket.close();
    }, []);

    return (
      <PageContainer>
        <CodeMirror
          editable={false}
          // readOnly={true}
          theme={"dark"}
          value={logs}
          height="1000px"
          onScroll={(s) => {
            console.log(s)
          }}
          onUpdate={(viewUpdate) => {
            let scrollDOM = viewUpdate.view.scrollDOM;
            let height = scrollDOM.scrollHeight;
            let top = scrollDOM.scrollTop + 1030;

            if (init || top >= height) {
              scrollDOM.scrollTop = scrollDOM.scrollHeight;
              setInit(false);
            }
          }}
        />
      </PageContainer>
    );
  }
;

export default LogsInfo;
