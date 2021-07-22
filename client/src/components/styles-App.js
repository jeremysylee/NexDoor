import styled from 'styled-components';

export const SidebarContainer = styled.div`
  padding-top: 1.5em;
  padding-right: 2em;
  height: 100vh;
  position: sticky;
  top: 0;
  max-width: 230;
`;

export const Body = styled.div`
  background-color: #f1f2f5;
  @media (max-width: 1200px) {
    ${SidebarContainer} { display: none; }
  }
`;
