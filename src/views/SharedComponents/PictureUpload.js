import React from 'react';
import { Card, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const PictureUpload = ({ picture, changeHandler }) => {
    const uploadProps = {
        name: 'file',
        action: `${process.env.REACT_APP_AUTH_API}/static`,
        onChange: changeHandler,
        showUploadList: false,
    };

    return (
        <Upload {...uploadProps}>
    <Card
        style={{ width: 240, border: '0.5px solid #eee', position: 'relative' }}
    >
        <Button 
            type="primary" 
            icon={<UploadOutlined />} 
            style={{ position: 'absolute', bottom: 10, left: 10 }}
        >
            Upload
        </Button>
    </Card>
</Upload>

    );
}

export default PictureUpload;
