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
import { ContentForm, InputLine, AvatarLine } from '~/styles/form.js';

import AvatarInput from '~/components/AvatarInput';

import history from '~/services/history';
import api from '~/services/api';

export default function Deliveryman() {
  const { deliveryman_id } = useParams();
  const [deliveryman, setDeliveryman] = useState([]);
  const [avatarId, setAvatarId] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('A rua é obrigatório'),
  });

  useEffect(() => {
    async function loadDeliveryman() {
      if (deliveryman_id) {
        const response = await api.get(`deliveryman/${deliveryman_id}`);

        setDeliveryman(response.data[0]);
        setAvatar(response.data[0].avatar);
      }
    }

    loadDeliveryman();
  }, [deliveryman_id]);

  function handleBack() {
    history.push('/deliverymen');
  }

  async function handleSubmit(data) {
    const formData = {
      ...data,
      avatar_id: avatarId || (avatar ? avatar.id : null),
    };
    try {
      if (!deliveryman_id) {
        await api.post('deliveryman', formData);
        history.push('/deliverymen');
        toast.success('Entregador adicionado com sucesso!');
      } else {
        await api.put(`deliveryman/${deliveryman_id}`, formData);
        history.push('/deliverymen');
        toast.success('Entregador atualizado com sucesso!');
      }
    } catch (err) {
      toast.error('Erro ao adicionar/atualizar entregador!');
    }
  }

  return (
    <Container>
      <Form initialData={deliveryman} schema={schema} onSubmit={handleSubmit}>
        <Header>
          <PageTitle>
            {deliveryman_id ? 'Edição' : 'Cadastro'} de entregador
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
          <AvatarLine>
            <AvatarInput avatar={avatar} setAvatarId={setAvatarId} />
          </AvatarLine>

          <InputLine>
            <div>
              <Input
                label="Nome do Entregador"
                name="name"
                type="text"
                placeholder="Digite o nome do entregador..."
              />
            </div>
          </InputLine>
          <InputLine>
            <div>
              <Input
                label="Email do Entregador"
                name="email"
                type="text"
                placeholder="Digite o email do entregador..."
              />
            </div>
          </InputLine>
        </ContentForm>
      </Form>
    </Container>
  );
}
