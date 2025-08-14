import React, { useState, useEffect } from 'react';
import { Table, Card, message, Button, Space, Tag, Statistic, Row, Col, Dropdown, Modal, Form, Input, DatePicker, Select, Tooltip } from 'antd';
import { UserOutlined, ReloadOutlined, EyeOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { apiRequest } from '../Utils/Api';
import dayjs from 'dayjs';
import TablaPopover from '../componentes/TablaPopover';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [editForm] = Form.useForm();
  const [editLoading, setEditLoading] = useState(false);

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

  const handleEdit = (record) => {
    setEditingCliente(record);
    editForm.setFieldsValue({
      nombre1: record.nombre1,
      nombre2: record.nombre2 || '',
      apellido1: record.apellido1,
      apellido2: record.apellido2 || '',
      fecha_Nacimiento: record.fecha_Nacimiento ? dayjs(record.fecha_Nacimiento) : null,
      genero: record.genero || 1
    });
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (values) => {
    setEditLoading(true);
    try {
      const updateData = {
        nombre1: values.nombre1,
        apellido1: values.apellido1,
        apellido2: values.apellido2 || null,
        fecha_Nacimiento: values.fecha_Nacimiento ? values.fecha_Nacimiento.format('YYYY-MM-DD') : null,
        genero: values.genero || 1
      };

      const response = await apiRequest('PUT', `api/persona/${editingCliente.idPersona}`, updateData);
      
      if (response.success) {
        message.success('Cliente actualizado correctamente');
        setEditModalVisible(false);
        setEditingCliente(null);
        editForm.resetFields();
        fetchClientes(); // Recargar la lista
      } else {
        message.error('Error al actualizar cliente: ' + response.message);
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Error de conexión con el servidor');
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditingCliente(null);
    editForm.resetFields();
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: '¿Estás seguro de que quieres eliminar este cliente?',
      content: `Se eliminará permanentemente: ${record.nombre1} ${record.apellido1}`,
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          const response = await apiRequest('DELETE', `api/persona/${record.idPersona}`);
          if (response.success) {
            message.success('Cliente eliminado correctamente');
            fetchClientes(); // Recargar la lista
          } else {
            message.error('Error al eliminar cliente: ' + response.message);
          }
        } catch (error) {
          console.error('Error:', error);
          message.error('Error de conexión con el servidor');
        }
      }
    });
  };

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
          <TablaPopover arrayObjetos={record.emails.map(rec => ({
            Email: rec.direccion_Email,
            ["Fecha de Creación"]: rec.fecha_Creacion,
            ["Fecha de Actualización"]: rec.fecha_Actualizacion
          }))} _key={"Email"} btn={ <Tooltip title={`Ver ${emailCount} email(s)`}><Tag color="green" style={{ cursor: 'pointer' }}>{emailCount} email(s)</Tag></Tooltip> } />
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
          (
          <TablaPopover arrayObjetos={record.telefonos.map(item => ({
            ID: item.idTelefono,
            Telefono: item.numero,
          }))} _key={"ID"} btn={ <Tooltip title={`Ver ${telefonoCount} teléfono(s)`}><Tag color="orange" style={{ cursor: 'pointer' }}>{telefonoCount} teléfono(s)</Tag></Tooltip> } />
        )
        ) : (
          <Tag color="default">Sin teléfonos</Tag>
        );
      }
    },
    {
      title: 'Acciones',
      key: 'acciones',
      width: 120,
      render: (_, record) => {
        const menuItems = [
          {
            key: 'view',
            icon: <EyeOutlined />,
            label: 'Ver detalles',
            onClick: () => message.info(`Ver detalles de ${record.nombre1} ${record.apellido1}`)
          },
          {
            key: 'edit',
            icon: <EditOutlined />,
            label: 'Editar',
            onClick: () => handleEdit(record)
          },
          {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: 'Eliminar',
            onClick: () => handleDelete(record),
            danger: true
          }
        ];

        return (
          <Dropdown
            menu={{ items: menuItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              size="small"
              style={{ padding: '4px 8px' }}
            />
          </Dropdown>
        );
      }
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

      <Modal
        title="Editar Cliente"
        open={editModalVisible}
        onOk={editForm.submit}
        onCancel={handleEditCancel}
        confirmLoading={editLoading}
        width={600}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditSubmit}
        >
          <Form.Item
            name="nombre1"
            label="Nombre"
            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nombre2"
            label="Segundo Nombre"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="apellido1"
            label="Primer Apellido"
            rules={[{ required: true, message: 'Por favor ingrese el primer apellido' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="apellido2"
            label="Segundo Apellido"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fecha_Nacimiento"
            label="Fecha de Nacimiento"
            rules={[{ required: true, message: 'Por favor seleccione la fecha de nacimiento' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="genero"
            label="Género"
            rules={[{ required: true, message: 'Por favor seleccione el género' }]}
          >
            <Select>
              <Select.Option value={1}>Masculino</Select.Option>
              <Select.Option value={2}>Femenino</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListaClientes;
