import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Select, Modal } from 'antd';
import { UserAddOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
import { apiRequest } from '../Utils/Api';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const RegistroCliente = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Preparar datos para el backend (formato exacto que espera el backend)
      const personaData = {
        Nombre1: values.nombre,
        Apellido1: values.apellido1,
        Apellido2: values.apellido2 || null, // El backend permite null
        Fecha_Nacimiento: '2000-01-01', // Formato YYYY-MM-DD que espera DateOnly
        genero: 1 // Valor por defecto
      };

      console.log('Enviando datos:', personaData);

      // Llamada Ajax al backend
      const response = await apiRequest('POST', 'api/persona', personaData);
      
      console.log('Respuesta del servidor:', response);
      
      if (response.success) {
        const clienteRegistrado = response.data;
        
        // Mensaje de éxito más visible y duradero
        message.success({
          content: `🎉 ¡Cliente ${values.nombre} ${values.apellido1} registrado exitosamente!`,
          duration: 8,
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#52c41a'
          }
        });
        
        // Mensaje adicional para confirmar
        setTimeout(() => {
          message.info({
            content: '📋 Formulario limpiado automáticamente',
            duration: 5
          });
        }, 1000);
        
        // Limpiar formulario automáticamente
        form.resetFields();
        
        // Mostrar modal de confirmación mejorado
        Modal.success({
          title: (
            <div style={{ textAlign: 'center', color: '#52c41a', fontSize: '20px' }}>
              <UserAddOutlined style={{ fontSize: '36px', marginRight: '12px' }} />
              ¡REGISTRO COMPLETADO! 🎉
            </div>
          ),
          content: (
            <div style={{ fontSize: '16px' }}>
              <div style={{ 
                background: '#f6ffed', 
                border: '2px solid #b7eb8f', 
                borderRadius: '12px', 
                padding: '20px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <p style={{ margin: '12px 0', fontWeight: 'bold', fontSize: '18px', color: '#52c41a' }}>
                  ✅ <strong>¡CLIENTE REGISTRADO EXITOSAMENTE!</strong>
                </p>
              </div>
              
              <div style={{ 
                background: '#f0f9ff', 
                border: '2px solid #91d5ff', 
                borderRadius: '12px', 
                padding: '20px' 
              }}>
                <p style={{ margin: '12px 0', fontSize: '16px' }}>
                  <strong>👤 Nombre:</strong> <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{values.nombre} {values.apellido1} {values.apellido2 || ''}</span>
                </p>
                <p style={{ margin: '12px 0', fontSize: '16px' }}>
                  <strong>🆔 ID Asignado:</strong> <span style={{ color: '#1890ff', fontWeight: 'bold', fontSize: '18px' }}>{clienteRegistrado?.idPersona || 'N/A'}</span>
                </p>
                <p style={{ margin: '12px 0', fontSize: '16px' }}>
                  <strong>📅 Fecha de Registro:</strong> {new Date().toLocaleString('es-ES')}
                </p>
                <p style={{ margin: '12px 0', fontSize: '16px' }}>
                  <strong>📊 Total de Clientes:</strong> Se actualizará en la lista
                </p>
              </div>
              
              <div style={{ 
                background: '#fff7e6', 
                border: '2px solid #ffd591', 
                borderRadius: '12px', 
                padding: '16px', 
                marginTop: '16px',
                textAlign: 'center'
              }}>
                <p style={{ margin: '8px 0', color: '#d46b08', fontWeight: 'bold' }}>
                  🧹 <strong>El formulario se ha limpiado automáticamente</strong>
                </p>
              </div>
            </div>
          ),
          okText: 'Ver Lista de Clientes',
          cancelText: 'Registrar Otro Cliente',
          width: 600,
          centered: true,
          onOk: () => {
            navigate('/lista-clientes');
          },
          onCancel: () => {
            // El formulario ya está limpio, solo cerrar el modal
          }
        });
      } else {
        message.error({
          content: `❌ Error al registrar cliente: ${response.message}`,
          duration: 5,
          style: {
            fontSize: '14px'
          }
        });
      }
    } catch (error) {
      console.error('Error completo:', error);
      message.error({
        content: `❌ Error de conexión con el servidor: ${error.message}`,
        duration: 5,
        style: {
          fontSize: '14px'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserAddOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <span>Registro de Cliente</span>
          </div>
        }
        style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >

          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[
              { required: true, message: 'Por favor ingrese el nombre' },
              { min: 2, message: 'El nombre debe tener al menos 2 caracteres' }
            ]}
          >
            <Input 
              placeholder="Ingrese el primer nombre"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Primer Apellido"
            name="apellido1"
            rules={[
              { required: true, message: 'Por favor ingrese el primer apellido' },
              { min: 2, message: 'El apellido debe tener al menos 2 caracteres' }
            ]}
          >
            <Input 
              placeholder="Ingrese el primer apellido"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Segundo Apellido"
            name="apellido2"
            rules={[
              { min: 2, message: 'El apellido debe tener al menos 2 caracteres' }
            ]}
          >
            <Input 
              placeholder="Ingrese el segundo apellido (opcional)"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              icon={<SaveOutlined />}
              style={{ width: '100%', height: '45px' }}
            >
              {loading ? 'Registrando...' : 'Registrar Cliente'}
            </Button>
          </Form.Item>

          {/* Botón para ver lista de clientes */}
          <Form.Item>
            <Button
              type="default"
              size="large"
              icon={<UserOutlined />}
              style={{ width: '100%', height: '45px' }}
              onClick={() => navigate('/lista-clientes')}
            >
              Ver Lista de Clientes
            </Button>
          </Form.Item>


        </Form>
      </Card>
    </div>
  );
};

export default RegistroCliente;
