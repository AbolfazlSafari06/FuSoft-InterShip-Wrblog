import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./navigation/Navigation";
// import { Provider } from "react-redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store"; 
function App() {
  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navigation />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
