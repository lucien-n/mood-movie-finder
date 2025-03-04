import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GenresList from "./components/GenresList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <p>hello</p>
      <GenresList />
    </QueryClientProvider>
  );
}

export default App;
