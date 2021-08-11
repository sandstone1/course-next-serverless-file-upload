

// import in the Layout component
import Layout from '../components/Layout/Layout';
// import in our global stylesheet
import '../styles/_globals.scss';

// create the App component and pass in the page component or " Component " and the
// page props or " pageProps "
const App = ( { Component, pageProps } ) => {

	// and now let's wrap our Layout component around our page component
    return ( 
		
		<Layout>
		
			<Component { ...pageProps } />

		</Layout>

	);

}


export default App;
