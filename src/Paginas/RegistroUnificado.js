import React, { useState } from 'react';
import { Card, Tabs, Typography, Space, Alert } from 'antd';
import { UserAddOutlined, FileTextOutlined } from '@ant-design/icons';
import RegistroCliente from './RegistroCliente';
import RegistrarPersona from './RegistrarPersona';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const RegistroUnificado = () => {
  const [activeTab, setActiveTab] = useState('simple');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <UserAddOutlined style={{ fontSize: '28px', color: '#1890ff' }} />
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              Sistema de Registro de Clientes
            </Title>
          </div>
        }
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Información del sistema */}
          <Alert
            message="Elige el tipo de registro que necesites"
            description="Puedes registrar clientes de forma simple (datos básicos) o completa (con emails, teléfonos y direcciones)"
            type="info"
            showIcon
            style={{ marginBottom: '24px' }}
          />

          {/* Tabs para elegir el tipo de registro */}
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            type="card"
            size="large"
            style={{ width: '100%' }}
            items={[
              {
                key: 'simple',
                label: (
                  <span>
                    <UserAddOutlined style={{ marginRight: '8px' }} />
                    Registro Simple
                  </span>
                ),
                children: (
                  <div style={{ padding: '20px 0' }}>
                    <Card
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <UserAddOutlined style={{ fontSize: '20px', color: '#52c41a' }} />
                          <span>Registro Básico de Cliente</span>
                        </div>
                      }
                      style={{ border: '2px solid #52c41a', borderRadius: '8px' }}
                    >
                      <Paragraph style={{ marginBottom: '20px' }}>
                        <strong>Ideal para:</strong> Registro rápido de clientes con información básica.
                        Incluye: nombre, apellidos, fecha de nacimiento y género.
                      </Paragraph>
                      <RegistroCliente />
                    </Card>
                  </div>
                )
              },
              {
                key: 'completo',
                label: (
                  <span>
                    <FileTextOutlined style={{ marginRight: '8px' }} />
                    Registro Completo
                  </span>
                ),
                children: (
                  <div style={{ padding: '20px 0' }}>
                    <Card
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FileTextOutlined style={{ fontSize: '20px', color: '#722ed1' }} />
                          <span>Registro Completo de Persona</span>
                        </div>
                      }
                      style={{ border: '2px solid #722ed1', borderRadius: '8px' }}
                    >
                      <Paragraph style={{ marginBottom: '20px' }}>
                        <strong>Ideal para:</strong> Registro detallado con información completa.
                        Incluye: datos personales, múltiples emails, teléfonos y direcciones.
                      </Paragraph>
                      <RegistrarPersona />
                    </Card>
                  </div>
                )
              }
            ]}
          />

          {/* Información adicional */}
          <Card style={{ background: '#f8f9fa', border: '1px solid #e8e8e8' }}>
            <Title level={4} style={{ color: '#1890ff', textAlign: 'center' }}>
              ¿Cuál elegir?
            </Title>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center', padding: '16px', flex: '1', minWidth: '200px' }}>
                  <UserAddOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: '8px' }} />
                  <Title level={5} style={{ color: '#52c41a' }}>Registro Simple</Title>
                  <Paragraph style={{ fontSize: '12px', margin: 0 }}>
                    • Rápido y sencillo<br/>
                    • Solo datos básicos<br/>
                    • Ideal para registros masivos
                  </Paragraph>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', flex: '1', minWidth: '200px' }}>
                  <FileTextOutlined style={{ fontSize: '32px', color: '#722ed1', marginBottom: '8px' }} />
                  <Title level={5} style={{ color: '#722ed1' }}>Registro Completo</Title>
                  <Paragraph style={{ fontSize: '12px', margin: 0 }}>
                    • Detallado y completo<br/>
                    • Con emails y teléfonos<br/>
                    • Ideal para clientes importantes
                  </Paragraph>
                </div>
              </div>
            </Space>
          </Card>
        </Space>
      </Card>
    </div>
  );
};

export default RegistroUnificado;
