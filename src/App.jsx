import GlobalStyle from 'GlobalStyle.jsx';
import Router from 'shared/Router';
import ToastProvider from 'shared/ToastProvider';

function App() {
  return (
    <>
      <Router />
      <GlobalStyle />
      <ToastProvider />
    </>
  );
}

export default App;
