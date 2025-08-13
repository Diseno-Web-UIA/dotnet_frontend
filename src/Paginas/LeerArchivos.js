import React, { useState } from 'react';
import { Card, Upload, Button, message, Table, Typography, Row, Col, Tabs, Space } from 'antd';
import { 
  FileTextOutlined, 
  CodeOutlined, 
  UploadOutlined,
  FileSearchOutlined,
  ClearOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const LeerArchivos = () => {
  const [xmlData, setXmlData] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [xmlColumns, setXmlColumns] = useState([]);
  const [jsonColumns, setJsonColumns] = useState([]);

  const handleFileUpload = (file, fileType) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        if (fileType === 'xml') {
          parseXMLFile(e.target.result);
        } else if (fileType === 'json') {
          parseJSONFile(e.target.result);
        }
      } catch (error) {
        console.error('Error parsing file:', error);
        message.error(`Error al procesar archivo ${fileType.toUpperCase()}`);
      }
    };

    reader.readAsText(file);
    return false; // Prevent default upload behavior
  };

  const parseXMLFile = (xmlContent) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
      
      // Verificar si hay errores de parsing
      const parseError = xmlDoc.getElementsByTagName('parsererror');
      if (parseError.length > 0) {
        message.error('Error al parsear archivo XML');
        return;
      }

      // Extraer datos del XML
      const clientes = xmlDoc.getElementsByTagName('cliente');
      if (clientes.length === 0) {
        message.warning('No se encontraron datos de clientes en el archivo XML');
        return;
      }

      const data = [];
      for (let i = 0; i < clientes.length; i++) {
        const cliente = clientes[i];
        const clienteData = {
          key: i,
          id: getTextContent(cliente, 'id') || '-',
          nombre: getTextContent(cliente, 'nombre') || '-',
          apellido1: getTextContent(cliente, 'apellido1') || '-',
          apellido2: getTextContent(cliente, 'apellido2') || '-',
          fechaNacimiento: getTextContent(cliente, 'fechaNacimiento') || '-',
          genero: getTextContent(cliente, 'genero') || '-',
          emails: getEmailsFromXML(cliente),
          telefonos: getTelefonosFromXML(cliente)
        };
        data.push(clienteData);
      }

      // Crear columnas para la tabla
      const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
        { title: 'Primer Apellido', dataIndex: 'apellido1', key: 'apellido1' },
        { title: 'Segundo Apellido', dataIndex: 'apellido2', key: 'apellido2' },
        { title: 'Fecha Nacimiento', dataIndex: 'fechaNacimiento', key: 'fechaNacimiento' },
        { title: 'Género', dataIndex: 'genero', key: 'genero' },
        { 
          title: 'Emails', 
          dataIndex: 'emails', 
          key: 'emails',
          render: (emails) => emails.length > 0 ? emails.join(', ') : '-'
        },
        { 
          title: 'Teléfonos', 
          dataIndex: 'telefonos', 
          key: 'telefonos',
          render: (telefonos) => telefonos.length > 0 ? telefonos.join(', ') : '-'
        }
      ];

      setXmlColumns(columns);
      setXmlData(data);
      message.success(`Archivo XML procesado exitosamente. ${data.length} clientes encontrados.`);
    } catch (error) {
      console.error('Error parsing XML:', error);
      message.error('Error al procesar archivo XML');
    }
  };

  const parseJSONFile = (jsonContent) => {
    try {
      const data = JSON.parse(jsonContent);
      
      if (!Array.isArray(data)) {
        message.warning('El archivo JSON debe contener un array de clientes');
        return;
      }

      if (data.length === 0) {
        message.warning('No se encontraron datos de clientes en el archivo JSON');
        return;
      }

      // Procesar datos JSON
      const processedData = data.map((cliente, index) => ({
        key: index,
        id: cliente.id || '-',
        nombre: cliente.nombre || '-',
        apellido1: cliente.apellido1 || '-',
        apellido2: cliente.apellido2 || '-',
        fechaNacimiento: cliente.fechaNacimiento || '-',
        genero: cliente.genero || '-',
        emails: cliente.emails ? cliente.emails.map(e => e.direccion || e.email || e).join(', ') : '-',
        telefonos: cliente.telefonos ? cliente.telefonos.map(t => t.numero || t).join(', ') : '-',
        direcciones: cliente.direcciones ? cliente.direcciones.map(d => d.detalle || d).join(', ') : '-'
      }));

      // Crear columnas para la tabla
      const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
        { title: 'Primer Apellido', dataIndex: 'apellido1', key: 'apellido1' },
        { title: 'Segundo Apellido', dataIndex: 'apellido2', key: 'apellido2' },
        { title: 'Fecha Nacimiento', dataIndex: 'fechaNacimiento', key: 'fechaNacimiento' },
        { title: 'Género', dataIndex: 'genero', key: 'genero' },
        { title: 'Emails', dataIndex: 'emails', key: 'emails' },
        { title: 'Teléfonos', dataIndex: 'telefonos', key: 'telefonos' },
        { title: 'Direcciones', dataIndex: 'direcciones', key: 'direcciones' }
      ];

      setJsonColumns(columns);
      setJsonData(processedData);
      message.success(`Archivo JSON procesado exitosamente. ${processedData.length} clientes encontrados.`);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      message.error('Error al procesar archivo JSON');
    }
  };

  const getTextContent = (element, tagName) => {
    const tag = element.getElementsByTagName(tagName)[0];
    return tag ? tag.textContent.trim() : '';
  };

  const getEmailsFromXML = (cliente) => {
    const emails = cliente.getElementsByTagName('email');
    const emailList = [];
    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];
      const direccion = getTextContent(email, 'direccion');
      if (direccion) emailList.push(direccion);
    }
    return emailList;
  };

  const getTelefonosFromXML = (cliente) => {
    const telefonos = cliente.getElementsByTagName('telefono');
    const telefonoList = [];
    for (let i = 0; i < telefonos.length; i++) {
      const telefono = telefonos[i];
      const numero = getTextContent(telefono, 'numero');
      if (numero) telefonoList.push(numero);
    }
    return telefonoList;
  };

  const clearData = (fileType) => {
    if (fileType === 'xml') {
      setXmlData(null);
      setXmlColumns([]);
    } else if (fileType === 'json') {
      setJsonData(null);
      setJsonColumns([]);
    }
    message.info(`Datos de ${fileType.toUpperCase()} limpiados`);
  };

  const uploadProps = {
    beforeUpload: (file) => false, // Prevent default upload
    showUploadList: false,
    accept: {
      'xml': ['.xml'],
      'json': ['.json']
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileSearchOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <span>Leer Archivos XML y JSON</span>
          </div>
        }
        style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
      >
        <Tabs defaultActiveKey="xml" size="large">
          <TabPane 
            tab={
              <span>
                <FileTextOutlined style={{ color: '#722ed1' }} />
                Archivos XML
              </span>
            } 
            key="xml"
          >
            <div style={{ marginBottom: '24px' }}>
              <Title level={4}>Cargar Archivo XML</Title>
              <Paragraph>
                Selecciona un archivo XML con datos de clientes para visualizarlo en la tabla.
              </Paragraph>
              <Space>
                <Upload
                  {...uploadProps}
                  beforeUpload={(file) => handleFileUpload(file, 'xml')}
                  accept=".xml"
                >
                  <Button 
                    type="primary" 
                    icon={<UploadOutlined />}
                    style={{ backgroundColor: '#722ed1', borderColor: '#722ed1' }}
                  >
                    Seleccionar XML
                  </Button>
                </Upload>
                {xmlData && (
                  <Button 
                    icon={<ClearOutlined />}
                    onClick={() => clearData('xml')}
                  >
                    Limpiar Datos
                  </Button>
                )}
              </Space>
            </div>

            {xmlData && (
              <div style={{ marginTop: '24px' }}>
                <Title level={4}>Datos del Archivo XML</Title>
                <Table
                  columns={xmlColumns}
                  dataSource={xmlData}
                  rowKey="key"
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true
                  }}
                  scroll={{ x: 1000 }}
                />
              </div>
            )}
          </TabPane>

          <TabPane 
            tab={
              <span>
                <CodeOutlined style={{ color: '#13c2c2' }} />
                Archivos JSON
              </span>
            } 
            key="json"
          >
            <div style={{ marginBottom: '24px' }}>
              <Title level={4}>Cargar Archivo JSON</Title>
              <Paragraph>
                Selecciona un archivo JSON con datos de clientes para visualizarlo en la tabla.
              </Paragraph>
              <Space>
                <Upload
                  {...uploadProps}
                  beforeUpload={(file) => handleFileUpload(file, 'json')}
                  accept=".json"
                >
                  <Button 
                    type="primary" 
                    icon={<UploadOutlined />}
                    style={{ backgroundColor: '#13c2c2', borderColor: '#13c2c2' }}
                  >
                    Seleccionar JSON
                  </Button>
                </Upload>
                {jsonData && (
                  <Button 
                    icon={<ClearOutlined />}
                    onClick={() => clearData('json')}
                  >
                    Limpiar Datos
                  </Button>
                )}
              </Space>
            </div>

            {jsonData && (
              <div style={{ marginTop: '24px' }}>
                <Title level={4}>Datos del Archivo JSON</Title>
                <Table
                  columns={jsonColumns}
                  dataSource={jsonData}
                  rowKey="key"
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true
                  }}
                  scroll={{ x: 1200 }}
                />
              </div>
            )}
          </TabPane>
        </Tabs>

        {/* Información adicional */}
        <Card style={{ marginTop: '24px', background: '#f8f9fa' }}>
          <Title level={4} style={{ color: '#1890ff' }}>
            Instrucciones de Uso
          </Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Title level={5}>Formato XML Esperado:</Title>
                             <Paragraph style={{ fontSize: '12px', fontFamily: 'monospace' }}>
                 {'<clientes>\n  <cliente>\n    <id>1</id>\n    <nombre>Juan</nombre>\n    <apellido1>Pérez</apellido1>\n  </cliente>\n</clientes>'}
               </Paragraph>
            </Col>
            <Col span={12}>
              <Title level={5}>Formato JSON Esperado:</Title>
                             <Paragraph style={{ fontSize: '12px', fontFamily: 'monospace' }}>
                 {'[\n  {\n    "id": 1,\n    "nombre": "Juan",\n    "apellido1": "Pérez"\n  }\n]'}
               </Paragraph>
            </Col>
          </Row>
        </Card>
      </Card>
    </div>
  );
};

export default LeerArchivos;
