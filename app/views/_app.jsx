import "bootstrap/dist/css/bootstrap.min.css";

const App = (props) => {
  const { children, ...rest } = props;

  const PageComponent = children;

  return <PageComponent {...rest} />;
};

export default App;
