import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  DatePicker,
  Select,
  Space,
  Typography,
  message,
  Divider,
  Collapse,
  InputNumber
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import apiRequest from '../Utils/Api';

const { Title, Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const RegistrarPersona = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([{ email: '', tipo: 1, activo: true, verificado: false }]);
  const [telefonos, setTelefonos] = useState([{ numero: '', tipo: 1, activo: true }]);
  const [direcciones, setDirecciones] = useState([{ detalle: '', tipo: 1 }]);

  const tiposEmail = [
    { id: 1, descripcion: 'Personal' },
    { id: 2, descripcion: 'Trabajo' },
    { id: 3, descripcion: 'Otro' }
  ];

  const tiposTelefono = [
    { id: 1, descripcion: 'Móvil' },
    { id: 2, descripcion: 'Casa' },
    { id: 3, descripcion: 'Trabajo' },
    { id: 4, descripcion: 'Otro' }
  ];

  const tiposDireccion = [
    { id: 1, descripcion: 'Casa' },
    { id: 2, descripcion: 'Trabajo' },
    { id: 3, descripcion: 'Otro' }
  ];

  const generos = [
    { id: 1, descripcion: 'Masculino' },
    { id: 2, descripcion: 'Femenino' }
  ];

  const addEmail = () => {
    setEmails([...emails, { email: '', tipo: 1, activo: true, verificado: false }]);
  };

  const removeEmail = (index) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };

  const updateEmail = (index, field, value) => {
    const newEmails = [...emails];
    newEmails[index][field] = value;
    setEmails(newEmails);
  };

  const addTelefono = () => {
    setTelefonos([...telefonos, { numero: '', tipo: 1, activo: true }]);
  };

  const removeTelefono = (index) => {
    if (telefonos.length > 1) {
      setTelefonos(telefonos.filter((_, i) => i !== index));
    }
  };

  const updateTelefono = (index, field, value) => {
    const newTelefonos = [...telefonos];
    newTelefonos[index][field] = value;
    setTelefonos(newTelefonos);
  };

  const addDireccion = () => {
    setDirecciones([...direcciones, { detalle: '', tipo: 1 }]);
  };

  const removeDireccion = (index) => {
    if (direcciones.length > 1) {
      setDirecciones(direcciones.filter((_, i) => i !== index));
    }
  };

  const updateDireccion = (index, field, value) => {
    const newDirecciones = [...direcciones];
    newDirecciones[index][field] = value;
    setDirecciones(newDirecciones);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Crear la persona
      const personaData = {
        Nombre1: values.nombre1,
        Apellido1: values.apellido1,
        Apellido2: values.apellido2,
        Fecha_Nacimiento: values.fechaNacimiento?.format('YYYY-MM-DD'),
        genero: values.genero
      };

      const personaResponse = await apiRequest('Persona', personaData, null, 'POST');
      
      if (personaResponse && personaResponse.idPersona) {
        const personaId = personaResponse.idPersona;
        
        // Crear emails
        for (const email of emails) {
          if (email.email.trim()) {
            await apiRequest('Email', {
              Direccion_Email: email.email,
              Activo: email.activo,
              Verificado: email.verificado,
              Tipo_Email_idTipo_Email: email.tipo,
              Persona_idPersona: personaId
            }, null, 'POST');
          }
        }

        // Crear teléfonos
        for (const telefono of telefonos) {
          if (telefono.numero.trim()) {
            await apiRequest('Telefono', {
              Numero: telefono.numero,
              Activo: telefono.activo,
              Persona_idPersona: personaId,
              Telefono_Tipo_idTelefonol_Tipo: telefono.tipo
            }, null, 'POST');
          }
        }

        // Crear direcciones
        for (const direccion of direcciones) {
          if (direccion.detalle.trim()) {
            await apiRequest('Direccion', {
              Detalle_Direccion: direccion.detalle,
              idTipo_Direccion: direccion.tipo,
              Persona_idPersona: personaId
            }, null, 'POST');
          }
        }

        message.success('Persona registrada exitosamente!');
        form.resetFields();
        setEmails([{ email: '', tipo: 1, activo: true, verificado: false }]);
        setTelefonos([{ numero: '', tipo: 1, activo: true }]);
        setDirecciones([{ detalle: '', tipo: 1 }]);
      }
    } catch (error) {
      console.error('Error al registrar persona:', error);
      message.error('Error al registrar la persona. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32, color: '#1890ff' }}>
        <UserOutlined style={{ marginRight: 12 }} />
        Registrar Nueva Persona
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          genero: 1,
          emails: emails,
          telefonos: telefonos,
          direcciones: direcciones
        }}
      >
        <Card title="Información Personal" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="nombre1"
                label="Primer Nombre"
                rules={[{ required: true, message: 'Por favor ingresa el primer nombre' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Primer nombre" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="apellido1"
                label="Primer Apellido"
                rules={[{ required: true, message: 'Por favor ingresa el primer apellido' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Primer apellido" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="apellido2"
                label="Segundo Apellido"
              >
                <Input prefix={<UserOutlined />} placeholder="Segundo apellido (opcional)" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fechaNacimiento"
                label="Fecha de Nacimiento"
                rules={[{ required: true, message: 'Por favor selecciona la fecha de nacimiento' }]}
              >
                <DatePicker style={{ width: '100%' }} placeholder="Selecciona fecha" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="genero"
                label="Género"
                rules={[{ required: true, message: 'Por favor selecciona el género' }]}
              >
                <Select placeholder="Selecciona género">
                  {generos.map(g => (
                    <Option key={g.id} value={g.id}>{g.descripcion}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Información de Contacto" style={{ marginBottom: 24 }}>
          <Collapse defaultActiveKey={['1', '2', '3']} ghost>
            <Panel header={<><MailOutlined /> Emails</>} key="1">
              {emails.map((email, index) => (
                <Row gutter={16} key={index} style={{ marginBottom: 16 }}>
                  <Col span={8}>
                    <Input
                      placeholder="Email"
                      value={email.email}
                      onChange={(e) => updateEmail(index, 'email', e.target.value)}
                      prefix={<MailOutlined />}
                    />
                  </Col>
                  <Col span={6}>
                    <Select
                      value={email.tipo}
                      onChange={(value) => updateEmail(index, 'tipo', value)}
                      style={{ width: '100%' }}
                    >
                      {tiposEmail.map(t => (
                        <Option key={t.id} value={t.id}>{t.descripcion}</Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={4}>
                    <Select
                      value={email.activo}
                      onChange={(value) => updateEmail(index, 'activo', value)}
                      style={{ width: '100%' }}
                    >
                      <Option value={true}>Activo</Option>
                      <Option value={false}>Inactivo</Option>
                    </Select>
                  </Col>
                  <Col span={4}>
                    <Select
                      value={email.verificado}
                      onChange={(value) => updateEmail(index, 'verificado', value)}
                      style={{ width: '100%' }}
                    >
                      <Option value={true}>Verificado</Option>
                      <Option value={false}>No verificado</Option>
                    </Select>
                  </Col>
                  <Col span={2}>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeEmail(index)}
                      disabled={emails.length === 1}
                    />
                  </Col>
                </Row>
              ))}
              <Button type="dashed" onClick={addEmail} icon={<PlusOutlined />} style={{ width: '100%' }}>
                Agregar Email
              </Button>
            </Panel>

            <Panel header={<><PhoneOutlined /> Teléfonos</>} key="2">
              {telefonos.map((telefono, index) => (
                <Row gutter={16} key={index} style={{ marginBottom: 16 }}>
                  <Col span={10}>
                    <Input
                      placeholder="Número de teléfono"
                      value={telefono.numero}
                      onChange={(e) => updateTelefono(index, 'numero', e.target.value)}
                      prefix={<PhoneOutlined />}
                    />
                  </Col>
                  <Col span={8}>
                    <Select
                      value={telefono.tipo}
                      onChange={(value) => updateTelefono(index, 'tipo', value)}
                      style={{ width: '100%' }}
                    >
                      {tiposTelefono.map(t => (
                        <Option key={t.id} value={t.id}>{t.descripcion}</Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={4}>
                    <Select
                      value={telefono.activo}
                      onChange={(value) => updateTelefono(index, 'activo', value)}
                      style={{ width: '100%' }}
                    >
                      <Option value={true}>Activo</Option>
                      <Option value={false}>Inactivo</Option>
                    </Select>
                  </Col>
                  <Col span={2}>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeTelefono(index)}
                      disabled={telefonos.length === 1}
                    />
                  </Col>
                </Row>
              ))}
              <Button type="dashed" onClick={addTelefono} icon={<PlusOutlined />} style={{ width: '100%' }}>
                Agregar Teléfono
              </Button>
            </Panel>

            <Panel header={<><HomeOutlined /> Direcciones</>} key="3">
              {direcciones.map((direccion, index) => (
                <Row gutter={16} key={index} style={{ marginBottom: 16 }}>
                  <Col span={18}>
                    <Input
                      placeholder="Detalle de la dirección"
                      value={direccion.detalle}
                      onChange={(e) => updateDireccion(index, 'detalle', e.target.value)}
                      prefix={<HomeOutlined />}
                    />
                  </Col>
                  <Col span={4}>
                    <Select
                      value={direccion.tipo}
                      onChange={(value) => updateDireccion(index, 'tipo', value)}
                      style={{ width: '100%' }}
                    >
                      {tiposDireccion.map(t => (
                        <Option key={t.id} value={t.id}>{t.descripcion}</Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={2}>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeDireccion(index)}
                      disabled={direcciones.length === 1}
                    />
                  </Col>
                </Row>
              ))}
              <Button type="dashed" onClick={addDireccion} icon={<PlusOutlined />} style={{ width: '100%' }}>
                Agregar Dirección
              </Button>
            </Panel>
          </Collapse>
        </Card>

        <Form.Item style={{ textAlign: 'center', marginTop: 24 }}>
          <Space size="large">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SaveOutlined />}
              size="large"
            >
              Registrar Persona
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                setEmails([{ email: '', tipo: 1, activo: true, verificado: false }]);
                setTelefonos([{ numero: '', tipo: 1, activo: true }]);
                setDirecciones([{ detalle: '', tipo: 1 }]);
              }}
              size="large"
            >
              Limpiar Formulario
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrarPersona;
