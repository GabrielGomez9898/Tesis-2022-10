import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import mapDataReducer from './features/MapData'
import typeChartsDataReducer from './features/TypeChartsData';
import timeChartsDataReducer from "./features/TimeChartsData";
import functionaryListReducer from './features/FunctionaryList';
import copListReducer from "./features/CopList";
import functionaryFiltersDataReducer from "./features/FunctionaryFiltersData";
import copFiltersDataReducer from "./features/CopFiltersData";
import functionaryListAddedItemsReducer from "./features/FunctionaryListAddedItems";
import copListAddedItemsReducer from "./features/CopListAddedItems";

const store = configureStore({
  reducer: {
    mapData: mapDataReducer,
    typeChartsData: typeChartsDataReducer,
    timeChartsData: timeChartsDataReducer,
    functionaryList: functionaryListReducer,
    copList: copListReducer,
    functionaryFiltersData: functionaryFiltersDataReducer,
    copFiltersData: copFiltersDataReducer,
    functionaryListAddedItems: functionaryListAddedItemsReducer,
    copListAddedItems: copListAddedItemsReducer
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();