import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Table, Tooltip } from 'antd';
import { TinyArea } from '@ant-design/charts';
import React from 'react';
import numeral from 'numeral';
import type { DataItem } from '../data';

import NumberInfo from './NumberInfo';
import Trend from './Trend';
import styles from '../style.less';

const columns = [
  {
    title: '排名',
    dataIndex: 'index',
    key: 'index',
    render: (text: React.ReactNode, record: { status: number }, index: number) => (
      // <Trend flag={record.status === 1 ? 'down' : 'up'}>
      //   <span style={{ marginRight: 4 }}>{text}%</span>
      // </Trend>
      `${index+1}`
    ),
  },
  {
    title: '股票信息',
    dataIndex: 'x',
    key: 'x',
    render: (text: React.ReactNode) => <a href="/list">{text}</a>,
  },
  {
    title: '收益金额',
    dataIndex: 'y',
    key: 'y',
    // sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
    // className: styles.alignRight,
    render: (text: React.ReactNode, record: { status: number }) => (
      // <Trend flag={record.status === 1 ? 'down' : 'up'}>
      //   <span style={{ marginRight: 4 }}>{text}%</span>
      // </Trend>
      `${numeral(text).format('0.00')}元`
    ),
  },
  {
    title: '持有天数',
    dataIndex: 't',
    key: 't',
    render: (text: React.ReactNode) => `${text}天`,
  },
  {
    title: '日收益率',
    dataIndex: 'z',
    key: 'z',
    // sorter: (a: { range: number }, b: { range: number }) => a.range - b.range,
    render: (text: React.ReactNode, record: { status: number }) => (
      // <Trend flag={record.status === 1 ? 'down' : 'up'}>
      //   <span style={{ marginRight: 4 }}>{text}%</span>
      // </Trend>
      `${text}%`
    ),
  },
];

const TopSearch = ({
  loading,
  visitData2,
  searchData,
  dailyIncomeRate,
  dropdownGroup,
}: {
  loading: boolean;
  visitData2: any;
  dailyIncomeRate: any;
  dropdownGroup: React.ReactNode;
  searchData: DataItem[];
}) => (
  <Card
    loading={loading}
    bordered={false}
    title="日收益率统计"
    extra={dropdownGroup}
    style={{
      height: '100%',
    }}
  >
    <Row gutter={68}>
      <Col sm={24} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          // subTitle={
          //   <span>
          //     日收益率趋势
          //     {/*<Tooltip title="日收益率趋势">*/}
          //     {/*  <InfoCircleOutlined style={{ marginLeft: 8 }} />*/}
          //     {/*</Tooltip>*/}
          //   </span>
          // }
          // gap={8}
          total={`${numeral(dailyIncomeRate).format('0.0000')}%`}
          // status="up"
          // subTotal={17.1}
        />
        <TinyArea  height={108}  smooth data={visitData2?.map((i:any) => {return i.y})} color={''} />
      </Col>
      {/*<Col sm={12} xs={24} style={{ marginBottom: 24 }}>*/}
      {/*  <NumberInfo*/}
      {/*    subTitle={*/}
      {/*      <span>*/}
      {/*        日收益率趋势*/}
      {/*        <Tooltip title="日收益率趋势">*/}
      {/*          <InfoCircleOutlined style={{ marginLeft: 8 }} />*/}
      {/*        </Tooltip>*/}
      {/*      </span>*/}
      {/*    }*/}
      {/*    total={2.7}*/}
      {/*    status="down"*/}
      {/*    subTotal={26.2}*/}
      {/*    gap={8}*/}
      {/*  />*/}
      {/*  <TinyArea xField="x" height={45} forceFit yField="y" smooth data={visitData2} />*/}
      {/*</Col>*/}
    </Row>
    <Table<any>
      rowKey={(record) => record.index}
      size="small"
      columns={columns}
      dataSource={searchData}
      pagination={false}
      // pagination={{
      //   style: { marginBottom: 0 },
      //   pageSize: 5,
      // }}
    />
  </Card>
);

export default TopSearch;
