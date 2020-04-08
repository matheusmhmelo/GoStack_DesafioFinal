/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useParams } from 'react-router-dom';
import { IoMdCheckmark } from 'react-icons/io';
import { MdChevronLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Container } from './styles';
import { Header, Save, Back, PageTitle } from '~/styles/pageHeader.js';
import { ContentForm, InputLine } from '~/styles/form.js';

import history from '~/services/history';
import api from '~/services/api';

import CepInput from '~/components/CepInput';

export default function Recipient() {
  const { recipient_id } = useParams();
  const [recipient, setRecipient] = useState([]);

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    address: Yup.string().required('A rua é obrigatório'),
    number: Yup.string().required('O número é obrigatório'),
    complement: Yup.string().required('O complemento é obrigatório'),
    city: Yup.string().required('A cidade é obrigatório'),
    state: Yup.string().required('O estado é obrigatório'),
    zipcode: Yup.string().required('O CEP é obrigatório'),
  });

  useEffect(() => {
    async function loadRecipient() {
      if (recipient_id) {
        const response = await api.get(`recipient/${recipient_id}`);
        setRecipient(response.data[0]);
      }
    }

    loadRecipient();
  }, [recipient_id]);

  function handleBack() {
    history.push('/recipients');
  }

  async function handleSubmit(data) {
    try {
      if (!recipient_id) {
        await api.post('recipient', data);
        history.push('/recipients');
        toast.success('Destinatário adicionado com sucesso!');
      } else {
        await api.put(`recipient/${recipient_id}`, data);
        history.push('/recipients');
        toast.success('Destinatário atualizado com sucesso!');
      }
    } catch (err) {
      toast.error('Erro ao adicionar/atualizar destinatário!');
    }
  }

  return (
    <Container>
      <Form initialData={recipient} schema={schema} onSubmit={handleSubmit}>
        <Header>
          <PageTitle>
            {recipient_id ? 'Edição' : 'Cadastro'} de destinatário
          </PageTitle>

          <div>
            <Back type="button" onClick={handleBack}>
              <MdChevronLeft />
              <span>VOLTAR</span>
            </Back>
            <Save type="submit">
              <IoMdCheckmark />
              <span>SALVAR</span>
            </Save>
          </div>
        </Header>

        <ContentForm>
          <InputLine>
            <div>
              <Input
                label="Nome"
                name="name"
                type="text"
                placeholder="Nome do destinatário"
              />
            </div>
          </InputLine>
          <InputLine>
            <div className="address-div">
              <Input
                label="Rua"
                name="address"
                type="text"
                placeholder="Nome da Rua"
              />
            </div>
            <div>
              <Input
                label="Número"
                name="number"
                type="text"
                placeholder="Número"
              />
            </div>
            <div>
              <Input
                label="Complemento"
                name="complement"
                type="text"
                placeholder="Complemento"
              />
            </div>
          </InputLine>
          <InputLine>
            <div>
              <Input
                label="Cidade"
                name="city"
                type="text"
                placeholder="Cidade"
              />
            </div>
            <div>
              <Input
                label="Estado"
                name="state"
                type="text"
                placeholder="Estado"
              />
            </div>
            <div>
              <label htmlFor="zipcode">CEP</label>
              <CepInput
                label="CEP"
                name="zipcode"
                type="text"
                placeholder="CEP"
                value={recipient.zipcode}
              />
            </div>
          </InputLine>
        </ContentForm>
      </Form>
    </Container>
  );
}
