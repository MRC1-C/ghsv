import { ArrowDownOutlined, CloseOutlined, InboxOutlined, SwapOutlined } from '@ant-design/icons'
import { Button, Image, message, Skeleton, Upload, UploadFile, UploadProps } from 'antd'
import { UploadChangeParam } from 'antd/es/upload';
import React, { useState } from 'react'
import type { RcFile } from 'antd/es/upload/interface';
const { Dragger } = Upload;
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const ProdResuscitate = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [result, setResult] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false)


  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("sdf");
    }, 10000);
  });

  const handleSwap = async () => {
    setLoading(true)
    myPromise
      .then(data => setResult(data as string))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    let src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(info.file.originFileObj as RcFile);
      reader.onload = () => resolve(reader.result as string);
    });
    setImageUrl(src as string)
  };
  return (
    <div className='gap-4 columns-1 xl:grid xl:grid-cols-11 container m-auto'>
      <div className='p-4 col-span-5'>
        <div className="w-full aspect-square">
          {imageUrl ?
            (
              <div className='flex flex-col aspect-square items-center w-full'>
                <Image width={'100%'} className='aspect-square object-cover rounded-2xl shadow-xl' src={imageUrl}> </Image>
                <Button className='mt-5' onClick={() => { setImageUrl(''); setResult('') }}><CloseOutlined />Clear</Button>
              </div>
            )
            :
            <div className='w-full aspect-square object-cover rounded-2xl shadow-xl'>
              <Dragger
                showUploadList={false}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                className="w-full h-full"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                  band files
                </p>
              </Dragger>
            </div>
          }

        </div>
      </div>
      <div className='col-span-1 flex justify-center items-center'>
        <Button type='primary' onClick={() => handleSwap()} disabled={!imageUrl}>
          <SwapOutlined />
        </Button>
      </div>
      <div className='p-4 col-span-5 aspect-square flex flex-col items-center rounded-2xl'>
        {
          result ?
            <Image className='w-full aspect-square object-cover rounded-2xl shadow-md' src='https://tapchilamdep.com/wp-content/uploads/2019/10/Rose-887x1024.jpg'> </Image>
            :
            <Skeleton.Image className='!w-full !h-full !rounded-2xl shadow-xl' active={loading} />
        }
        {
          !!result ?
            <Button className='mt-5'><ArrowDownOutlined />Download</Button>
            : null
        }
      </div>
    </div>
  )
}

export default ProdResuscitate