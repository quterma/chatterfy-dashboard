import { DataServiceProvider } from './context/DataServiceContext';
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <DataServiceProvider>
      <Layout />
    </DataServiceProvider>
  );
}

export default App;
