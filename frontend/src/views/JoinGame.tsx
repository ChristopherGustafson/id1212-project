import React from 'react';
import PageContent from '../components/PageContent';
import JoinGameForm from '../components/JoinGameForm';

const JoinGame: React.FC = () => {
  return (
    <PageContent title="Join game">
      <JoinGameForm />
    </PageContent>
  );
};

export default JoinGame;
