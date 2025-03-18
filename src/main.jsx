import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ActivityProvider from "./context/ActivityProvider.jsx";
import TimerProvider from "./context/TimerProvider.jsx";
import UserProvider from "./context/UserProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ActivityProvider>
          <TimerProvider>
            <App />
          </TimerProvider>
        </ActivityProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);
