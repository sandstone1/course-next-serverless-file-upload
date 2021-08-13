

// import in the Link component
import Link from 'next/link';
// import in Font Awesome
import { SiNextDotJs } from 'react-icons/si';
// import in our styleshee
import styles from './Header.module.scss';


const Header = () => {

    return (

        <header className={ styles.headerContainer }>

            <h4>

                <Link href="/">
                    <a>
                        <SiNextDotJs style={ { verticalAlign: '-5px', fontSize: '3.6rem' } } />
                        &nbsp;&nbsp;Next Serverless File Upload
                    </a>
                </Link>

            </h4>

        </header>

    );

}

export default Header;

