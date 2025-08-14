import React, { useEffect, useState } from 'react';
import { Card, Upload, Button, message, Table, Typography, Row, Col, Tabs, Space, Tag} from 'antd';
import ReadFile from '../Utils/ReadFile';
import xmlParser from '../Utils/xmlParser';
import Swal from 'sweetalert2';
import { 
	FileTextOutlined, 
	CodeOutlined, 
	UploadOutlined,
	FileSearchOutlined,
	ClearOutlined,
	InboxOutlined
} from '@ant-design/icons';
import { render } from '@testing-library/react';
import TablaPopover from '../componentes/TablaPopover';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const LeerArchivos = () => {
	const [data, setData] = useState(null);
	const [struct, setStruct] = useState([]);

	useEffect(() => {
		if(!!data){
			console.log(data);
			setStruct(structViewer(data, "Archivo"));
		}else setStruct([]);
	}, [data]);

	function structViewer(thisData, name){
		const viewer = [];
		const strings = {};
		if(!Array.isArray(thisData)){
			for(const key in thisData){
				if(typeof thisData[key] === "string"){
					strings[key] = thisData[key];
				}else if(Array.isArray(thisData[key])){
					viewer.push(parse(thisData[key], key));
				}else{
					const recursive = structViewer(thisData[key], key);
					if(recursive.length > 0) recursive.forEach(item => viewer.push(item));
				}
			}
			
		}else{
			viewer.push(parse(thisData, name));
		}
		if(Object.keys(strings).length > 0) viewer.unshift(parse(strings, name));
		return viewer;	
	}

	function parse(thisData, name){
		if(!!thisData){
			if(Array.isArray(thisData) && typeof thisData[0] === "object"){
				const allHeaders = new Set();
				for (const item of thisData) Object.keys(item).forEach(key => allHeaders.add(key));
				const headers = Array.from(allHeaders);
				let counter = 0;
				return <Row>
					<Col span={24} style={{marginBottom: '16px'}}>
						<Typography.Title level={2}>{name}</Typography.Title>
					</Col>
					<Col span={24}>
						<Table columns={headers.map(header => {
							counter ++;
							return {
								title: header,
								dataIndex: header,
								key: header,
								ellipsis: true,
								fixed: counter === 1 ? 'left' : (counter === headers.length ? 'right' : ''),
								minWidth: 150,
								render: (val) => {
									if(!!val){
										if(Array.isArray(val)){
											if(typeof val[0] === "object") return <TablaPopover arrayObjetos={val} />;
											return <Space direction='vertical' size={"small"}>{val.map(item => <Tag key={(new Date()).getTime() + item} color="blue" style={{marginBottom: '8px'}}>{item}</Tag>)}</Space>;
										}else if(typeof val === "object"){
											try{
												const keys = Object.keys(val);
												if(keys.length > 0) return <TablaPopover arrayObjetos={Array.isArray(val[keys[0]]) ? val[keys[0]] : [val[keys[0]]]} />;
												else return "No se puede ver el contenido";
											}catch(exc){
												return "";
											}
										}else return val || '-';
									}else return '-';
								}
							};
						})} dataSource={thisData.map(item => ({ key: item.id, ...item }))} />
					</Col>
				</Row>;
			}else if(Array.isArray(thisData) && typeof thisData[0] !== "object"){
				return <Row>
					<Col span={24} style={{marginBottom: '16px'}}>
						<Typography.Title level={4}>{name}</Typography.Title>
					</Col>
					<Col span={24}>
						{thisData.map((item, index) => (
							<Tag key={(new Date()).getTime() + index} color="blue" style={{marginBottom: '8px'}}>{item}</Tag>
						))}
					</Col>
				</Row>;
			}else if(typeof thisData === "object" && !Array.isArray(thisData)){
				return <Row>
					<Col span={24} style={{marginBottom: '16px'}}>
						<Typography.Title level={2}>{name}</Typography.Title>
					</Col>
					{Object.keys(thisData).map((key) => (
						<Col span={6} key={(new Date()).getTime() + key} style={{marginBottom: '8px'}}>
							<Typography.Text strong>{key}: </Typography.Text>
							<Typography.Text>{thisData[key]}</Typography.Text>
						</Col>
					))}
				</Row>;
			}
		} else return <></>;
	}

	function toObj(content, type){
		if(type === "text/xml"){
			const parser = new DOMParser();
			const xml = parser.parseFromString(content, 'text/xml');
			const parserError = xml.querySelector('parsererror');
			if (!parserError) return xmlParser(xml);
			else message.error("Error al parsear el XML");
		}else return JSON.parse(content);
	}


	return (
		<Card
			children = {(<Space size={"large"} direction='vertical' style={{width: '100%'}}>
				<Upload.Dragger name='file' multiple={false} maxCount={1} accept='.xml,.json' showUploadList={false} beforeUpload={(file) => {
					const isAccepted = ["text/xml", "application/json"].includes(file.type)
					if (!isAccepted) message.error(`${file.name} no es un xml o json`);
					if(isAccepted) setStruct([]);
					return isAccepted || Upload.LIST_IGNORE;
				}} onChange={async (info) => {
					if(info.file.status === "done"){
						const file = info.fileList[0].originFileObj;
						const content = await ReadFile(file);
						setData(toObj(content, file.type));
					}
				}} customRequest={({ file, onSuccess }) => {
					setTimeout(() => {
						onSuccess("ok");
					}, 0);
				}} >
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">Haz click o arrastra el archivo a esta área para subirlo</p>
					<p className="ant-upload-hint">
					Soporte para la carga de archivos individuales. Solo se permiten archivos .xml y .json.
					</p>
				</Upload.Dragger>
				<center> <Button type='primary' onClick={async () => {
					const result = await Swal.fire({
						title: "Introduzca la url de XML o JSON",
						input: "text",
						inputAttributes: {
							autocapitalize: "off"
						},
						showCancelButton: true,
						confirmButtonText: "Obtener",
						cancelButtonText: "Cancelar",
						showLoaderOnConfirm: true,
						preConfirm: async (url) => {
							try {
								const response = await fetch(url);
								if (!response.ok) {
									return Swal.showValidationMessage(`
										${JSON.stringify(await response.json())}
									`);
								}
								return {
									resp: await response.text(),
									url,
									type: response.headers.get("content-type")
								}
							} catch (error) {
								Swal.showValidationMessage(`
									Request failed: ${error}
								`);
							}
						},
						allowOutsideClick: () => !Swal.isLoading()
					});

					if (result.isConfirmed) {
						setData(toObj(result.value.resp, result.value.type));
					}
				}}>Obtener archivo desde URL</Button> </center>
				{struct.length > 0 && (
					<>
						<Typography.Title level={4}>Estructura del Archivo</Typography.Title>
						{struct.map((item, index) => (
							<Card key={(new Date()).getTime() + index} style={{ marginBottom: '16px' }}>
								{item}
							</Card>
						))}
					</>
				)}
			</Space>)}
			title={
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
				<FileSearchOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
				<span>Leer Archivos XML y JSON</span>
			</div>
			}
			style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
		/>
	);
};

export default LeerArchivos;
