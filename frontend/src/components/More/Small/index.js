import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useClickOutside from 'click-outside-hook';

import { Container, Badge, ActionsListSmall, Action } from '../styles';

export default function More({ children, isProblem }) {
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
        <button type="button" style={isProblem ? { marginTop: '5px' } : {}}>
          ···
        </button>
      </Badge>

      <ActionsListSmall visible={visible} ref={ref}>
        <Action>{children}</Action>
      </ActionsListSmall>
    </Container>
  );
}

More.propTypes = {
  children: PropTypes.element.isRequired,
  isProblem: PropTypes.bool.isRequired,
};
