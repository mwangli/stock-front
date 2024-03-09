import React from 'react';
import {InboxOutlined} from '@ant-design/icons';
import type {UploadProps} from 'antd';
import {message, Upload} from 'antd';
import {upload} from '@/services/ant-design-pro/api';

const {Dragger} = Upload;

function getNowDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  const hours = ('0' + now.getHours()).slice(-2);
  const minutes = ('0' + now.getMinutes()).slice(-2);
  const seconds = ('0' + now.getSeconds()).slice(-2);
  return year + month + day + hours + minutes + seconds;
}


const props: UploadProps = {
  name: 'file',
  multiple: true,
  // action: upload,
  onChange(info) {
    const {status} = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      upload(info.file).then(res => {
        message.success(`file uploaded successfully. total is ${res.data}`);
        // download({}).then((blob) => {
        // let reader = new FileReader(); // 创建一个file对象
        // // @ts-ignore
        // reader.readAsDataURL(res);  // 转换为base64，可以直接放入a标签的href
        // reader.onload = function (e: any) {
        //   // 转换完成，创建一个a标签用于下载
        //   let a = document.createElement('a');
        //   a.download = "test-" + getNowDate() + ".xlsx";
        //   a.href = e.target.result;
        //   // 在body中插入a元素
        //   document.body.insertAdjacentElement('afterend', a);
        //   a.click();
        //   a.remove();
        // }
        // })
      })
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },

};

const App: React.FC = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined/>
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
);

export default App;
