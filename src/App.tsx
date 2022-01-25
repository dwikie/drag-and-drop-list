import { ThemeProvider } from "@mui/material";
import EventCtxProvider from "./contexts/EventCtx";
import GlobalCtxProvider from "./contexts/GlobalCtx";
import Index from "./pages";
import Theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalCtxProvider>
        <EventCtxProvider>
          <Index />
        </EventCtxProvider>
      </GlobalCtxProvider>
    </ThemeProvider>
  );
}

export default App;
