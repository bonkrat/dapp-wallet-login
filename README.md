# dapp-wallet-login

Backend for allowing users to login using their Dapp wallet credentials.

## How it works

The user is prompted to login via their wallet provider (e.g. Metamask) by signing a code into a message with their public and private keys. The signature is verified when the user is logged in using the code and public key. A user account is created and a JWT is provided to the logged in user for that address.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
