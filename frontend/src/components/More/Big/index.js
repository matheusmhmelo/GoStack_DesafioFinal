import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useClickOutside from 'click-outside-hook';

import { Container, Badge, ActionsList, Action } from '../styles';

export default function More({ children }) {
  const [visible, setVisible] = useState(false);
  const ref = useClickOutside(() => {
    if (visible) {
      setVisible(!visible);
    }
  });

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible}>
        <button type="button">···</button>
      </Badge>

      <ActionsList visible={visible} ref={ref}>
        <Action>{children}</Action>
      </ActionsList>
    </Container>
  );
}

More.propTypes = {
  children: PropTypes.element.isRequired,
};
