

// import in the Link component
import Link from 'next/link';
// import in our stylesheet
import styles from './Footer.module.scss';


const Footer = () => {

    return (

        <footer className={ styles.footerContainer }>

            <h2>Copyright &copy; Next Serverless File Upload</h2>

            <div>

                <Link href="/about">

                    <a>About</a>

                </Link>

                <span>&nbsp;this Project</span>

            </div>

        </footer>

    );

}

export default Footer;

