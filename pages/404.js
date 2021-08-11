

// and remember this is a specially named file much like the index.js file and therefore
// this file does not generate the following url: " http://localhost:3010/404 "

// instead we can create a 404 component so that if a user tries to go to a page that does not
// exist then next will serve up this file or page component instead

// import in the Link component
import Link from 'next/link';
// import in Font Awesome
import { FaExclamationTriangle } from 'react-icons/fa';
// import in the scss file
import styles from './404.module.scss';


const NotFoundPage = () => {

    return (

        <div className={ styles.notFoundContainer }>

            <h1>
                <FaExclamationTriangle />&nbsp;&nbsp;404
            </h1>
            <h4>Sorry, that page can not be found.</h4>
            <p>Go back to the <Link href="/"><a>Home page</a></Link></p>

        </div>

    );

}


export default NotFoundPage;

