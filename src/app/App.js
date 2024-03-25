// WEB VITALS
import reportWebVitals from "./reportWebVitals";

// React-Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// INTERNATIONALIZATION
import i18n from "./i18n";

// CSS
import "./App.css";

// THEME
import veiaTheme from "./veiaTheme";
import { ThemeProvider } from "@emotion/react";

// STORE
import store from "./Store";
import { Provider } from "react-redux";

// HOOKS
import { useState } from "react";
import { useTranslation } from "react-i18next";

// ROUTER
import DataRouter from "./DataRouter";

// COMPONENTS
import ErrorPopup from "../components/shared/DialogBoxes/ErrorPopup.component";
const queryClient = new QueryClient();

function App() {
  const translator = useTranslation();
  const translate = translator.t;

  const [error, setError] = useState(false);

  const changeLanguage = () => {
    let lang =
      sessionStorage.getItem("lang") ||
      i18n.language ||
      window.localStorage.i18nextLng ||
      navigator.language ||
      navigator.userLanguage;

    if (lang.startsWith("en")) {
      lang = "es";
    } else if (lang.startsWith("es")) {
      lang = "en";
    }

    i18n.changeLanguage(lang);
    sessionStorage.setItem("lang", lang);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={veiaTheme}>
          <ErrorPopup
            translate={translate}
            isOpen={!!error}
            error={error}
            handleClose={() => setError(false)}
          />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <DataRouter
            translator={translate}
            changeLanguage={changeLanguage}
            setErrorPopup={setError}
          />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default App;
