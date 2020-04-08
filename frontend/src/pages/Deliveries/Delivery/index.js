/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useParams } from 'react-router-dom';
import { IoMdCheckmark } from 'react-icons/io';
import { MdChevronLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import _ from 'lodash';

import AsyncSelect from 'react-select/async';

import { Container } from './styles';
import { Header, Save, Back, PageTitle } from '~/styles/pageHeader.js';
import { ContentForm, SelectDiv, InputLine } from '~/styles/form.js';

import history from '~/services/history';
import api from '~/services/api';

export default function Delivery() {
  const { delivery_id } = useParams();
  const [delivery, setDelivery] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);
  const [recipients, setRecipients] = useState([]);

  const [deliveryman, setDeliveryman] = useState(null);
  const [deliverymanName, setDeliverymanName] = useState(null);

  const [recipient, setRecipient] = useState(null);
  const [recipientName, setRecipientName] = useState(null);

  const schema = Yup.object().shape({
    product: Yup.string().required('O nome do produto é obrigatório'),
  });

  useEffect(() => {
    async function loadDelivery() {
      if (delivery_id) {
        const response = await api.get(`delivery/info/${delivery_id}`);
        setDelivery(response.data[0]);

        setDeliveryman(response.data[0].deliveryman.id);
        setDeliverymanName(response.data[0].deliveryman.name);

        setRecipient(response.data[0].recipient.id);
        setRecipientName(response.data[0].recipient.name);
      }

      const allDeliverymen = await api.get('deliveryman');
      setDeliverymen(
        allDeliverymen.data.map(d => {
          return {
            value: d.id,
            label: d.name,
          };
        })
      );

      const allRecipients = await api.get('recipient');
      setRecipients(
        allRecipients.data.map(r => {
          return {
            value: r.id,
            label: r.name,
          };
        })
      );
    }

    loadDelivery();
  }, []);

  function handleBack() {
    history.push('/deliveries');
  }

  async function handleSubmit(data) {
    const formData = {
      ...data,
      recipient_id: recipient,
      deliveryman_id: deliveryman,
    };
    try {
      if (!delivery_id) {
        await api.post('delivery', formData);
        history.push('/deliveries');
        toast.success('Entrega adicionada com sucesso!');
      } else {
        await api.put(`delivery/${delivery_id}`, formData);
        history.push('/deliveries');
        toast.success('Entrega atualizada com sucesso!');
      }
    } catch (err) {
      toast.error('Erro ao adicionar/atualizar entrega!');
    }
  }

  function handleDeliverymanChange(inputValue) {
    setDeliveryman(inputValue.value);
  }

  function handleRecipientChange(inputValue) {
    setRecipient(inputValue.value);
  }

  function loadRecipientOptions(inputValue) {
    return new Promise(resolve => {
      const filtered = _.filter(recipients, o =>
        _.startsWith(_.toLower(o.label), _.toLower(inputValue))
      );
      resolve(filtered.slice(0, 3));
    });
  }

  function loadDeliverymanOptions(inputValue) {
    return new Promise(resolve => {
      const filtered = _.filter(deliverymen, o =>
        _.startsWith(_.toLower(o.label), _.toLower(inputValue))
      );
      resolve(filtered.slice(0, 3));
    });
  }

  return (
    <Container>
      <Form initialData={delivery} schema={schema} onSubmit={handleSubmit}>
        <Header>
          <PageTitle>
            {delivery_id ? 'Edição' : 'Cadastro'} de encomendas
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
          <SelectDiv>
            <div>
              <span>Destinatário</span>
              <AsyncSelect
                name="recipient_id"
                loadOptions={inputValue => loadRecipientOptions(inputValue)}
                defaultOptions={recipients}
                onChange={handleRecipientChange}
                placeholder={recipientName || 'Selecione o destinatário...'}
              />
            </div>
            <div>
              <span>Entregador</span>
              <AsyncSelect
                name="deliveryman_id"
                loadOptions={inputValue => loadDeliverymanOptions(inputValue)}
                defaultOptions={deliverymen}
                onChange={handleDeliverymanChange}
                placeholder={deliverymanName || 'Selecione o destinatário...'}
              />
            </div>
          </SelectDiv>
          <InputLine>
            <div>
              <Input
                label="Nome do Produto"
                name="product"
                type="text"
                placeholder="Digite o nome do produto..."
              />
            </div>
          </InputLine>
        </ContentForm>
      </Form>
    </Container>
  );
}
