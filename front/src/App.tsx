import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Recommendations from "./components/Recommendations";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Recommendations />

      <Toaster richColors />
    </QueryClientProvider>
  );
}

export default App;
