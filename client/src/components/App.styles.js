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
  @media (max-width: 1330px) {
    ${SidebarContainer} { display: none; }
  }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ColCentered = styled(Col)`
  justify-content: center;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
`;

export const RowCentered = styled(Row)`
  justify-content: center;
`;

export const PageHeader = styled.div`
  position: absolute;
  width: 400px;
  font-size: 23px;
  font-weight: 500;
  top: -15;
`;

export const Anchor = styled.div`
  position: relative;
`;
