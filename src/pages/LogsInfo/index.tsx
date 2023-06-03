import {ActionType, PageContainer,} from '@ant-design/pro-components';
import {useModel} from '@umijs/max';
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
      // 日志信息
    const [logs, setLogs] = useState<string>('');

    const [connected, setConnected] = useState<boolean>();

    const {initialState, setInitialState} = useModel('@@initialState');

    const actionRef = useRef<ActionType>();

    let webSocket: any;

    // if (!initialState?.connected) {

    // let connectedLo: boolean = localStorage.getItem("connected");
    if (!connected) {

      webSocket = new WebSocket('ws://localhost:8080/webSocket');

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

      setConnected(true);

      // setInitialState((s) => ({
      //   ...s,
      //   webSocket: webSocket,
      //   connected: true,
      // }));

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
