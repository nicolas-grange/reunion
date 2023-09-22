# Reunion
See https://nicolas-grange.github.io/reunion/
## Run locally
- Add `.env` file with the following content:
```
REACT_APP_MAPBOX_ACCESS_TOKEN={TOKEN_VALUE}
PUBLIC_URL=/
```
- `npm install`
- `npm start`
## Deploy on GitHub pages
- Remove `PUBLIC_URL=/` from the `.env` file
- `npm run deploy -- -m "custom message"`
