//import statement that imports react components to be used
import React from 'react';
//imports the Header and Footer component to be used in this component
import Header from './Header';
import Footer from './Footer';

//functional component Layout
const Layout = (props) => {
    /** This return statement indicates that which will be displayed on the screen.
     * It contains the Header component used to display the navbar on every page
     * The <main></main> tag houses the content gotten from the props argument.
     * props.children is used to display the content of whichever component that 
     * currently uses the Layout component. This means that for all the components 
     * such as the Home, Login and the rest, they'll wrap their content around the 
     * <Layout></Layout> component so that is can be displayed on the screen.
     * The Footer tag also displays what shows beneath every page.
     */
    const {user} = props;
    return(
        <>
        <Header user={user}/>
            <main className="mx-auto">
                {props.children}
            </main>
        <Footer/>
        </>
    );//end of return statement
}//end of functional component
export default Layout;//export the Layout in order to be able to import it from other components