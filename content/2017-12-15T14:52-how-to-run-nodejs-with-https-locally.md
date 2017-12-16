Title: How to run nodejs app with https locally?
Date: 2017-12-15 14:54
Category: nodejs
Tags: node, nodejs, https, devops 


How to generate an SSL certificate:

```bash
openssl genrsa -des3 -out server.key 1024
```

you need to enter a password here which you need to retype in the following steps

```bash
openssl req -new -key server.key -out server.csr
```

when asked "Common Name" type in: localhost

```bash
openssl x509 -req -days 1024 -in server.csr -signkey server.key -out server.crt
```


```javascript 1.8
const httpsOptions = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  passphrase: 'passpharase'
};

const httpsPort = 8086;

const server = https.createServer(httpsOptions, app).listen(httpsPort, () => {
  console.log('server running at ' + httpsPort);
});
```
