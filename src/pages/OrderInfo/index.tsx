import {addRule, listOrderInfo, removeRule, updateRule} from '@/services/ant-design-pro/api';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import {FormattedMessage, useIntl} from '@umijs/max';
import {Button, Drawer, Input, message, Modal} from 'antd';
import React, {useRef, useState} from 'react';
import type {FormValueType} from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import numeral from "numeral";
import {Area} from "@ant-design/charts";
import {history} from "@@/core/history";

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({...fields});
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
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
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
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

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOpen2, setModalOpen2] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  // 初始化路径参数中的code
  const code: string = history.location.search.split("code=")[1]

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.nameLabel"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'code',
      initialValue: code,
      // tip: 'The stock code is the unique key',
      // render: (dom, entity) => {
      //   return (
      //     <a
      //       onClick={() => {
      //         setCurrentRow(entity);
      //         // setShowDetail(true);
      //       }}
      //     >
      //       {dom}
      //     </a>
      //   );
      // },
    },
    {
      title: '股票名称',
      dataIndex: 'name',
      valueType: 'textarea',
    },

    {
      title: '订单类型',
      dataIndex: 'type',
      valueType: 'textarea',
    },
    {
      title: '订单编号',
      dataIndex: 'answerNo',
      valueType: 'textarea',
    },
    {
      title: '订单日期',
      dataIndex: 'date',
      valueType: 'textarea',
    },
    // {
    //   title: '订单金额',
    //   dataIndex: 'price',
    //   valueType: 'textarea',
    // },
    {
      title: '订单数量',
      dataIndex: 'number',
      valueType: 'textarea',
    },
    // {
    //   title: '订单状态',
    //   dataIndex: 'status',
    //   valueType: 'textarea',
    //   hideInSearch: true,
    // },
    // {
    //   title: <FormattedMessage id="pages.searchTable.market" defaultMessage="market"/>,
    //   dataIndex: 'market',
    //   valueType: 'textarea',
    //   hideInSearch: true,
    // },
    // {
    //   title: '价格区间',
    //   dataIndex: 'priceRange',
    //   valueType: 'digitRange',
    //   hideInTable: true,
    // },
    // {
    //   title: '交易次数',
    //   dataIndex: 'buySaleCount',
    //   valueType: 'digit',
    //   hideInTable: true,
    // },
    // {
    //   title: '最低价格',
    //   dataIndex: 'priceLow',
    //   valueType: 'digit',
    //   hideInTable: true,
    // },
    // {
    //   title: '最高价格',
    //   dataIndex: 'priceHigh',
    //   valueType: 'digit',
    //   hideInTable: true,
    // },
    {
      title: '订单价格',
      dataIndex: 'price',
      valueType: 'textarea',
      hideInSearch: true,
      sorter: true,
      renderText: (val: string) =>
        val ? `${val}${intl.formatMessage({
          id: 'pages.searchTable.yuan',
          defaultMessage: ' 元 ',
        })}` : '-',
    },

    {
      title: '订单状态',
      dataIndex: 'status',
      hideInForm: true,
      // order: 1,
      // sorter: true,
      valueEnum: {
        // 2: {
        //   text: (
        //     <FormattedMessage
        //       id="pages.searchTable.nameStatus.default"
        //       defaultMessage="Shut down"
        //     />
        //   ),
        //   status: 'Default',
        // },
        1: {
          text: '已成交',
          status: 'Success',
        },
        0: {
          text: '未成交',
          status: 'Error',
        },
      },
    },
    // {
    //   title: <FormattedMessage id="pages.searchTable.increase" defaultMessage="Description"/>,
    //   dataIndex: 'increase',
    //   valueType: 'textarea',
    //   hideInSearch: true,
    //   sorter: true,
    //   renderText: (val: string) =>
    //     val != null ? `${val} %` : '-',
    // },
    // {
    //   title: <FormattedMessage id="pages.searchTable.income" defaultMessage="income"/>,
    //   dataIndex: 'aa',
    //   sortDirections: [],
    //   hideInForm: true,
    //   hideInSearch: true,
    //   sorter: true,
    //   renderText: (val: string) =>
    //     val ? `${val}${intl.formatMessage({
    //       id: 'pages.searchTable.yuan',
    //       defaultMessage: ' 元 ',
    //     })}` : '-',
    // },
    // {
    //   title: <FormattedMessage id="pages.searchTable.buySaleCount" defaultMessage="交易次数"/>,
    //   dataIndex: 'buySaleCount',
    //   hideInSearch: true,
    //   valueType: 'textarea',
    //   sorter: true,
    //   renderText: (val: string) =>
    //     val != null ? `${val}${intl.formatMessage({
    //       id: 'pages.searchTable.count',
    //       defaultMessage: ' 次 ',
    //     })}` : '-',
    // },
    // {
    //   title: <FormattedMessage id="pages.searchTable.permission" defaultMessage="交易权限"/>,
    //   dataIndex: 'permission',
    //   // hideInForm: true,
    //   order: 1,
    //   sorter: true,
    //   valueEnum: {
    //     // 2: {
    //     //   text: (
    //     //     <FormattedMessage
    //     //       id="pages.searchTable.nameStatus.default"
    //     //       defaultMessage="Shut down"
    //     //     />
    //     //   ),
    //     //   status: 'Default',
    //     // },
    //     1: {
    //       text: <FormattedMessage id="pages.searchTable.permission.allow" defaultMessage="sold"/>,
    //       status: 'Processing',
    //     },
    //     0: {
    //       text: (
    //         <FormattedMessage id="pages.searchTable.permission.forbidden" defaultMessage="notSold"/>
    //       ),
    //       status: 'Error',
    //     },
    //   },
    // },
    // {
    //   title: <FormattedMessage id="pages.searchTable.score" defaultMessage="score"/>,
    //   dataIndex: 'score',
    //   sorter: true,
    //   hideInForm: true,
    //   hideInSearch: true,
    //   renderText: (val: string) =>
    //     val != null ? `${numeral(val).format('0.00')} 分`
    //       : '-',
    // },
    {
      title: <FormattedMessage id="pages.searchTable.createTime" defaultMessage="Description"/>,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      // hideInTable: true,
      sorter: true,
    },
    // {
    //   title: (
    //     <FormattedMessage id="pages.searchTable.updateTime" defaultMessage="Last updateTime"/>
    //   ),
    //   sorter: true,
    //   dataIndex: 'updateTime',
    //   valueType: 'dateTime',
    //   hideInSearch: true,
    //   renderFormItem: (item, {defaultRender, ...rest}, form) => {
    //     const status = form.getFieldValue('status');
    //     if (`${status}` === '0') {
    //       return false;
    //     }
    //     if (`${status}` === '3') {
    //       return (
    //         <Input
    //           {...rest}
    //           placeholder={intl.formatMessage({
    //             id: 'pages.searchTable.exception',
    //             defaultMessage: 'Please enter the reason for the exception!',
    //           })}
    //         />
    //       );
    //     }
    //     return defaultRender(item);
    //   },
    // },

    // {
    //   title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating"/>,
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => [
    //     <a
    //       key="config"
    //       onClick={() => {
    //         // handleUpdateModalOpen(true);
    //         setCurrentRow(record);
    //         setModalOpen(true);
    //       }}
    //     >
    //       <FormattedMessage id="pages.searchTable.priceList" defaultMessage="价格曲线"/>
    //     </a>,
    //     <a key="subscribeAlert"
    //        onClick={() => {
    //          // handleUpdateModalOpen(true);
    //          setCurrentRow(record);
    //          setModalOpen2(true);
    //        }}>
    //       <FormattedMessage
    //         id="pages.searchTable.rateList" defaultMessage="日增长率曲线"
    //       />
    //     </a>,
    //   ],
    // },
  ];

  // const dropdownGroup = (
  //   <span className={styles.iconGroup}>
  //     <Dropdown overlay={menu} placement="bottomRight">
  //       <EllipsisOutlined/>
  //     </Dropdown>
  //   </span>
  // );

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.orderInfoList',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // 新建按钮
          // <Button
          //   type="primary"
          //   key="primary"
          //   onClick={() => {
          //     handleModalOpen(true);
          //   }}
          // >
          //   <PlusOutlined/> <FormattedMessage id="pages.searchTable.new" defaultMessage="New"/>
          // </Button>,
        ]}
        request={listOrderInfo}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen"/>{' '}
              <a style={{fontWeight: 600}}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项"/>
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万"/>
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}


      <Modal
        width={1200}
        bodyStyle={{padding: '32px 40px 48px'}}
        destroyOnClose
        title={intl.formatMessage({
          id: 'pages.searchTable.pricesList',
          defaultMessage: '价格趋势',
        })}

        open={modalOpen}
        footer={null}
        onCancel={() => {
          setModalOpen(false);
        }}
      >

        <Area
          smooth
          height={420}
          data={currentRow?.pricesList || []}
          xField="date"
          yField="item"
          meta={{
            date: {
              alias: '交易日期',
            },
            item: {
              alias: '开盘价格(元)',
              max: currentRow?.maxPrice,
              min: currentRow?.minPrice,
              // maxLimit: currentRow?.maxPrice,
              // minLimit: currentRow?.minPrice,
            },
          }}
        />
      </Modal>


      <Modal
        width={1200}
        bodyStyle={{padding: '32px 40px 48px'}}
        destroyOnClose
        title={intl.formatMessage({
          id: 'pages.searchTable.pricesList',
          defaultMessage: '日增长率',
        })}

        open={modalOpen2}
        footer={null}
        onCancel={() => {
          setModalOpen2(false);
        }}
      >

        <Area
          smooth
          height={420}
          data={currentRow?.increaseRateList || []}
          xField="date"
          yField="item"
          meta={{
            date: {
              alias: '交易日期',
            },
            item: {
              alias: '日增长率(%)',
              // max: currentRow?.maxPrice,
              // min: currentRow?.minPrice,
              maxLimit: currentRow?.maxRate,
              minLimit: currentRow?.minRate,
            },
          }}
        />
      </Modal>

      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
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

        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc"/>
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


      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
