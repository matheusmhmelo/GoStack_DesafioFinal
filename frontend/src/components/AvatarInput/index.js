import React, { useState, useRef, useEffect } from 'react';
import { IoMdImage } from 'react-icons/io';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput({ avatar, setAvatarId }) {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  useEffect(() => {
    if (avatar) {
      setFile(avatar.id);
      setPreview(avatar.url);
    }
  }, [avatar]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
    setAvatarId(id);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="" />
        ) : (
          <div>
            <IoMdImage
              size={40}
              style={{ color: '#DDDDDD', marginLeft: '35px' }}
            />
            <span>Adicionar foto</span>
          </div>
        )}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

AvatarInput.propTypes = {
  avatar: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  setAvatarId: PropTypes.func.isRequired,
};
