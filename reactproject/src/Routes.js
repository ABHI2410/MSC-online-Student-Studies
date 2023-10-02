import { BrowserRouter as Router, Switch, Route  } from "react-router-dom"
import { Login } from "./Components/login";
import { Register } from "./Components/register";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
            </Switch>
        </Router>
    );
}