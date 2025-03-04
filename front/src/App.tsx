import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Recommendations from "./components/Recommendations";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto py-8 px-4">
        <Recommendations />
      </div>
    </QueryClientProvider>
  );
}

export default App;
