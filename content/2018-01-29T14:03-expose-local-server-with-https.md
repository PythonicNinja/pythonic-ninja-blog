Title: How can I easily expose my local-server via https? 
Date: 2018-01-29 14:03
Category: webdev
Tags: devops, linux, webdev 

# Problem 😱

You would like to expose securly 🔓 your local server on the web?

Default route for this would be to:
- configure https
- configure your router
- etc.

---

# Solution 🤓

## ngrok

```
Secure tunnels to localhost
```

Install - [link](https://ngrok.com/download)
or on osx:
`brew cask install ngrok`


## Usage:
`ngrok http 8000`

```bash
ngrok by @inconshreveable                                                                                                                                    (Ctrl+C to quit)

Session Status                online
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://11e22256.ngrok.io -> localhost:8000
Forwarding                    https://11e22256.ngrok.io -> localhost:8000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

You can now enter your https or http external url and hit your own server. 🎉


## Protips:

### ngrok comes with dashboard
```
open http://localhost:4040
```
![dashboard](https://i.imgur.com/FGUnPwK.png)


### reply requests
![reply](https://i.imgur.com/6WD5Ucf.png)

### enable basic auth
`ngrok http 8000 -auth "user:password"`
> you will need to have account for this feature visit https://dashboard.ngrok.com/auth
![auth](https://i.imgur.com/ozTJnIe.png)

### file based config
`nano ~/.ngrok2/ngrok.yml`
```
tunnels:
  service:
    proto: http
    addr: 8000
```
`ngrok start service`
it will start service.
![magic](https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif)

### interested? links:
[docs](https://ngrok.com/docs)
