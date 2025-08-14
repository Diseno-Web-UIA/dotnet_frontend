import React, { useState } from 'react';
import { Popover, Table, Space, Tag, Button, Pagination } from 'antd';

const TablaPopover = ({arrayObjetos, btn = null, _key = null}) => {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const allHeaders = new Set();
    for (const item of arrayObjetos) Object.keys(item).forEach(key => allHeaders.add(key));
    const headers = Array.from(allHeaders);

    return <Popover
        content={<Table columns={headers.map(header => ({
                title: header,
                dataIndex: header,
                key: header,
                render: (val) => {
                    if(Array.isArray(val)) return <Space direction='vertical' size={"small"}>{val.map(item => <Tag key={item} color="blue" style={{marginBottom: '8px'}}>{item}</Tag>)}</Space>;
                    else return val || '-';
                }
            }))} dataSource={!!_key ? arrayObjetos.map(item => ({ key: item[_key], ...item })) : arrayObjetos} />}
        title="Title"
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
    >
        {btn || <Button type="primary">Click para ver</Button>}
    </Popover>;
};

export default TablaPopover;
