import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import { IoMdEye } from 'react-icons/io';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import { Title, Content } from './styles';

export default function ProblemsModal({ description }) {
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
            maxWidth: '450px',
          }}
        >
          <Title>VISUALIZAR PROBLEMA</Title>
          <Content>{description}</Content>
        </div>
      </Modal>
    </div>
  );
}

ProblemsModal.propTypes = {
  description: PropTypes.string.isRequired,
};
