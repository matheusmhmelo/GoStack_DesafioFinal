/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { FaTruck } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import { NavLink } from 'react-router-dom';

import ProblemsModal from './Modal';

import { Container, NoContent, PageActions } from './styles';
import { TableItem, TableHeader, Table } from '~/styles/tables.js';
import { PageTitle, Header } from '~/styles/pageHeader.js';

import More from '~/components/More/Small';

import api from '~/services/api';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);

  async function loadProblem() {
    let url = `problem?page=${page}`;

    if (query) {
      url = `problem?page=${page}&q=${query}`;
    }

    const response = await api.get(url);
    setProblems(response.data);
  }

  useEffect(() => {
    loadProblem();
  }, [page, query]);

  async function handleCancel(delivery_id) {
    const confirm = window.confirm(
      'Tem certeza que deseja cancelar essa entrega?'
    );

    if (confirm) {
      try {
        await api.delete(`problem/${delivery_id}/cancel-delivery`);
        toast.success('Entrega cancelada com sucesso!');
      } catch (err) {
        toast.error(
          'Erro no cancelamento, verifique se a entrega já foi cancelada!'
        );
      }
    }
  }

  async function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  return (
    <Container>
      <PageTitle>Problemas na entrega</PageTitle>

      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <Header>
          <div>
            <input
              type="text"
              placeholder="Buscar pelo ID da encomenda"
              onChange={e => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </Header>
      </form>

      {problems.length !== 0 ? (
        <Table>
          <TableHeader firstSmall>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </TableHeader>

          {problems.map(problem => (
            <TableItem key={problem.id}>
              <td>#{problem.delivery_id}</td>
              <td>
                {problem.description.length > 100
                  ? `${problem.description.substr(0, 100)}...`
                  : problem.description}
              </td>
              <td>
                <More isProblem>
                  <ProblemsModal description={problem.description} />

                  <NavLink
                    to="#"
                    onClick={() => {
                      handleCancel(problem.delivery_id);
                    }}
                  >
                    <MdDeleteForever size={25} style={{ color: '#DE3B3B' }} />
                    <span>Cancelar encomenda</span>
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
          disabled={problems.length === 0}
        >
          Próximo
        </button>
      </PageActions>
    </Container>
  );
}
