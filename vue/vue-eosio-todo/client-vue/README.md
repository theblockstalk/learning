# vue-eosio-todo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

Download Scatter
https://get-scatter.com/

Create a new account with a password

Go to networks >> Add custom network
name: EOS Studio
host: eos-studio.api.dfuse.dev
protocol: https
port: 443
chain id: bc31c358a5aaafb5f7ad73a2ef85625f67fe9dc027f8c441fc272027d53f00f6

Go to wallet >> import key
text import: 5K7Bh7GXQceVqCZMTGftDvoPsLC2Vwx7kgZWV7jrMRDr9sMMJCw

A small arrow to the right of the newly imported keys gives an action dropdown
Hold Ctrl and press this button >> Link account (you see this only if holding Ctrl)
Select the "EOS Studio"

Now open `http://localhost:8080/`

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
