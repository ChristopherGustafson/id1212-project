import CreateGameForm from '../components/CreateGameForm';
import PageContent from '../components/PageContent';

const CreateGame: React.FC = () => {
  return (
    <PageContent title="Create new game">
      <CreateGameForm />
    </PageContent>
  );
};

export default CreateGame;
