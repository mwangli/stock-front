import {PageContainer} from '@ant-design/pro-components';
import {useModel} from '@umijs/max';
import {Card, theme} from 'antd';
import React, {useState} from 'react';


/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({title, href, index, desc}) => {
  const {useToken} = theme;

  const {token} = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  const {token} = theme.useToken();
  const {initialState} = useModel('@@initialState');

  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 Found-Trading System
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            Found-Trading System是一款自动化股票交易管理软件，<br/>
            可以按照自定义交易策略，进行自动化的股票买卖交易；<br/>
            也可以查看股票历史价格，实时价格，买卖记录和相关报表数据<br/>
            <span>2023-06-03</span> <br/>
            1. 修复日期差计算bug <br/>
            2. 新增运行日志查询页面 <br/>
            <span>2023-06-04</span> <br/>
            3. 解决了日志查询滚动条固定到底部的问题 <br/>
            <span>2023-06-06</span> <br/>
            4. 优化买入金额问题 <br/>
            <span>2023-06-09</span> <br/>
            5. 增加取消订单的结果查询 <br/>
            6. 增加数据分时时段查询功能 <br/>
            <span>2023-06-10</span> <br/>
            7. 线程池任务执行异常问题修复 <br/>
            8. 验证码登录功能实现优化 <br/>
            <span>2023-06-11</span> <br/>
            9. HttpClient-FormData表单提交优化 <br/>
            10. 自动登陆功能实现 <br/>
            <span>2023-06-14</span> <br/>
            11. 买卖时机策略优化 <br/>
            12. 增加终止任务功能 <br/>
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="https://umijs.org/docs/introduce/introduce"
              title="了解 umi"
              desc="umi 是一个可扩展的企业级前端应用框架,umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。"
            />
            <InfoCard
              index={2}
              title="了解 ant design"
              href="https://ant.design"
              desc="antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。"
            />
            <InfoCard
              index={3}
              title="了解 Pro Components"
              href="https://procomponents.ant.design"
              desc="ProComponents 是一个基于 Ant Design 做了更高抽象的模板组件，以 一个组件就是一个页面为开发理念，为中后台开发带来更好的体验。"
            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
