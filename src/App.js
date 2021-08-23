import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./common/Footer/Footer";
import Header from "./common/Header";
import Navigation from "./navigation/Navigation";

function App() {
  return (
    <>
      <Router>
        <Header title="Home" />
        <div className={"body"}>
          <Navigation /> 
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
