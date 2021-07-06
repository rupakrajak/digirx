import "./App.css";
import { AppContextProvider } from "./components/AppContext";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import VideoCall from "./components/VideoCall";
import WritePrescription from "./components/WritePrescription";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    document.title = "DigiRx | A Medical Assistant";
    return (
        <Router>
            <AppContextProvider>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/signin" component={SignIn} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route
                            exact
                            path="/dashboard/video-call"
                            component={VideoCall}
                        />
                        <Route
                            path="/dashboard/write-prescription"
                            component={WritePrescription}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </AppContextProvider>
        </Router>
    );
}

export default App;
