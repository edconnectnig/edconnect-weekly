import 'bootstrap/dist/css/bootstrap.min.css'

// If you have a custom css file in addition to the

// bootstrap css, copy the css file from your web folder to

// the views and import below.

// import './my-custom-style.css'



const App = (props) => {

   const { children, ...rest } = props;

   const PageComponent = children;

   return <PageComponent {...rest} />;

};


export default App;