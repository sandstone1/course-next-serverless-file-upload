

// import in the Fragment component from react
import { Fragment } from 'react';
// import in the image component
// remember the spinner.gif file came from Brad's React Front To Back course
import Image from 'next/image';
// import in our stylesheet
import styles from './Spinner.module.scss';


const Spinner = () => (

    <Fragment>

        <Image
            src={ '/images/spinner.gif' }
            width={ 200 }
            height={ 100 }
            className={ styles.spinnerContainer }
        />

    </Fragment>

);


export default Spinner;
