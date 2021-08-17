import { BrowserRouter as Router } from "react-router-dom";
import Header from "./common/Header";
import Navigation from "./navigation/Navigation";

function App() {
  return (
    <Router>
      <Header title="Home" />
      <Navigation />
    </Router>
  );
}

export default App;
