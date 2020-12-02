import ChessBoard from '../components/ChessBoard';
import { ChessContextProvider } from '../context/ChessContext';

const Dashboard: React.FC = () => {
  return (
    <ChessContextProvider>
      <ChessBoard />
    </ChessContextProvider>
  );
};

export default Dashboard;
