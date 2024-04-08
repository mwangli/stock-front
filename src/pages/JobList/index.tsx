import {
  createJob,
  deleteJob,
  listJob,
  modifyJob,
  pauseJob,
  interruptJob,
  resumeJob,
  runJob
} from '@/services/ant-design-pro/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import {FormattedMessage, useIntl} from '@umijs/max';
import {Button, Input, message} from 'antd';
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
  const hide = message.loading('正在创建任务...');
  try {
    await createJob({data: fields});
    hide();
    message.success('任务创建成功！');
    return true;
  } catch (error) {
    hide();
    // message.error('任务创建失败');
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
  const hide = message.loading('正在修改任务...');
  try {
    await modifyJob({data: fields});
    hide();
    message.success('任务修改成功！');
    return true;
  } catch (error) {
    hide();
    // message.error('任务修改失败！');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (fields: FormValueType) => {
  const hide = message.loading('正在删除任务...');
  try {
    await deleteJob({data: fields});
    hide();
    message.success('删除任务成功！');
    return true;
  } catch (error) {
    hide();
    // message.error('删除任务失败！');
    return false;
  }
};


const handlePause = async (fields: FormValueType) => {
  const hide = message.loading('正在停止任务...');
  try {
    await pauseJob({data: fields});
    hide();
    message.success('停止任务成功！');
    return true;
  } catch (error) {
    hide();
    // message.error('停止任务失败！');
    return false;
  }
};

const handleInterrupt = async (fields: FormValueType) => {
  const hide = message.loading('正在终止任务...');
  try {
    await interruptJob({data: fields});
    hide();
    message.success('终止任务成功！');
    return true;
  } catch (error) {
    hide();
    // message.error('终止任务失败！');
    return false;
  }
};

const handleResume = async (fields: FormValueType) => {
  const hide = message.loading('正在恢复任务...');
  try {
    await resumeJob({data: fields});
    hide();
    message.success('恢复任务成功！');
    return true;
  } catch (error) {
    hide();
    // message.error('恢复任务失败！');
    return false;
  }
};

const handleRun = async (fields: FormValueType) => {
  const hide = message.loading(`${fields.name},正在触发任务...`);
  try {
    await runJob({data: fields});
    hide();
    message.success(`${fields.name},触发任务成功！`);
    return true;
  } catch (error) {
    hide();
    // message.error(`${fields.name},触发任务失败！`);
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [resetModal, setResetModal] = useState<boolean>(false);
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

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.jobId"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'sort',
      hideInSearch: true,
      // hideInTable: true,
      tip: 'The jobId is the unique key',
      // render: (dom, entity, index) => {
      //   return (
      //     // <a
      //     //   onClick={() => {
      //     //     setCurrentRow(entity);
      //     //     // setShowDetail(true);
      //     //   }}
      //     // >
      //     <span>
      //           {}
      //     </span>
          // </a>
        // );
      // },
    },

    {
      title: <FormattedMessage id="pages.searchTable.jobName" defaultMessage="Description"/>,
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.jobClassName" defaultMessage="Description"/>,
      dataIndex: 'className',
      valueType: 'textarea',
      render: (dom, entity, index) => {
        let split = entity?.className.split(".");
        let lastPart = split[split.length - 1];
        // debugger
        return (
          // <a
          //   onClick={() => {
          //     setCurrentRow(entity);
          //     // setShowDetail(true);
          //   }}
          // >
          <span>
              {`**.*.${lastPart}`}
          </span>)
      }
    },
    {
      title: <FormattedMessage id="pages.searchTable.jobDescription" defaultMessage="Description"/>,
      dataIndex: 'description',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.jobCronExpression" defaultMessage="Description"/>,
      dataIndex: 'cron',
      valueType: 'textarea',
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
      renderFormItem: (item, {defaultRender, ...rest}, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return (
            <Input
              {...rest}
              placeholder={intl.formatMessage({
                id: 'pages.searchTable.exception',
                defaultMessage: 'Please enter the reason for the exception!',
              })}
            />
          );
        }
        return defaultRender(item);
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.jobStatus" defaultMessage="Status"/>,
      dataIndex: 'status',
      hideInForm: true,
      order: 1,
      sorter: true,
      valueEnum: (a) => {
        return a?.running == '1' ? {
            0: {
              text: '运行中',
              status: 'Processing',
            },
            1: {
              text: '运行中',
              status: 'Processing',
            }
          } :
          {
            1: {
              text: '调度中',
              status: 'Success',
            },
            0: {
              text: '已暂停',
              status: 'Error',
            }
          }
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating"/>,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a key="k1"
           onClick={async () => {
             // setCurrentRow(record);
             // if (record.running == "1") {
             //   const success = await handleInterrupt(record)
             //   if (success) {
             //     if (actionRef.current) {
             //       actionRef.current.reload();
             //     }
             //   }
             // } else {
               const success = await handleRun(record)
               if (success) {
                 if (actionRef.current) {
                   actionRef.current.reload();
                 }
               }
             // }
           }}
        >{record.running == '1' ? '触发' : '触发'}
        </a>,
        <a
          key="k2"
          onClick={async (_) => {
            setCurrentRow(record);
            if (record.status == "1") {
              const success = await handlePause(record)
              if (success) {
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            } else {
              const success = await handleResume(record)
              if (success) {
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }
            actionRef?.current?.reload()
          }}
        >
          <FormattedMessage id={record.status == "1" ? "pages.searchTable.stopJob" : "pages.searchTable.startJob"}
                            defaultMessage="Configuration"/>
        </a>,
        <a key="k3"
           onClick={() => {
             setCurrentRow(record)
             handleUpdateModalOpen(true);
           }}
        >
          <FormattedMessage
            id="pages.searchTable.updateJob"
            defaultMessage="Subscribe to alerts"
          />
        </a>,
        <a key="k4"
           onClick={async () => {
             setCurrentRow(record);
             const success = await handleRemove(record);
             if (success) {
               if (actionRef.current) {
                 actionRef.current.reload();
               }
             }
           }}
        >
          <FormattedMessage
            id="pages.searchTable.deleteJob"
            defaultMessage="Subscribe to alerts"
          />
        </a>,
      ],
    }
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
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
        request={listJob}
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
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="520px"
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
        <ProFormDigit width="md" name="sort"
                      label={'任务排序'}
                      initialValue={0}
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '任务名称为必填项',
            },
          ]}
          width="md"
          name="name"
          label={intl.formatMessage({
            id: 'pages.searchTable.jobName',
            defaultMessage: '任务名称',
          })}
        />
        <ProFormTextArea width="md" name="description" label={intl.formatMessage({
          id: 'pages.searchTable.jobDescription',
          defaultMessage: '任务描述',
        })}/>
        <ProFormTextArea width="md" name="className"
                         label={intl.formatMessage({
                           id: 'pages.searchTable.jobClassName',
                           defaultMessage: '任务全类名',
                         })}
                         rules={[
                           {
                             required: true,
                             message: '任务全类名为必填项',
                           }]}/>
        <ProFormText width="md" name="cron"
                     label={intl.formatMessage({
                       id: 'pages.searchTable.jobCronExpression',
                       defaultMessage: '执行表达式',
                     })}
                     rules={[
                       {
                         required: true,
                         message: (
                           <FormattedMessage
                             id="pages.modalForm.message.cron"
                             defaultMessage="jobCronExpression is required"
                           />
                         ),
                       }]}
                     initialValue={"0 0 9-15 * * ?"}
        />

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
