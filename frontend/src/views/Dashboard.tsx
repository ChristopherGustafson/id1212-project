import { useRouteMatch } from 'react-router';
import ChessBoard from '../components/ChessBoard';
import { ChessContextProvider } from '../context/ChessContext';

interface MatchProps {
  code: string;
}

const Dashboard: React.FC = () => {
  const match = useRouteMatch<MatchProps>();

  return (
    <ChessContextProvider code={match.params.code}>
      <ChessBoard />
    </ChessContextProvider>
  );
};

export default Dashboard;
