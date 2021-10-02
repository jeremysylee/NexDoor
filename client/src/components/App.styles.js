import styled from 'styled-components';

export const SidebarContainer = styled.div`
  padding-right: 2em;
  padding-top: 0.5em;
  height: 100vh;
  position: sticky;
  top: 0;
  max-width: 230;
  margin-top: 1.5em;
`;

export const Body = styled.div`
  background-color: #f1f2f5;
  @media (max-width: 1330px) {
    ${SidebarContainer} { display: none; }
  }
`;
