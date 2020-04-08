import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import { IoMdEye } from 'react-icons/io';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import { Title, Divisor, Signature, SignatureDivisor } from './styles';

export default function DeliveryModal({ content }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <NavLink to="#" onClick={handleOpen}>
        <IoMdEye size={15} style={{ color: '#8E5BE8' }} />
        <span>Visualizar</span>
      </NavLink>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: '#fff',
            color: '#666666',
            borderRadius: '4px',
            padding: '20px',
            width: '450px',
          }}
        >
          <Divisor>
            <Title>Informações da encomenda</Title>
            <p>{content.recipient.address}</p>
            <p>
              {content.recipient.city} - {content.recipient.state}
            </p>
            <p>{content.recipient.zipcode}</p>
          </Divisor>
          <Divisor>
            <Title>Datas</Title>
            <p>
              <b>Retirada: </b>
              {content.start_formated}
            </p>
            <p>
              <b>Entrega: </b>
              {content.end_formated}
            </p>
          </Divisor>
          {content.signature && (
            <>
              <Title>Assinatura do destinatário</Title>
              <SignatureDivisor>
                <Signature src={content.signature.url} />
              </SignatureDivisor>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

DeliveryModal.propTypes = {
  content: PropTypes.shape({
    recipient: PropTypes.shape({
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zipcode: PropTypes.string.isRequired,
    }).isRequired,
    start_formated: PropTypes.string.isRequired,
    end_formated: PropTypes.string.isRequired,
    signature: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
