import type {ProColumns} from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {removeRule} from "@/services/ant-design-pro/api";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  title?: string;
  name?: string;
  decs: number;
  decs1: number;
  decs2: number;
  decs3: number;
  state?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 1,
    name: 'TV',
    decs: 1,
    decs1: 20,
    decs2: 20,
    decs3: 20,
    state: 'open',
  },
  {
    id: 2,
    name: 'Modern',
    decs: 1,
    decs1: 20,
    decs2: 20,
    decs3: 20,
    state: 'closed',
  },
  {
    id: 3,
    name: 'Light',
    decs: 1,
    decs1: 20,
    decs2: 20,
    decs3: 20,
    state: 'closed',
  },
  {
    id: 4,
    name: 'Washer',
    decs: 1,
    decs1: 20,
    decs2: 20,
    decs3: 20,
    state: 'closed',
  },
];

function getV1(v1: number) {
  var res1 = "3.8KW";
  if (v1 < 3.8) {
    res1 = "3.8KW";
  }
  if (v1 >= 3.8 && v1 < 5.7) {
    res1 = "5.7KW";
  }
  if (v1 >= 5.7 && v1 < 7.6) {
    res1 = "7.6KW";
  }
  if (v1 >= 7.6 && v1 < 9.6) {
    res1 = "9.6KW";
  }
  if (v1 >= 9.6 && v1 < 11.4) {
    res1 = "11.4KW";
  }
  if (v1 >= 11.4) {
    res1 = "11.4KW";
  }
  return res1;
}


function getV2(v2: number) {
  var res1 = "H2";
  if (v2 < 8) {
    res1 = "H2";
  }
  if (v2 >= 8 && v2 < 12) {
    res1 = "H2";
  }
  if (v2 >= 12 && v2 < 16) {
    res1 = "H3";
  }
  if (v2 >= 16 && v2 < 20) {
    res1 = "h4";
  }
  if (v2 >= 20 && v2 < 24) {
    res1 = "H5";
  }
  if (v2 >= 24 && v2 < 28) {
    res1 = "H6";
  }
  if (v2 >= 28) {
    res1 = "H7";
  }
  return res1;
}


export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
  const [v1, setV1] = useState<number>(0);
  const [v2, setV2] = useState<number>(0);

  const columns: ProColumns<DataSourceType>[] = [
    // {
    //   title: '活动名称',
    //   dataIndex: 'title',
    //   tooltip: '只读，使用form.getFieldValue获取不到值',
    //   formItemProps: (form, { rowIndex }) => {
    //     return {
    //       rules:
    //         rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
    //     };
    //   },
    //   // 第一行不允许编辑
    //   editable: (text, record, index) => {
    //     return index !== 0;
    //   },
    //   width: '15%',
    // },
    {
      title: '设备名称',
      dataIndex: 'name',
      // tooltip: '只读，使用form.getFieldValue可以获取到值',
      // readonly: true,
      width: '15%',
    },
    {
      title: '设备类型',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        // all: { text: '备电设备', status: 'Default' },
        open: {
          text: '非备电设备',
          status: 'Error',
        },
        closed: {
          text: '备电设备',
          status: 'Success',
        },
      },
    },
    {
      title: '设备数量',
      dataIndex: 'decs',
      valueType: "digit",
    },
    {
      title: '功率1',
      dataIndex: 'decs1',
      valueType: "digit",
    },
    {
      title: '功率2',
      dataIndex: 'decs2',
      valueType: "digit",
    },
    {
      title: '时长',
      dataIndex: 'decs3',
      valueType: "digit",
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  function getInfo() {
    console.log("getInfo");
    const info = (dataSource as DataSourceType[]).reduce(
      (pre, item) => {
        return {
          v1: pre.v1 + parseInt((item?.decs * item?.decs1 || 0).toString()),
          v2: pre.v2 + parseInt((item?.decs * item?.decs2 * item?.decs3 || 0).toString()),
        };
      },
      {v1: 0, v2: 0},
    );
    console.log(info.v1)
    console.log(info.v2)
    setV1(info.v1)
    // @ts-ignore
    setV2(info.v2)
  }

  function initInfo() {
    console.log("initInfo");
    const info = (defaultData as DataSourceType[]).reduce(
      (pre, item) => {
        return {
          v1: pre.v1 + parseInt((item?.decs * item?.decs1 || 0).toString()),
          v2: pre.v2 + parseInt((item?.decs * item?.decs2 * item?.decs3 || 0).toString()),
        };
      },
      {v1: 0, v2: 0},
    );
    console.log(info.v1)
    console.log(info.v2)
    setV1(info.v1)
    // @ts-ignore
    setV2(info.v2)
  }

  // getInfo();
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          paddingBlockEnd: 16,
          margin: 20
        }}
      >
        <div style={{flex: 1, fontSize: '20px'}}>推荐功率：{getV1(v1)}</div>
        <div style={{flex: 1, fontSize: '20px'}}>推荐电池：{getV2(v2)}</div>
      </div>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="设备列表"
        // maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          {
            position: position as 'top',
            record: () => ({id: (Math.random() * 1000000).toFixed(0)}),
          }
        }
        loading={false}
        toolBarRender={() => [
          // <div>
          //   {'aaa'}
          //   {'aaa'}
          // </div>
        ]}
        columns={columns}
        request={async () => {
          initInfo()
          return {
            data: defaultData,
            total: defaultData.length,
            success: true,
          }
        }}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            getInfo();
          },
          onChange: setEditableRowKeys,
          actionRender: (row, config, defaultDom) => [
            defaultDom.save,
            defaultDom.cancel,
          ],
        }}
      />
      {/*<ProCard title="表格数据" headerBordered collapsible defaultCollapsed>*/}
      {/*  <ProFormField*/}
      {/*    ignoreFormItem*/}
      {/*    fieldProps={{*/}
      {/*      style: {*/}
      {/*        width: '100%',*/}
      {/*      },*/}
      {/*    }}*/}
      {/*    mode="read"*/}
      {/*    valueType="jsonCode"*/}
      {/*    text={JSON.stringify(dataSource)}*/}
      {/*  />*/}
      {/*</ProCard>*/}
    </>
  );
}
