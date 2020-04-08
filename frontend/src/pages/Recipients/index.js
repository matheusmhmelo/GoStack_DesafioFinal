/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { FaPlus, FaPen, FaTruck } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import { NavLink } from 'react-router-dom';

import { Container, PageActions, NoContent } from './styles';
import { TableItem, TableHeader, Table } from '~/styles/tables.js';
import { PageTitle, Header, NewContent } from '~/styles/pageHeader.js';

import More from '~/components/More/Small';
import history from '~/services/history';
import api from '~/services/api';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);

  async function loadRecipients() {
    let url = `recipient?page=${page}`;

    if (query) {
      url = `recipient?page=${page}&q=${query}`;
    }

    const response = await api.get(url);
    setRecipients(response.data);
  }

  useEffect(() => {
    loadRecipients();
  }, [page, query]);

  function handleAddNew() {
    history.push('/recipients/recipient');
  }

  async function handleDelete(recipient_id) {
    const confirm = window.confirm(
      'Tem certeza que deseja remover esse destinatário?'
    );

    if (confirm) {
      try {
        await api.delete(`recipient/${recipient_id}`);
        loadRecipients();
        toast.success('Destinatário removido com sucesso!');
      } catch (err) {
        toast.error('Erro ao remover destinatário!');
      }
    }
  }

  async function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  return (
    <Container>
      <PageTitle>Gerenciando destinatários</PageTitle>

      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <Header>
          <div>
            <input
              type="text"
              placeholder="Buscar por destinatários"
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

      {recipients.length !== 0 ? (
        <Table>
          <TableHeader firstSmall>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </TableHeader>

          {recipients.map(recipient => (
            <TableItem key={recipient.id}>
              <td>#{recipient.id}</td>
              <td>{recipient.name}</td>
              <td>
                {recipient.address}, {recipient.number}, {recipient.city} -{' '}
                {recipient.state}
              </td>
              <td>
                <More>
                  <NavLink to={`/recipients/recipient/${recipient.id}`}>
                    <FaPen size={15} style={{ color: '#4D85EE' }} />
                    <span>Editar</span>
                  </NavLink>
                  <NavLink
                    to="#"
                    onClick={() => {
                      handleDelete(recipient.id);
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
          disabled={recipients.length === 0}
        >
          Próximo
        </button>
      </PageActions>
    </Container>
  );
}
