import {InfoCircleOutlined} from '@ant-design/icons';
import {Progress, TinyArea, TinyColumn} from '@ant-design/charts';
import {Col, Row, Tooltip} from 'antd';

import numeral from 'numeral';
import {ChartCard, Field} from './Charts';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
// import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {marginBottom: 24},
};

const IntroduceRow = ({loading, visitData}: { loading: boolean; visitData: any }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="今日收益金额"
        action={
          <Tooltip title="今日收益金额">
            <InfoCircleOutlined/>
          </Tooltip>
        }
        loading={loading}
        total={`￥${numeral(visitData?.income).format('0.00')}`}
        footer={<Field label="昨日收益金额:" value={`${numeral(visitData?.preIncome).format('0.00')}元`}/>}
        contentHeight={46}
      >
        {/*<Trend flag="up" style={{ marginRight: 16 }}>*/}
        {/*  周同比*/}
        {/*  <span className={styles.trendText}>12%</span>*/}
        {/*</Trend>*/}
        <Trend flag={visitData?.income - visitData?.preIncome> 0 ? "up" : "down"}>
          比较昨日
          <span
            className={''}>{numeral((visitData?.income - visitData?.preIncome)).format('0.00')}</span>
        </Trend>
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="累计收益金额"
        action={
          <Tooltip title="累计收益金额">
            <InfoCircleOutlined/>
          </Tooltip>
        }
        // total={<span style={{color:"red"}}>{`￥${numeral(visitData?.totalIncome).format('0.00')}`}</span>}
        total={`￥${numeral(visitData?.totalIncome).format('0.00')}`}
        footer={<Field label="平均收益金额:" value={`${numeral(visitData?.avgIncome).format('0,0')}元`}/>}
        contentHeight={46}
      >
        <TinyColumn xField="x" height={46} forceFit yField="y" data={visitData?.incomeList}

        />

      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="收益率"
        action={
          <Tooltip title="收益率">
            <InfoCircleOutlined/>
          </Tooltip>
        }
        total={`${numeral(visitData?.incomeRate).format('0.0000')}%`}
        footer={<Field label="平均收益率:" value={`${numeral(visitData?.avgRate).format('0.0000')}%`}/>}
        contentHeight={46}
      >
        <TinyArea
          color="#975FE4"
          xField="x"
          height={46}
          forceFit
          yField="y"
          smooth
          data={visitData?.rateList}
        />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="资金利用率"
        action={
          <Tooltip title="资金利用率">
            <InfoCircleOutlined/>
          </Tooltip>
        }
        total={`${numeral(visitData?.accountInfo?.usedAmount/visitData?.accountInfo?.totalAmount*100).format('0.00')} %`}
        footer={
          <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
            <Trend style={{marginRight: 16}}>
              持仓金额:
              <span
                className={''}>{`${numeral(visitData?.accountInfo?.usedAmount).format('0.00')}元`}</span>
            </Trend>
            <Trend>
              空闲金额:
              <span className={''}>{`${numeral(visitData?.accountInfo?.availableAmount).format('0.00')}元`}</span>
            </Trend>
          </div>
        }
        contentHeight={46}
      >
        <Progress
          height={46}
          percent={visitData?.accountInfo?.usedAmount/visitData?.accountInfo?.totalAmount}
          color="#13C2C2"
          forceFit
          size={8}
          marker={[
            {
              value: 0.8,
              style: {
                stroke: '#13C2C2',
              },
            },
          ]}
        />
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
