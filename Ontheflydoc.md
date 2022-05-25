# Doc

## Framworks/Tooling

### Vue

Modern but established, best for new projects

### Tailwind CSS

Not opinionated. No specific style enforced

### Typescript

Typescript to drastically decrease probability of type based runtime errors

### Commits

using conventional commits 1.0.0 for documentation

## Setup

Change the api server in vue config to the real url
npm install
npm run dev

## Typechecking

To prevent Runtime problems at unexpected places and remove bloat from the main code type guards are implemented for all API responses that check if the response has the correct structure.

## UX Design


## Security

The token provided by the server is stored in a cookie with the following atributes: 

- SameSite: Strict
- http-only
- secure

1. This prevents CSRF attacks without the need for a CSRF token.
2. Prevents scripts accessing the access token
3. Disallows http connections without encryption to prevent the token from beeing leaked

The tardis api has to be adjusted accordingly

The secret jwt app key is currently stored in a config file along with *hashed+salted* user credentials. This will be changed to the following:

- User credentials will be stored in the database
- Secret key will be generated at runtime

## App architecture

There will be a nginx server that will serve as a proxy to enable api access without exposing the api directly. 
This allows to avoid setting CORS headers and setting the **SameSite Cookie** to *strict* to prevent CSRF attacks.
In case there will be multiple apis, the apis will be called through `/api/API_NAME/PATH`.