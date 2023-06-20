import {ProFormSwitch, ProFormText, ProFormTextArea, ProFormSelect, StepsForm,} from '@ant-design/pro-components';
import {FormattedMessage, useIntl} from '@umijs/max';
import {Modal} from 'antd';
import React from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.RuleListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  return (
    <StepsForm
      stepsProps={{
        size: 'default',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{padding: '32px 40px 48px'}}
            destroyOnClose
            title={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleConfig',
              defaultMessage: '规则配置',
            })}
            open={props.updateModalOpen}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={props.values}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormTextArea width="md" name="id" hidden initialValue={props.values?.id}/>

        <ProFormText width="md" name="id" hidden={true}/>

        <ProFormText width="md" name="sort" label={"任务排序"}/>
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
                             message: (
                               <FormattedMessage
                                 id="pages.modalForm.message.className"
                                 defaultMessage="className is required"
                               />
                             ),
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
        />
        <ProFormTextArea width="md" name="token"
                         label={intl.formatMessage({
                           id: 'pages.searchTable.token',
                           defaultMessage: 'token',
                         })}
                         hidden={true}
        />
        <ProFormSelect
          width="md"
          name="logSwitch"
          label="是否开启接口日志"
          initialValue={''}
          valueEnum={{
            open: '开启',
            close: '关闭',
          }}
          placeholder="默认关闭"
        />
        <ProFormSelect
          width="md"
          name="waiting"
          label="是否启用时机等待"
          initialValue={''}
          valueEnum={{
            waiting: '启用',
            cancel: '取消',
          }}
          placeholder="默认启用"
        />
        {/*<ProFormText*/}
        {/*  name="name"*/}
        {/*  label={intl.formatMessage({*/}
        {/*    id: 'pages.searchTable.updateForm.ruleName.nameLabel',*/}
        {/*    defaultMessage: '规则名称',*/}
        {/*  })}*/}
        {/*  width="md"*/}
        {/*  rules={[*/}
        {/*    {*/}
        {/*      required: true,*/}
        {/*      message: (*/}
        {/*        <FormattedMessage*/}
        {/*          id="pages.searchTable.updateForm.ruleName.nameRules"*/}
        {/*          defaultMessage="请输入规则名称！"*/}
        {/*        />*/}
        {/*      ),*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*/>*/}
        {/*<ProFormTextArea*/}
        {/*  name="desc"*/}
        {/*  width="md"*/}
        {/*  label={intl.formatMessage({*/}
        {/*    id: 'pages.searchTable.updateForm.ruleDesc.descLabel',*/}
        {/*    defaultMessage: '规则描述',*/}
        {/*  })}*/}
        {/*  placeholder={intl.formatMessage({*/}
        {/*    id: 'pages.searchTable.updateForm.ruleDesc.descPlaceholder',*/}
        {/*    defaultMessage: '请输入至少五个字符',*/}
        {/*  })}*/}
        {/*  rules={[*/}
        {/*    {*/}
        {/*      required: true,*/}
        {/*      message: (*/}
        {/*        <FormattedMessage*/}
        {/*          id="pages.searchTable.updateForm.ruleDesc.descRules"*/}
        {/*          defaultMessage="请输入至少五个字符的规则描述！"*/}
        {/*        />*/}
        {/*      ),*/}
        {/*      min: 5,*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*/>*/}
      </StepsForm.StepForm>
      {/*<StepsForm.StepForm*/}
      {/*  initialValues={{*/}
      {/*    target: '0',*/}
      {/*    template: '0',*/}
      {/*  }}*/}
      {/*  title={intl.formatMessage({*/}
      {/*    id: 'pages.searchTable.updateForm.ruleProps.title',*/}
      {/*    defaultMessage: '配置规则属性',*/}
      {/*  })}*/}
      {/*>*/}
      {/*  <ProFormSelect*/}
      {/*    name="target"*/}
      {/*    width="md"*/}
      {/*    label={intl.formatMessage({*/}
      {/*      id: 'pages.searchTable.updateForm.object',*/}
      {/*      defaultMessage: '监控对象',*/}
      {/*    })}*/}
      {/*    valueEnum={{*/}
      {/*      0: '表一',*/}
      {/*      1: '表二',*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <ProFormSelect*/}
      {/*    name="template"*/}
      {/*    width="md"*/}
      {/*    label={intl.formatMessage({*/}
      {/*      id: 'pages.searchTable.updateForm.ruleProps.templateLabel',*/}
      {/*      defaultMessage: '规则模板',*/}
      {/*    })}*/}
      {/*    valueEnum={{*/}
      {/*      0: '规则模板一',*/}
      {/*      1: '规则模板二',*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <ProFormRadio.Group*/}
      {/*    name="type"*/}
      {/*    label={intl.formatMessage({*/}
      {/*      id: 'pages.searchTable.updateForm.ruleProps.typeLabel',*/}
      {/*      defaultMessage: '规则类型',*/}
      {/*    })}*/}
      {/*    options={[*/}
      {/*      {*/}
      {/*        value: '0',*/}
      {/*        label: '强',*/}
      {/*      },*/}
      {/*      {*/}
      {/*        value: '1',*/}
      {/*        label: '弱',*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*</StepsForm.StepForm>*/}
      {/*<StepsForm.StepForm*/}
      {/*  initialValues={{*/}
      {/*    type: '1',*/}
      {/*    frequency: 'month',*/}
      {/*  }}*/}
      {/*  title={intl.formatMessage({*/}
      {/*    id: 'pages.searchTable.updateForm.schedulingPeriod.title',*/}
      {/*    defaultMessage: '设定调度周期',*/}
      {/*  })}*/}
      {/*>*/}
      {/*  <ProFormDateTimePicker*/}
      {/*    name="time"*/}
      {/*    width="md"*/}
      {/*    label={intl.formatMessage({*/}
      {/*      id: 'pages.searchTable.updateForm.schedulingPeriod.timeLabel',*/}
      {/*      defaultMessage: '开始时间',*/}
      {/*    })}*/}
      {/*    rules={[*/}
      {/*      {*/}
      {/*        required: true,*/}
      {/*        message: (*/}
      {/*          <FormattedMessage*/}
      {/*            id="pages.searchTable.updateForm.schedulingPeriod.timeRules"*/}
      {/*            defaultMessage="请选择开始时间！"*/}
      {/*          />*/}
      {/*        ),*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*  <ProFormSelect*/}
      {/*    name="frequency"*/}
      {/*    label={intl.formatMessage({*/}
      {/*      id: 'pages.searchTable.updateForm.object',*/}
      {/*      defaultMessage: '监控对象',*/}
      {/*    })}*/}
      {/*    width="md"*/}
      {/*    valueEnum={{*/}
      {/*      month: '月',*/}
      {/*      week: '周',*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</StepsForm.StepForm>*/}
    </StepsForm>
  );
};

export default UpdateForm;
