

// import in the file upload component
import FileUpload from '../components/FileUpload/FileUpload';
// import in the scss file
import styles from './Index.module.scss';


export default function HomePage() {

    return (

        <div className={ styles.homePageContainer }>

            <FileUpload />

        </div>

    );

}
