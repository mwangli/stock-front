import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Modal } from 'antd';
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
            width={520}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title={intl.formatMessage({
              id: 'pages.searchTable.updateForm.jobConfig',
              defaultMessage: '任务配置',
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
        // initialValues={{
        //   name: props.values.name,
        //   desc: props.values.desc,
        // }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.searchTable.jobName',
            defaultMessage: '任务名称',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.modalForm.message.jobName"
                  defaultMessage="任务名称必须填写！"
                />
              ),
            },
          ]}
        />
        <ProFormTextArea
          name="description"
          width="md"
          label={intl.formatMessage({
            id: 'pages.searchTable.jobDescription',
            defaultMessage: '任务描述',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.searchTable.placeholder.jobDesc',
            defaultMessage: '请输入任务描述信息',
          })}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        // initialValues={{
        //   name: props.values.name,
        //   desc: props.values.desc,
        // }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.scheduleConfig',
          defaultMessage: '任务调度配置',
        })}
      >
        <ProFormText
          name="cron"
          label={intl.formatMessage({
            id: 'pages.searchTable.jobCronExpression',
            defaultMessage: '执行表达式',
          })}
          initialValue={"0/5 * * * * ?"}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.modalForm.message.cron"
                  defaultMessage="执行表达式必须填写！"
                />
              ),
            },
          ]}
        />
        <ProFormTextArea
          name="className"
          width="md"
          label={intl.formatMessage({
            id: 'pages.searchTable.jobClassName',
            defaultMessage: '任务全类名',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.searchTable.placeholder.jobClassName',
            defaultMessage: '',
          })}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
