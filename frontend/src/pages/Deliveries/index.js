/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { FaPlus, FaPen, FaTruck } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';
import { MdDeleteForever } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import DeliveryModal from './Modal';

import {
  Container,
  DeliverymanItem,
  DeliveryStatus,
  PageActions,
  NoContent,
} from './styles';
import { TableDeliveries, TableHeader, Table } from '~/styles/tables.js';
import { PageTitle, Header, NewContent } from '~/styles/pageHeader.js';

import More from '~/components/More/Big';
import history from '~/services/history';
import api from '~/services/api';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);
  const [problems, setProblems] = useState(false);

  function handleDeliveryes(allDeliveries) {
    const deliveriesMaped = allDeliveries.map(data => {
      if (data.end_date) {
        data.status = 'entregue';
      }
      if (data.canceled_at) {
        data.status = 'cancelada';
      }
      if (data.start_date && !data.end_date && !data.canceled_at) {
        data.status = 'retirada';
      }
      if (!data.start_date && !data.end_date && !data.canceled_at) {
        data.status = 'pendente';
      }

      data.start_formated = data.start_date
        ? format(new Date(data.start_date), 'dd/MM/yyyy', {
            locale: pt,
          })
        : '';
      data.end_formated = data.end_date
        ? format(new Date(data.end_date), 'dd/MM/yyyy', {
            locale: pt,
          })
        : '';

      return data;
    });

    return deliveriesMaped;
  }

  async function loadDeliveries() {
    let url = `delivery?page=${page}`;

    if (problems) {
      url = `problem/deliveries?page=${page}`;
    }

    if (query) {
      if (problems) {
        url = `problem/deliveries?page=${page}&q=${query}`;
      } else {
        url = `delivery?page=${page}&q=${query}`;
      }
    }

    const response = await api.get(url);
    const deliveriesMaped = handleDeliveryes(response.data);
    setDeliveries(deliveriesMaped);
  }

  useEffect(() => {
    loadDeliveries();
  }, [query, page, problems]);

  function handleAddNew() {
    history.push('/deliveries/delivery');
  }

  async function handleDelete(delivery_id) {
    const confirm = window.confirm(
      'Tem certeza que deseja remover essa entrega?'
    );

    if (confirm) {
      try {
        await api.delete(`delivery/${delivery_id}`);
        loadDeliveries();
        toast.success('Entrega removido com sucesso!');
      } catch (err) {
        toast.error('Erro ao remover entregador!');
      }
    }
  }

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  function handleOnlyProblems() {
    setProblems(!problems);
  }

  return (
    <Container>
      <PageTitle>Gerenciando encomendas</PageTitle>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <Header>
          <div>
            <input
              type="text"
              placeholder="Buscar por encomendas"
              onChange={e => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
            <Switch
              onChange={handleOnlyProblems}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <span
              style={{
                marginTop: '10px',
                color: '#999999',
              }}
            >
              Apenas encomendas com problemas
            </span>
          </div>
          <NewContent type="button" onClick={handleAddNew}>
            <FaPlus /> <span>CADASTRAR</span>
          </NewContent>
        </Header>
      </form>

      {deliveries.length !== 0 ? (
        <Table>
          <TableHeader firstSmall>
            <th>ID</th>
            <th>Produto</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </TableHeader>

          {deliveries.map(delivery => (
            <TableDeliveries key={delivery.id}>
              <td>#{delivery.id}</td>
              <td>{delivery.product}</td>
              <td>{delivery.recipient.name}</td>
              <DeliverymanItem>
                <div>
                  <Avatar
                    src={
                      delivery.deliveryman.avatar
                        ? delivery.deliveryman.avatar.url
                        : ''
                    }
                    size={55}
                    className="avatar"
                  />
                  <span>{delivery.deliveryman.name}</span>
                </div>
              </DeliverymanItem>
              <td>{delivery.recipient.city}</td>
              <td>{delivery.recipient.state}</td>
              <DeliveryStatus status={delivery.status}>
                <div>
                  <GoPrimitiveDot size={40} />
                  <span>{delivery.status.toUpperCase()}</span>
                </div>
              </DeliveryStatus>
              <td>
                <More>
                  <DeliveryModal content={delivery} />

                  <NavLink to={`/deliveries/delivery/${delivery.id}`}>
                    <FaPen size={15} style={{ color: '#4D85EE' }} />
                    <span>Editar</span>
                  </NavLink>
                  <NavLink
                    to="#"
                    onClick={() => {
                      handleDelete(delivery.id);
                    }}
                  >
                    <MdDeleteForever size={15} style={{ color: '#DE3B3B' }} />
                    <span>Excluir</span>
                  </NavLink>
                </More>
              </td>
            </TableDeliveries>
          ))}
        </Table>
      ) : (
        <NoContent>
          <div>
            <div>
              <FaTruck size={60} />
            </div>
            <span>Nenhum dado encontrado</span>
          </div>
        </NoContent>
      )}

      <PageActions>
        <button
          type="button"
          disabled={page < 2}
          onClick={() => handlePage('back')}
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button
          type="button"
          onClick={() => handlePage('next')}
          disabled={deliveries.length === 0}
        >
          Próximo
        </button>
      </PageActions>
    </Container>
  );
}
