import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout"
import Thanks from "./components/Thanks"

export const config = {
  endpoint: `https://qkart-frontend-projects-backend.onrender.com/api/v1`
};

function App() {
  return (
    <div className="App">
          {/* <Register /> */}
          {/* <Login /> */}
        <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Products} />
        <Route path="/checkout" component={Checkout}/>
        <Route path="/thanks" component={Thanks}/>
      </Switch>
    </div>
  );
}

export default App;
