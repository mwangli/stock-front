import { request } from 'umi';
import type { AnalysisData } from './data';

export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return request('/api/foundTrading/analysis');
}

//
// export async function fakeChartData(
//   params: {
//     startDate: String,
//     endDate: String,
//   },
//   sort: any,
//   options?: { [key: string]: any },
// ) {
//   return request<AnalysisData>('/api/foundTrading/analysis', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }
