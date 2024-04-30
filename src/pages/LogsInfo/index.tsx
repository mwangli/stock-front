import {PageContainer,} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {useModel} from "@umijs/max";


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
      // const [logs, setLogs] = useState<string>('');
    const [init, setInit] = useState<boolean>(true);

    // const [ws, setWS] = useState<any>(null);

    const [logs, setLogs] = useState<string>('');

    const {initialState, setInitialState} = useModel('@@initialState');

    return (
      <PageContainer>
        <CodeMirror
          editable={false}
          // readOnly={true}
          theme={"dark"}
          value={initialState?.logs}
          height="1000px"

          // extensions={[javascript({jsx: true})]}
          // onChange={onChange}
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
            // if (top<height){
            //   console.log(top)
            //   console.log(height)
            //   console.log("------")
            // }
          }}
        />

        {/*<CodeMirror2*/}
        {/*  value='<h1>I ♥ react-codemirror2</h1>'*/}
        {/*  options={{*/}
        {/*    mode: 'xml',*/}
        {/*    theme: 'material',*/}
        {/*    lineNumbers: true*/}
        {/*  }}*/}
        {/*  onChange={(editor, data, value) => {*/}
        {/*  }}*/}
        {/*/>*/}
      </PageContainer>
    );
  }
;

export default LogsInfo;
