import React, { useState, useEffect } from 'react';
import { Card, Button, message, Space, Typography, Row, Col, Statistic } from 'antd';
import { 
  FileTextOutlined, 
  CodeOutlined, 
  DownloadOutlined, 
  TeamOutlined,
  ReloadOutlined 
} from '@ant-design/icons';
import { apiRequest } from '../Utils/Api';

const { Title, Paragraph } = Typography;

const ExportarDatos = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const response = await apiRequest('GET', 'api/persona');
      if (response.success) {
        setClientes(response.data || []);
      } else {
        message.error('Error al cargar clientes: ' + response.message);
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const exportToXML = () => {
    setExporting(true);
    try {
      // Crear estructura XML
      let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xmlContent += '<clientes>\n';
      
      clientes.forEach(cliente => {
        xmlContent += '  <cliente>\n';
        xmlContent += `    <id>${cliente.idPersona}</id>\n`;
        xmlContent += `    <nombre>${cliente.nombre1}</nombre>\n`;
        xmlContent += `    <apellido1>${cliente.apellido1}</apellido1>\n`;
        xmlContent += `    <apellido2>${cliente.apellido2 || ''}</apellido2>\n`;
        xmlContent += `    <fechaNacimiento>${cliente.fecha_Nacimiento || ''}</fechaNacimiento>\n`;
        xmlContent += `    <genero>${cliente.genero}</genero>\n`;
        
        // Emails
        if (cliente.emails && cliente.emails.length > 0) {
          xmlContent += '    <emails>\n';
          cliente.emails.forEach(email => {
            xmlContent += '      <email>\n';
            xmlContent += `        <direccion>${email.direccion_Email}</direccion>\n`;
            xmlContent += `        <activo>${email.activo}</activo>\n`;
            xmlContent += `        <verificado>${email.verificado}</verificado>\n`;
            xmlContent += '      </email>\n';
          });
          xmlContent += '    </emails>\n';
        }
        
        // Teléfonos
        if (cliente.telefonos && cliente.telefonos.length > 0) {
          xmlContent += '    <telefonos>\n';
          cliente.telefonos.forEach(telefono => {
            xmlContent += '      <telefono>\n';
            xmlContent += `        <numero>${telefono.numero}</numero>\n`;
            xmlContent += `        <activo>${telefono.activo}</activo>\n`;
            xmlContent += '      </telefono>\n';
          });
          xmlContent += '    </telefonos>\n';
        }
        
        xmlContent += '  </cliente>\n';
      });
      
      xmlContent += '</clientes>';

      // Crear y descargar archivo
      const blob = new Blob([xmlContent], { type: 'application/xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `clientes_${new Date().toISOString().split('T')[0]}.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      message.success('Archivo XML exportado exitosamente');
    } catch (error) {
      console.error('Error al exportar XML:', error);
      message.error('Error al exportar archivo XML');
    } finally {
      setExporting(false);
    }
  };

  const exportToJSON = () => {
    setExporting(true);
    try {
      // Preparar datos para JSON
      const jsonData = clientes.map(cliente => ({
        id: cliente.idPersona,
        nombre: cliente.nombre1,
        apellido1: cliente.apellido1,
        apellido2: cliente.apellido2 || '',
        fechaNacimiento: cliente.fecha_Nacimiento || '',
        genero: cliente.genero,
        emails: cliente.emails || [],
        telefonos: cliente.telefonos || [],
        direcciones: cliente.direcciones || []
      }));

      // Crear y descargar archivo
      const jsonContent = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `clientes_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      message.success('Archivo JSON exportado exitosamente');
    } catch (error) {
      console.error('Error al exportar JSON:', error);
      message.error('Error al exportar archivo JSON');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <span>Exportar Datos de Clientes</span>
          </div>
        }
        extra={
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={fetchClientes}
            loading={loading}
          >
            Actualizar Datos
          </Button>
        }
        style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
      >
        {/* Estadísticas */}
        <Row gutter={[16, 16]} style={{ marginBottom: '32px' }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total de Clientes"
                value={clientes.length}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Clientes con Emails"
                value={clientes.filter(c => c.emails && c.emails.length > 0).length}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Clientes con Teléfonos"
                value={clientes.filter(c => c.telefonos && c.telefonos.length > 0).length}
                prefix={<CodeOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Opciones de exportación */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileTextOutlined style={{ fontSize: '20px', color: '#722ed1' }} />
                  <span>Exportar a XML</span>
                </div>
              }
              style={{ border: '2px solid #722ed1', borderRadius: '12px' }}
            >
              <Paragraph>
                Exporta todos los datos de clientes en formato XML estructurado.
                Incluye información personal, emails, teléfonos y direcciones.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                icon={<DownloadOutlined />}
                onClick={exportToXML}
                loading={exporting}
                style={{ 
                  backgroundColor: '#722ed1', 
                  borderColor: '#722ed1',
                  width: '100%'
                }}
              >
                {exporting ? 'Exportando...' : 'Descargar XML'}
              </Button>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CodeOutlined style={{ fontSize: '20px', color: '#13c2c2' }} />
                  <span>Exportar a JSON</span>
                </div>
              }
              style={{ border: '2px solid #13c2c2', borderRadius: '12px' }}
            >
              <Paragraph>
                Exporta todos los datos de clientes en formato JSON.
                Formato ideal para integración con otras aplicaciones.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                icon={<DownloadOutlined />}
                onClick={exportToJSON}
                loading={exporting}
                style={{ 
                  backgroundColor: '#13c2c2', 
                  borderColor: '#13c2c2',
                  width: '100%'
                }}
              >
                {exporting ? 'Exportando...' : 'Descargar JSON'}
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Información adicional */}
        <Card style={{ marginTop: '24px', background: '#f8f9fa' }}>
          <Title level={4} style={{ color: '#1890ff' }}>
            Información de Exportación
          </Title>
          <Paragraph>
            <strong>XML:</strong> Formato estructurado ideal para intercambio de datos entre sistemas.
            <br />
            <strong>JSON:</strong> Formato ligero perfecto para APIs y aplicaciones web.
            <br />
            <strong>Nota:</strong> Los archivos se descargan automáticamente con fecha de exportación.
          </Paragraph>
        </Card>
      </Card>
    </div>
  );
};

export default ExportarDatos;
