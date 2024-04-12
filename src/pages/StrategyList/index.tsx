import {
  chooseStrategy,
  createStrategy,
  deleteStrategy,
  listStrategy,
  modifyStrategy
} from '@/services/ant-design-pro/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import {FormattedMessage, useIntl} from '@umijs/max';
import {Button, message, Switch} from 'antd';
import React, {useRef, useState} from 'react';
import type {FormValueType} from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {PlusOutlined} from "@ant-design/icons";

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在创建策略...');
  try {
    await createStrategy({
      data: {
        ...fields,
        status: fields.status ? 1 : 0
      },
    });
    hide();
    message.success('策略创建成功！');
    return true;
  } catch (error) {
    hide();
    message.error('策略创建失败');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在修改策略...');
  try {
    await modifyStrategy({
      data: {
        ...fields,
        status: fields.status ? 1 : 0
      }
    });
    hide();
    message.success('策略修改成功！');
    return true;
  } catch (error) {
    hide();
    message.error('策略修改失败！');
    return false;
  }
};

const handleChoose = async (fields: FormValueType) => {
  const hide = message.loading('正在选中策略...');
  try {
    await chooseStrategy({data: fields});
    hide();
    message.success('策略选中成功！');
    return true;
  } catch (error) {
    hide();
    message.error('策略选中失败！');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param fields
 */
const handleRemove = async (fields: FormValueType) => {
  const hide = message.loading('正在删除策略...');
  try {
    await deleteStrategy({data: fields});
    hide();
    message.success('删除策略成功！');
    return true;
  } catch (error) {
    hide();
    message.error('删除策略失败！');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '策略编号',
      dataIndex: 'id',
      hideInSearch: true,
      // hideInTable: true,
      // tip: 'The StrategyId is the unique key',
      render: (dom, entity, index) => {
        return (
          // <a
          //   onClick={() => {
          //     setCurrentRow(entity);
          //     // setShowDetail(true);
          //   }}
          // >
          <span>
            {index + 1}
          </span>
          // </a>
        );
      },
    },

    {
      title: '策略名称',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '策略参数',
      dataIndex: 'params',
      valueType: 'textarea',
      // ellipsis: true,
      // tip: '； ;\r\n ',
      // tip: {<span>第一行<br/>第二行<br/>第三行</span>},
      tooltip: <span>第一个参数为前期增长率数据占比因子,数值越小，前期数据对得分影响越低，范围[0,1];<br/>
        第二个参数是价格波动容忍度，数值越小，价格波动越小，范围[1,10];<br/>
        第三个参数为参考数据范围的历史价格条数，范围[10,100]。</span>
    },
    // {
    //   title: '排序',
    //   dataIndex: 'sort',
    //   valueType: 'digit',
    //   hideInTable: true,
    //   hideInSearch: true
    // },
    {
      title: '参数说明',
      dataIndex: 'description',
      valueType: 'textarea',
      hideInSearch: true,
      // ellipsis: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.createTime" defaultMessage="Description"/>,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.updateTime" defaultMessage="Last updateTime"/>
      ),
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '选中状态',
      dataIndex: 'status',
      hideInForm: true,
      hideInTable: true,
      sorter: true,
      valueEnum: {
        1: {
          text: '已选中',
          status: 'Processing',
        },
        0: {
          text: '未选中',
          status: 'Error',
        },
      },
    },
    {
      title: '选中状态',
      dataIndex: 'status',
      valueType: 'switch',
      hideInSearch: true,
      sorter: true,
      render: (dom, record) => {
        return <Switch
          checked={record?.status}
          onChange={async () => {
            let success = await handleChoose(record);
            if (success) {
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />
      }
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating"/>,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        // <a key="k1"
        //    onClick={async () => {
        //      setCurrentRow(record);
        //      let success = await handleChoose(record);
        //      if (success) {
        //        if (actionRef.current) {
        //          actionRef.current.reload();
        //        }
        //      }
        //    }}
        // >选中
        // </a>,
        <a
          key="k2"
          onClick={async (_) => {
            setCurrentRow(record)
            handleUpdateModalOpen(true);
          }}
        >
          修改
        </a>,
        <a key="k3"
           onClick={async () => {
             setCurrentRow(record)
             const success = await handleRemove(record)
             if (success) {
               if (actionRef.current) {
                 actionRef.current.reload();
               }
             }
           }}
        >
          删除
        </a>,
      ],
    }
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'模型策略'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // 新建按钮
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined/> <FormattedMessage id="pages.searchTable.new" defaultMessage="New"/>
          </Button>,
        ]}
        request={listStrategy}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      {/*{selectedRowsState?.length > 0 && (*/}
      {/*  <FooterToolbar*/}
      {/*    extra={*/}
      {/*      <div>*/}
      {/*        <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen"/>{' '}*/}
      {/*        <a style={{fontWeight: 600}}>{selectedRowsState.length}</a>{' '}*/}
      {/*        <FormattedMessage id="pages.searchTable.item" defaultMessage="项"/>*/}
      {/*        &nbsp;&nbsp;*/}
      {/*        <span>*/}
      {/*          <FormattedMessage*/}
      {/*            id="pages.searchTable.totalServiceCalls"*/}
      {/*            defaultMessage="Total number of service calls"*/}
      {/*          />{' '}*/}
      {/*          {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}*/}
      {/*          <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万"/>*/}
      {/*        </span>*/}
      {/*      </div>*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <Button*/}
      {/*      onClick={async () => {*/}
      {/*        await handleRemove(selectedRowsState);*/}
      {/*        setSelectedRows([]);*/}
      {/*        actionRef.current?.reloadAndRest?.();*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <FormattedMessage*/}
      {/*        id="pages.searchTable.batchDeletion"*/}
      {/*        defaultMessage="Batch deletion"*/}
      {/*      />*/}
      {/*    </Button>*/}
      {/*    <Button type="primary">*/}
      {/*      <FormattedMessage*/}
      {/*        id="pages.searchTable.batchApproval"*/}
      {/*        defaultMessage="Batch approval"*/}
      {/*      />*/}
      {/*    </Button>*/}
      {/*  </FooterToolbar>*/}
      {/*)}*/}
      <ModalForm
        title={'新建策略'}
        width={"480px"}
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        modalProps={{destroyOnClose: true}}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText width="md" name="id" hidden={true}/>
        <ProFormText
          rules={[
            {
              required: true,
              message: '策略名称为必填项',
            },
          ]}
          width="md"
          name="name"
          label={'策略名称'}
        />
        <ProFormTextArea width="md" name="params"
                         label={'策略参数'}
                         initialValue={`{"preRateFactor":0.5,"priceTolerance":5,"historyLimit":50}`}
                         rules={[
                           {
                             required: true,
                             message: '策略参数为必填项',
                           },
                         ]}
        />
        <ProFormTextArea width="md" name="description"
                         label={'参数说明'}
        />
        <ProFormSwitch name={'status'} label={'是否选中'}
                       initialValue={false}
        />
        <ProFormDigit width="md" name="sort" label={'策略排序'} initialValue={10}/>

      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      {/*<Drawer*/}
      {/*  width={600}*/}
      {/*  open={showDetail}*/}
      {/*  onClose={() => {*/}
      {/*    setCurrentRow(undefined);*/}
      {/*    setShowDetail(false);*/}
      {/*  }}*/}
      {/*  closable={false}*/}
      {/*>*/}
      {/*  {currentRow?.name && (*/}
      {/*    <ProDescriptions<API.RuleListItem>*/}
      {/*      column={2}*/}
      {/*      title={currentRow?.name}*/}
      {/*      request={async () => ({*/}
      {/*        data: currentRow || {},*/}
      {/*      })}*/}
      {/*      params={{*/}
      {/*        id: currentRow?.name,*/}
      {/*      }}*/}
      {/*      columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</Drawer>*/}
    </PageContainer>
  );
};

export default TableList;
