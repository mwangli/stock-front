import {ActionType, PageContainer,} from '@ant-design/pro-components';
import {useIntl} from '@umijs/max';
import React, {useRef, useState} from 'react';
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
    const intl = useIntl();

    // 日志信息
    const [logs, setLogs] = useState<string>('false');

    const [connected, setConnected] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();

    let webSocket: any;

    if (!connected){


      webSocket = new WebSocket('ws://localhost:8080/webSocket');

      webSocket.onopen = () => {
        console.log('连接建立成功')
      }

      webSocket.onclose = () => {
        console.log('连接关闭成功')
      }

      webSocket.onmessage = (message: any) => {
        console.log(message.data)
        setLogs(message.data)

        setConnected(true);
      }


        // webSocket?.close(1000, 'closed');
    }

    return (
      <PageContainer

        onTabChange={(key) => {
          console.log("切换菜单")
          webSocket?.close(1000, 'closed');
        }}
      >
        <CodeMirror editable={false}
                    autoFocus={true}
                    theme={"dark"}
                    value={logs}
                    height="80"

          // extensions={[javascript({jsx: true})]}
          // onChange={onChange}
        />
      </PageContainer>
    );
  }
;

export default LogsInfo;
