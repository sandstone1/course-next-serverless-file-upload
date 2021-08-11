

// when we disploy we will create an environment variable called " NEXT_PUBLIC_API_URL "
// and the reason we add NEXT_PUBLIC is because we want this environment variable to
// be visible within the client / browser

// " By default, Next.js is not exposing process.env.X variables, due to security
// concerns as it pertains to the browser.

// In order to expose environment variables to the browser you must have a prefix of
// NEXT_PUBLIC_ in the name.  

// In your case, rename API_URL to NEXT_PUBLIC_API_URL, and use it. "

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3013';

