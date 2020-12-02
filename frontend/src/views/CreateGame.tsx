import { Divider, Paper, Typography } from '@material-ui/core';
import CreateGameForm from '../components/CreateGameForm';
import PageContent from '../components/PageContent';

const CreateGame: React.FC = () => {
  return (
    <PageContent>
      <Typography variant="h4">Create new game</Typography>
      <Divider />
      <CreateGameForm />
    </PageContent>
  );
};

export default CreateGame;
