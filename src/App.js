import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import MainPage from "./components/MainPage";
import { maliciousIpsReducer } from "./reducers/maliciousIps.reducer";
import { Provider } from "react-redux";

const store = createStore(maliciousIpsReducer, applyMiddleware(thunk));

export class App extends React.Component {

    render() {
        
        return (
            <Provider store={store}>
                <div className="container-fluid">
                    <header className="App-header">
                        <MainPage />
                    </header>
                </div>
            </Provider>
        );
    }
}

export default App;
