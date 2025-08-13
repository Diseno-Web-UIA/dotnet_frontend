import React from 'react';
import { Card, Row, Col, Button, Typography, Space } from 'antd';
import { 
  UserAddOutlined, 
  TeamOutlined, 
  CalculatorOutlined, 
  FileTextOutlined, 
  CodeOutlined,
  FileSearchOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Registro de Clientes',
      description: 'Sistema unificado para registrar clientes de forma simple o completa',
      icon: <UserAddOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      route: '/registro',
      color: '#1890ff'
    },
    {
      title: 'Lista de Clientes',
      description: 'Visualizar todos los clientes registrados en el sistema',
      icon: <TeamOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
      route: '/lista-clientes',
      color: '#52c41a'
    },
    {
      title: 'Exportar XML',
      description: 'Exportar datos de clientes en formato XML',
      icon: <FileTextOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
      route: '/exportar',
      color: '#722ed1'
    },
    {
      title: 'Exportar JSON',
      description: 'Exportar datos de clientes en formato JSON',
      icon: <CodeOutlined style={{ fontSize: '32px', color: '#13c2c2' }} />,
      route: '/exportar',
      color: '#13c2c2'
    },
    {
      title: 'Leer Archivos',
      description: 'Leer y mostrar archivos XML y JSON en tablas',
      icon: <FileSearchOutlined style={{ fontSize: '32px', color: '#eb2f96' }} />,
      route: '/leer-archivos',
      color: '#eb2f96'
    }
  ];

  return (
    <div style={{ padding: '24px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header con imagen de agua */}
        <Card 
          style={{ 
            marginBottom: '32px', 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
            border: 'none',
            borderRadius: '16px'
          }}
        >
          <div style={{ padding: '40px 20px' }}>
            <HomeOutlined style={{ fontSize: '64px', color: 'white', marginBottom: '16px' }} />
            <Title level={1} style={{ color: 'white', margin: 0 }}>
              Sistema de Gestión de Clientes
            </Title>
            <Paragraph style={{ color: 'white', fontSize: '18px', margin: '16px 0 0 0' }}>
              Interfaz completa para la administración de clientes con funcionalidades avanzadas
            </Paragraph>
          </div>
        </Card>

        {/* Grid de funcionalidades */}
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                style={{ 
                  height: '100%',
                  borderRadius: '12px',
                  border: `2px solid ${feature.color}20`,
                  transition: 'all 0.3s ease'
                }}
                                 styles={{ body: { padding: '24px' } }}
                onClick={() => navigate(feature.route)}
              >
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  {feature.icon}
                </div>
                <Title level={4} style={{ textAlign: 'center', marginBottom: '12px' }}>
                  {feature.title}
                </Title>
                <Paragraph style={{ textAlign: 'center', color: '#666', margin: 0 }}>
                  {feature.description}
                </Paragraph>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <Button 
                    type="primary" 
                    size="large"
                    style={{ backgroundColor: feature.color, borderColor: feature.color }}
                  >
                    Acceder
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Información adicional */}
        <Card 
          style={{ 
            marginTop: '32px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <Title level={3} style={{ textAlign: 'center', color: '#1890ff' }}>
            Características del Sistema
          </Title>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>9</div>
                <div>Funcionalidades Principales</div>
              </div>
            </Col>
            <Col span={8}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>SQL Server</div>
                <div>Base de Datos</div>
              </div>
            </Col>
            <Col span={8}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>React</div>
                <div>Frontend Moderno</div>
              </div>
            </Col>
          </Row>
          
          {/* Información sobre la calculadora flotante */}
          <Card 
            style={{ 
              marginTop: '24px',
              background: 'linear-gradient(135deg, #fa8c16 0%, #ff6b35 100%)',
              border: 'none',
              borderRadius: '12px'
            }}
          >
            <div style={{ textAlign: 'center', color: 'white' }}>
              <CalculatorOutlined style={{ fontSize: '32px', marginBottom: '8px' }} />
              <Title level={4} style={{ color: 'white', margin: '8px 0' }}>
                Calculadora Matemática
              </Title>
              <Paragraph style={{ color: 'white', margin: 0 }}>
                <strong>¡Acceso directo!</strong> La calculadora está disponible como botón flotante 
                en la esquina inferior derecha de la pantalla. Realiza operaciones aritméticas 
                con colores diferentes para cada operación y resta automáticamente 10 del resultado.
              </Paragraph>
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default Home;
