

// import in React, Fragment and useState
import React, { Fragment, useState } from 'react';
// import in axios
import axios from 'axios';
// import in the variable " API_URL " and add this variable to the fetch call below
import { API_URL } from '../../config/index';
// import in the ErrorMessage component
import ErrorMessage from '../ErrorMessage/ErrorMessage';
// import in the SuccessMessage component
import SuccessMessage from '../SuccessMessage/SuccessMessage';
// import in the ProgressBar component
import ProgressBar from '../ProgressBar/ProgressBar';
// import in our stylesheet
import styles from './FileUpload.module.scss';


const FileUpload = () => {

    // ==============================
    // component state
    // ==============================

    const [ file, setFile ]                         = useState( '' );
    const [ filename, setFilename ]                 = useState( '' );
    const [ uploadedFile, setUploadedFile ]         = useState( null );
    const [ errorMessage, setErrorMessage ]         = useState( '' );
    const [ successMessage, setSuccessMessage ]     = useState( '' );
    const [ uploadPercentage, setUploadPercentage ] = useState( 0 );
    const [ showProgressBar, setShowProgressBar ]   = useState( false );

    // ==============================
    // useDispatch(); & useSelector();
    // ==============================

    // ==============================
    // useEffect();
    // ==============================

    // ==============================
    // initialize router
    // ==============================

    // ==============================
    // useEffect hook
    // ==============================

    // ==============================
    // handleFileChange function
    // ==============================

    // this function will fire once we choose a file
    const handleFileChange = async ( e ) => {

        // remember for the file input and label elements:
        // (1) we have to use onChange and not onClick
        // (2) we have to add " htmlFor="file-input-id " to the label below in order to tie the
        // label to the file input and now if we click on the label button it has the same effect
        // as clicking on the file input button and remember that the file input element had an
        // id of " file-input-id " or " id="file-input-id" "
        // (3) we have to hide the ugly default file input element and this is done by using css
        // ( see: http://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/ )
        // (4) we need to add an input text box in order to show an initial placeholder value and
        // the selected file name after the user selects the file
        // (5) we have to have the key value pair of " onChange={ handleFileChange } " on both
        // the file input and the label

        // we want to put the file details into our file state
        setFile( e.target.files[0] );

        // then set the file name and display this name in the input text box below
        setFilename( e.target.files[0].name );

        // when a user presses the Browse button, show the progress bar
        setShowProgressBar( true );

    } // end of handleFileChange


    // ==============================
    // handleSubmit function
    // ==============================

    const handleSubmit = async ( e ) => {

        // now we need to send the file object to the server but first let's prevent the
        // default browser behavior
        e.preventDefault();

        // ==============================
        // create the formData object
        // ==============================

        // to upload an image we first need to create a formData object

        // next we want to initialize a FormData object and remember the formData object
        // was created as a way to bundle information and send it to the server and in that
        // way the formData object acts like a form
        const formData = new FormData();

        // then we will append some information to the formData object and the key will be
        // " file " and the value will be the file that is in our state
        formData.append( 'file', file );

        // now we're ready to make our request so let's bring in axios

        // ==============================
        // make the request to the backend
        // ==============================

        // STEP 1
        // create our endpoint
        // and remember since we specified a proxy in the frontend/package.json file or
        // " "proxy": "http://localhost:5001", " we don't have to specify " localhost:5001 "
        // or put " http://localhost:5001/upload " as our endpoint

        // remember the endpoint points to the backend endpoint which is " /upload "
        const endpoint = `${ API_URL }/api/upload`;

        const config = {

            // first config object
            // create the headers
            headers : {
                'Content-Type' : 'multipart/form-data'
            },

            // second config object
            // create the onUploadProgress key value pair

            // from stackoverflow : " When you make a request with axios, you can pass in
            // request config. Part of that request config is a function that will measure
            // the upload progress. And this function will be called whenever the upload
            // progress changes. "
            onUploadProgress : ( progressEvent ) => {

                // destructure off loaded and total
                const { loaded, total } = progressEvent;

                // calculate the percent completed
                let percentCompleted = Math.round( ( loaded * 100 ) / total );

                // set the upload percentage
                setUploadPercentage( percentCompleted );

                // use the setTimeout function to set the upload percentage back to 0
                // after 10 seconds
                setTimeout( () => {

                    setUploadPercentage( 0 );

                }, 10000 );

                // and now we can use this piece of state or setUploadPercentage and pass it
                // into a progress bar component and the progress bar will reflect the
                // uploadPercentage value

            }

        }


        try {

            // STEP 3

            // below we are making a POST request to the above endpoint and axios returns the
            // response object and we can then destructure the data object off of the response
            // object and the data object in this case is the following object:
            // " { fileName : file.name, filePath : `/uploads/${ file.name } "

            // and the second argument will be the formData object

            // and the third argument in the request will be our config object and remember
            // we are making a POST request here
            const res = await axios.post(
                endpoint,
                formData,
                config
            );

            // STEP 4
            // if we get to this point in the code then it means our file was uploaded
            // successfully

            // let's destructure the fileName and filePath off of the data object
            const { fileName, filePath } = res.data;

            // then let's set a a new piece of component state above or
            // " const [ uploadedFile, setUploadedFile ] = useState( '' ); "
            setUploadedFile( { fileName, filePath } );

            // set the success message
            setSuccessMessage( 'Your file was uploaded successfully! Close this message to upload another file.' );

        } 
        // STEP 5
        // if there is a request error
        catch ( err ) {

            // if we get a 400 status response
            if ( err.response.status === 400 ) {

                setErrorMessage( err.response.data.message );

            } 

            // if we get a 500 status response
            else if ( err.response.status === 500 ) {

                setErrorMessage( 'There is a problem with the server. Please try again.' );

            } 

            // if we get some other kind of error
            else {

                // set the error message
                setErrorMessage( 'Something went wrong' );

                // erase the error message after 5 seconds
                setTimeout( () => {

                    setErrorMessage( null );

                }, 5000 );

            }

        } // end of try catch

    } // end of handleSubmit


    return (

        <Fragment>            
            
            <div className={ styles.fileUploadContainer }>

                { 
                    errorMessage &&
                        <ErrorMessage
                            setErrorMessage={ setErrorMessage }
                            setFilename={ setFilename }
                            setShowProgressBar={ setShowProgressBar }p
                        >
                            { errorMessage }
                        </ErrorMessage>
                }

                {   
                    successMessage &&
                        <SuccessMessage
                            setFilename={ setFilename }
                            setSuccessMessage={ setSuccessMessage }
                            setUploadedFile={ setUploadedFile }
                            setShowProgressBar={ setShowProgressBar }        
                        >
                            { successMessage }
                        </SuccessMessage> 
                }

                <h1 className={ styles.fileUploadContainerH1 }>Upload File</h1>

                { /* form */ }
                <form className={ styles.fileUploadContainerForm } noValidate="novalidate" onSubmit={ handleSubmit } >

                    { /* input field - file */ }
                    <div className={ styles.fileUploadContainerFormFileInputContainer }>
                        <input
                            // hide this input field ( see the scss file for details )
                            name="file"
                            type="file"
                            id="file-input-id"
                            onChange={ handleFileChange }
                        />
                        <input
                            // show this input field text box ( see the scss file for details )
                            name="file-text-box"
                            type="text"
                            disabled="disabled"
                            placeholder="Choose a file"
                            value={ filename }
                            onChange={ (e) => e.target.value }
                        />
                        <label
                            htmlFor="file-input-id"
                            onChange={ handleFileChange }
                        >
                            Browse
                        </label>
                    </div>

                    {
                        showProgressBar ? (
                            <ProgressBar
                                percentCompleted={ uploadPercentage }
                            /> 
                        ) : (
                            null 
                        )
                    }

                    { /* submit button */ }
                    <div className={ styles.fileUploadContainerFormButtonContainer }>
                        <button
                            type="submit"
                        >
                            Upload
                        </button>
                    </div>

                </form>

                { /* upload file section with file name and image */ }
                { 
                    uploadedFile ? (

                        <div className={ styles.fileUploadContainerFile }>
                            <h3>File name: { uploadedFile.fileName }</h3>
                            <img
                                src={ uploadedFile.filePath }
                                alt="Upload successful"
                            />
                        </div>
                            
                    ) : (

                        null

                    )

                }

            </div>        

        </Fragment>


    );

}


export default FileUpload;


