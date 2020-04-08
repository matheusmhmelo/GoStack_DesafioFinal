/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { FaPlus, FaPen, FaTruck } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

import { NavLink, Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { toast } from 'react-toastify';

import { Container, PageActions, NoContent } from './styles';
import { TableItem, TableHeader, Table } from '~/styles/tables.js';
import { PageTitle, Header, NewContent } from '~/styles/pageHeader.js';

import More from '~/components/More/Small';
import history from '~/services/history';
import api from '~/services/api';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);

  async function loadDeliverymen() {
    let url = `deliveryman?page=${page}`;

    if (query) {
      url = `deliveryman?page=${page}&q=${query}`;
    }

    const response = await api.get(url);
    setDeliverymen(response.data);
  }

  useEffect(() => {
    loadDeliverymen();
  }, [page, query]);

  function handleAddNew() {
    history.push('/deliverymen/deliveryman');
  }

  async function handleDelete(deliveryman_id) {
    const confirm = window.confirm(
      'Tem certeza que deseja remover esse entregador?'
    );

    if (confirm) {
      try {
        await api.delete(`deliveryman/${deliveryman_id}`);
        loadDeliverymen();
        toast.success('Entregador removido com sucesso!');
      } catch (err) {
        toast.error('Erro ao remover entregador!');
      }
    }
  }

  async function handlePage(action) {
    await setPage(action === 'back' ? page - 1 : page + 1);
    // this.loadIssues();
  }

  return (
    <Container>
      <PageTitle>Gerenciando entregadores</PageTitle>

      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <Header>
          <div>
            <input
              type="text"
              placeholder="Buscar por entregadores"
              onChange={e => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <NewContent type="button" onClick={handleAddNew}>
            <FaPlus /> <span>CADASTRAR</span>
          </NewContent>
        </Header>
      </form>

      {deliverymen.length !== 0 ? (
        <Table>
          <TableHeader>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </TableHeader>
          {deliverymen.map(deliveryman => (
            <TableItem key={deliveryman.id}>
              <td>#{deliveryman.id}</td>
              <td>
                <Avatar
                  src={deliveryman.avatar ? deliveryman.avatar.url : ''}
                  size={55}
                  className="avatar"
                />
              </td>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>
              <td>
                <More>
                  <Link to={`/deliverymen/deliveryman/${deliveryman.id}`}>
                    <FaPen size={15} style={{ color: '#4D85EE' }} />
                    <span>Editar</span>
                  </Link>
                  <NavLink
                    to="#"
                    onClick={() => {
                      handleDelete(deliveryman.id);
                    }}
                  >
                    <MdDeleteForever size={15} style={{ color: '#DE3B3B' }} />
                    <span>Excluir</span>
                  </NavLink>
                </More>
              </td>
            </TableItem>
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
          disabled={deliverymen.length === 0}
        >
          Próximo
        </button>
      </PageActions>
    </Container>
  );
}
