import styled from 'styled-components';

export const PlayerInfo = styled.p`
  color: #eee;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 2px 10px;
`;

export const PlayerContainer = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10px;
  margin-right: 10px;
  max-width: 150px;
  min-width: auto;
  display: flex;
`;

export const PlayerName = styled.p`
  color: #fff;
  font-size: 16px;
  width: 120px;
`;

export const InfoCode = styled(PlayerInfo)`
  color: #fff;
`;