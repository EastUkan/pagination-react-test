import { Container } from "@mui/material";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Container sx={{ marginTop: 5 }} maxWidth="md">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={About} />
        <Route path="/notFound" component={NotFound} />
      </Switch>
    </Container>
  );
}

export default App;
