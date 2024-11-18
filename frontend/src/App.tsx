import AppRoutes from "./routes";
import AppLayout from "./components/app-layout";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
