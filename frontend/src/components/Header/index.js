import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.png';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const admin = useSelector(state => state.admin.profile);
  const colorType = '#444444';

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <NavLink to="/deliveries" activeStyle={{ color: colorType }}>
            ENTREGAS
          </NavLink>
          <NavLink to="/deliverymen" activeStyle={{ color: colorType }}>
            ENTREGADORES
          </NavLink>
          <NavLink to="/recipients" activeStyle={{ color: colorType }}>
            DESTINATÁRIOS
          </NavLink>
          <NavLink to="/problems" activeStyle={{ color: colorType }}>
            PROBLEMAS
          </NavLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{admin.name}</strong>
              <a href="/" onClick={handleSignOut}>
                Sair do Sistema
              </a>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
