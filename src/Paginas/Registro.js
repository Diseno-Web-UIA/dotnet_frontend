import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, Card, Tag, Space, Typography, Divider, Row, Col } from 'antd';
import { MailOutlined, PhoneOutlined, HomeOutlined, UserOutlined, CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../Utils/Api';

const { Title, Text } = Typography;
const PAGE_SIZE = 5;

const App = () => {
  const navigate = useNavigate();
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async (currentPage) => {
    try {
      const res = await apiRequest('Persona', null, { page: currentPage, limit: PAGE_SIZE }, 'GET');
      return Array.isArray(res) ? res : res.data || [];
    } catch (error) {
      console.error('Error al obtener personas:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchData(page).then((res) => {
      setInitLoading(false);
      setData(res);
      setList(res);
    });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(data.concat(Array.from({ length: PAGE_SIZE }).map(() => ({ loading: true }))));
    const nextPage = page + 1;
    setPage(nextPage);

    fetchData(nextPage).then((res) => {
      const newData = data.concat(res);
      setData(newData);
      setList(newData);
      setLoading(false);
      window.dispatchEvent(new Event('resize'));
    });
  };

  const loadMore = !initLoading && !loading ? (
    <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
      <Button type="primary" onClick={onLoadMore}>Cargar más personas</Button>
    </div>
  ) : null;

  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  const getGenderText = (genero) => {
    return genero === 1 ? 'Masculino' : genero === 2 ? 'Femenino' : 'No especificado';
  };

  const renderPersonaCard = (item) => (
    <Card 
      style={{ marginBottom: 16, borderRadius: 8 }}
      hoverable
      actions={[
        <Button key="edit" type="link" icon={<UserOutlined />}>Editar</Button>,
        <Button key="more" type="link">Ver más</Button>
      ]}
    >
      <Row gutter={16}>
        <Col span={4}>
          <Avatar
            size={64}
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.Nombre1 || 'P'}`}
            style={{ backgroundColor: '#1890ff' }}
          />
        </Col>
        <Col span={20}>
          <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
            {item.Nombre1} {item.Apellido1} {item.Apellido2}
          </Title>
          
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <div>
              <CalendarOutlined style={{ marginRight: 8, color: '#52c41a' }} />
              <Text>Nacimiento: {formatDate(item.Fecha_Nacimiento)}</Text>
            </div>
            
            <div>
              <UserOutlined style={{ marginRight: 8, color: '#722ed1' }} />
              <Text>Género: {getGenderText(item.genero)}</Text>
            </div>

            {item.Emails && item.Emails.length > 0 && (
              <div>
                <MailOutlined style={{ marginRight: 8, color: '#fa8c16' }} />
                <Text strong>Emails:</Text>
                <Space wrap style={{ marginLeft: 16 }}>
                  {item.Emails.map((email, index) => (
                    <Tag 
                      key={index} 
                      color={email.Verificado ? 'green' : 'orange'}
                      icon={<MailOutlined />}
                    >
                      {email.Direccion_Email}
                      {email.Verificado && <span style={{ marginLeft: 4 }}>✓</span>}
                    </Tag>
                  ))}
                </Space>
              </div>
            )}

            {item.Telefonos && item.Telefonos.length > 0 && (
              <div>
                <PhoneOutlined style={{ marginRight: 8, color: '#13c2c2' }} />
                <Text strong>Teléfonos:</Text>
                <Space wrap style={{ marginLeft: 16 }}>
                  {item.Telefonos.map((telefono, index) => (
                    <Tag 
                      key={index} 
                      color={telefono.Activo ? 'blue' : 'default'}
                      icon={<PhoneOutlined />}
                    >
                      {telefono.Numero}
                    </Tag>
                  ))}
                </Space>
              </div>
            )}

            {item.Direcciones && item.Direcciones.length > 0 && (
              <div>
                <HomeOutlined style={{ marginRight: 8, color: '#eb2f96' }} />
                <Text strong>Direcciones:</Text>
                <Space direction="vertical" style={{ marginLeft: 16 }}>
                  {item.Direcciones.map((direccion, index) => (
                    <Text key={index} type="secondary">
                      {direccion.Detalle_Direccion}
                    </Text>
                  ))}
                </Space>
              </div>
            )}

            {item.Usuarios && item.Usuarios.length > 0 && (
              <div>
                <Tag color="purple" icon={<UserOutlined />}>
                  Usuario registrado
                </Tag>
              </div>
            )}
          </Space>
        </Col>
      </Row>
    </Card>
  );

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
          Registro de Personas
        </Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          onClick={() => navigate('/registrar-persona')}
        >
          Registrar Nueva Persona
        </Button>
      </div>
      
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="vertical"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              {renderPersonaCard(item)}
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default App;
