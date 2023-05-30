// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取交易记录 GET /api/listFoundTrading */
export async function listFoundTrading(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    name?: string;
    code?: string;
  },
  sort: any,
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/foundTrading', {
    method: 'GET',
    params: {
      ...params,
      sortKey: Object.keys(sort)[0],
      sortOrder: Object.values(sort)[0],
    },
    ...(options || {}),
  });
}

/** 获取交易记录 GET /api/listFoundTrading */
export async function listStockInfo(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    name?: string;
    code?: string;
  },
  sort: any,
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/stockInfo', {
    method: 'GET',
    params: {
      ...params,
      sortKey: Object.keys(sort)[0],
      sortOrder: Object.values(sort)[0],
    },
    ...(options || {}),
  });
}

/** 获取定时任务 GET /api/job */
export async function listJob(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    name?: string;
    code?: string;
  },
  // sort: any,
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/job', {
    method: 'GET',
    params: {
      ...params,
      // sortKey: Object.keys(sort)[0],
      // sortOrder: Object.values(sort)[0],
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/job/run', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function createJob(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/job', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function modifyJob(options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/api/job', {
    method: 'PUT',
    ...(options || {}),
  });
}

export async function deleteJob(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/job', {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function runJob(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/job/run', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function pauseJob(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/job/pause', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function resumeJob(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/job/resume', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function createStrategy(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/strategy', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function modifyStrategy(options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/api/strategy', {
    method: 'PUT',
    ...(options || {}),
  });
}

export async function chooseStrategy(options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/api/strategy/choose', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function deleteStrategy(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/strategy', {
    method: 'DELETE',
    ...(options || {}),
  });
}
/** 获取定时任务 GET /api/job */
export async function listStrategy(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    name?: string;
    code?: string;
  },
  sort: any,
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/strategy', {
    method: 'GET',
    params: {
      ...params,
      sortKey: Object.keys(sort)[0],
      sortOrder: Object.values(sort)[0],
    },
    ...(options || {}),
  });
}
