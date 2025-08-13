import React, { useState, useEffect } from 'react';
import { Table, Card, message, Button, Space, Tag, Statistic, Row, Col } from 'antd';
import { UserOutlined, ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import { apiRequest } from '../Utils/Api';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'idPersona',
      key: 'idPersona',
      width: 80,
      render: (id) => <Tag color="blue">{id}</Tag>
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre1',
      key: 'nombre1',
      render: (nombre) => (
        <div style={{ fontWeight: 'bold', color: '#1890ff' }}>
          {nombre}
        </div>
      )
    },
    {
      title: 'Primer Apellido',
      dataIndex: 'apellido1',
      key: 'apellido1',
    },
    {
      title: 'Segundo Apellido',
      dataIndex: 'apellido2',
      key: 'apellido2',
      render: (apellido) => apellido || '-'
    },
    {
      title: 'Fecha Nacimiento',
      dataIndex: 'fecha_Nacimiento',
      key: 'fecha_Nacimiento',
      render: (fecha) => {
        if (fecha) {
          return new Date(fecha).toLocaleDateString('es-ES');
        }
        return '-';
      }
    },
    {
      title: 'Emails',
      key: 'emails',
      render: (_, record) => {
        const emailCount = record.emails?.length || 0;
        return emailCount > 0 ? (
          <Tag color="green">{emailCount} email(s)</Tag>
        ) : (
          <Tag color="default">Sin emails</Tag>
        );
      }
    },
    {
      title: 'Teléfonos',
      key: 'telefonos',
      render: (_, record) => {
        const telefonoCount = record.telefonos?.length || 0;
        return telefonoCount > 0 ? (
          <Tag color="orange">{telefonoCount} teléfono(s)</Tag>
        ) : (
          <Tag color="default">Sin teléfonos</Tag>
        );
      }
    },
    {
      title: 'Acciones',
      key: 'acciones',
      width: 120,
      render: (_, record) => (
        <Space size="small">
                     <Button
             type="text"
             icon={<EyeOutlined />}
             size="small"
             onClick={() => message.info(`Ver detalles de ${record.nombre1} ${record.apellido1}`)}
           />
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <span>Lista de Clientes</span>
          </div>
        }
        extra={
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={fetchClientes}
            loading={loading}
          >
            Actualizar
          </Button>
        }
        style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
      >
        {/* Estadísticas en tiempo real */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total de Clientes"
                value={clientes.length}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Última Actualización"
                value={new Date().toLocaleTimeString()}
                valueStyle={{ color: '#52c41a', fontSize: '16px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Estado de Conexión"
                value={loading ? 'Cargando...' : 'Conectado'}
                valueStyle={{ color: loading ? '#fa8c16' : '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={clientes}
          rowKey="idPersona"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} de ${total} clientes`
          }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default ListaClientes;
