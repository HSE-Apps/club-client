import React from 'react';
import { Card, Button, Upload, Tooltip } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const PictureUpload = ({ picture, changeHandeler }) => {
    const props = {
        name: 'file',
        action: `${process.env.REACT_APP_AUTH_API}/static`,
        onChange(info) {
            changeHandeler(info);
        },
        showUploadList: false,
    };

    const handleDelete = () => {
        changeHandeler("DELETE_ACTION"); // Reset the picture to an empty string
        
    };

    return (
        <div style={{ width: '100px', textAlign: 'center' }}>
            <Card 
                size="small" 
                style={{ width: '100%', height: '100px', border: "0.5px solid #eee", marginBottom: '10px' }} 
                cover={<img alt="uploaded-pic" src={picture ? picture : ""} />}
            />
            <Upload {...props} style={{ display: 'inline-block', marginRight: '10px' }}>
                <Tooltip title="Upload">
                    <Button style={{ background: "White" }} shape="square" icon={<UploadOutlined />} />
                </Tooltip>
            </Upload>
            <Tooltip title="Delete">
                <Button 
                    style={{ background: "White", display: 'inline-block' }} 
                    shape="square" 
                    icon={<DeleteOutlined />} 
                    onClick={handleDelete}
                />
            </Tooltip>
        </div>
    );
}

export default PictureUpload;
