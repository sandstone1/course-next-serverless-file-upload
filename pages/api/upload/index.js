

import nc from 'next-connect';
// import in express fileupload
import fileUpload from 'express-fileupload';
// import in the path module and this is a node.js module to work with file paths
import path from 'path';
// __dirname doesn't work in next.js so use the code below and then __dirname results in
// " /Applications/MAMP/htdocs/stoneburyhomes/misc/brad_traversy/next_file_upload/frontend "
// which is what we want
const __dirname = path.resolve( process.cwd(), '' );

/*
Every API route can export a config object to change default configs.

For example, we can write:

export default ( req, res ) => {
  res.end( `Post: ${ req.body }` )
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
to create an API route with a size limit imposed on the request body.

Also, we can disable body parsing with:

export default ( req, res ) => {
  res.end( `Post: ${ req.body }` )
}
export const config = {
  api: {
    bodyParser: false,
  },
}
We set bodyParser to false to disable the body parser.
*/

export const config = {
    api : {
      bodyParser : false
    }
};



// this is a serverless function
const handler = nc()
    // apply middleware
    .use( fileUpload() )
    // make a POST request
    .post( ( req, res ) => {

        if ( req.files === null ) {

            // remember 400 is a bad request and we will send along some data using the json
            // data transfer format
            return res.status( 400 ).json( { message : 'No file was uploaded.  Please try again.' } )

        } else {

            // set a file variable and we will define " req.files.file " in react
            const file = req.files.file;

            // create a path of where to save the file and then we will have a callback function
            // in case there is an error

            // in order for this path to work we have to create an uploads folder

            // 1 -
            // for production, replace
            // " file.mv( `${ __dirname }/public/images/${ file.name }`, ( error ) => { " with
            // " file.mv( `https://api.cloudinary.com/v1_1/sandstone1/image/upload/${ file.name }`, ( error ) => { "

            // file.mv( `${ __dirname }/public/images/${ file.name }`, ( error ) => {
            file.mv( `https://api.cloudinary.com/v1_1/sandstone1/image/upload/${ file.name }`, ( error ) => {

            // End of 1 -


                // if the path does not exist
                if ( error ) {

                    // 500 is a server error and we will send the error to the frontend
                    return res.status( 500 ).send( error );

                } else {

                    // if there is no error then send back a status code of 200 and " The HTTP
                    // 200 OK success status response code indicates that the request has
                    // succeeded. "

                    // remember for next.js we have to start the filePath after the " public "
                    // folder so in this case we start the filePath at " '/images' "


                    // 1 - continued
                    // in production, replace " filePath : `/images/${ file.name }` " with
                    // " filePath : `https://api.cloudinary.com/v1_1/sandstone1/image/upload/${ file.name }` "


                    // End of 1 -

                    res
                        .status( 200 )
                        .json( {
                            fileName : file.name,
                            // filePath : `/images/${ file.name }`
                            filePath : `https://api.cloudinary.com/v1_1/sandstone1/image/upload/${ file.name }`
                        } );

                }

            } )

        }

    } );

export default handler;
