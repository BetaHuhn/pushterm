<div align="center">
  
# 📱👨‍💻 Pushterm

[![Node CI](https://github.com/BetaHuhn/pushterm/workflows/Node%20CI/badge.svg)](https://github.com/BetaHuhn/pushterm/actions?query=workflow%3A%22Node+CI%22) [![Release CI](https://github.com/BetaHuhn/pushterm/workflows/Release%20CI/badge.svg)](https://github.com/BetaHuhn/pushterm/actions?query=workflow%3A%22Release+CI%22) [![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/BetaHuhn/pushterm/blob/master/LICENSE) ![David](https://img.shields.io/david/betahuhn/pushterm)

Send push notifications via IFTTT from the terminal

</div>

## 👋 Introduction

Pushterm allows you to send push notifications to your smartphone from your terminal with ease. Send yourself a note, a link or anything else to quickly access on your phone. Since it is running in your terminal, you can even pipe output of another command to it or use it with something like cron to send notifications at specific intervals or events. It uses IFTTT webhooks to send and show the notifications and requires minimal setup.

## 🚀 Get started

Install Pushterm via NPM:

```sh
npm install -g pushterm
```

Setup Pushterm interactivly:

```
pushterm setup
```

You will be asked to input your IFTTT key and event name. More info [below](#ifttt-setup-instructions)

After that Pushterm is ready to be used 🎉

## 📚 Usage

After Pushterm is setup, simply run `pushterm` or `pushterm send` followed by the text you want to send:

```sh
pushterm "Hello from your terminal!"
```

That's all that is needed to send a push notification 🔥

You can optionally also specify a notification title with `-t <text>`/`--title <text>` or a link with `-l <url>`/`--link <url>` which will open when you click the notification. The message itself can also be specified with `-m <text>`/`--message <text>`.

Use `-i` or `--interactive` to enter the above options manually.

The IFTTT key and the event name can also be specified for each run with the environment variables `IFTTT_KEY` and `EVENT_NAME`.

## 📄 Examples

Here are a few examples on how to use Pushterm:

### Basic notification

```sh
pushterm "Hello World"
```

### Rich notification

```sh
pushterm -t "Example Notification" -m "This is an example." -l "https://github.com/BetaHuhn/pushterm"
```

### Interactive

```sh
pushterm -i
```

You will be asked to enter all values.

### Piping output to it

```sh
echo "Hello World" | pushterm send
```

## 🔨 IFTTT setup instructions

Pushterm uses IFTTT webhooks to send a push notification to your smartphone with the IFTTT app. To get started, download the app to your phone and login/register a IFTTT account (it's free).

Once the app is setup, follow the steps below:

1) Create a new applet by clicking "Create" in the apps home screen.

2) Add a new trigger by clicking "If this" and search for "Webhooks".

3) Select "Receive a web request" and enter `pushterm` as the event name (if you enter a custom name, remember to specify it during the CLI setup).

4) Next, add a action that should run after the trigger by clicking "Than that". Search for "Notifications" and select "Send a rich notification from the IFTTT app".

5) You will be presented with a form with 4 inputs which you can fill with different "ingredients". Remove any existing text and select the following ingredients instead:

| Input Name | Ingredient |
|------------|------------|
| Title      | Value 2    |
| Message    | Value 1    |
| Link Url   | Value 3    |
| Image Url  |            |

6) After you have entered the correct values, click "Create action" and then "Continue"

7) Choose a title for the applet and then click "Finish" to create the applet

8) Click the webhook logo or search for "webhooks" in the explore tab

9) Click the documentation button and note down/copy the key which is displayed at the top

10) Run `pushterm setup` and enter the key when prompted for it

That's it, you are ready to send push notifications from your terminal 🎉

## 🔮 Command Reference

Run `pushterm help` to display the help page below:

```
Usage: pushterm [options] [command]

Send push notifications via IFTTT from the terminal

Options:
  -v, --version          output the version number
  -d, --debug            enable debug mode (default: false)
  -i, --interactive      use interactive mode (default: false)
  -m, --message <value>  notification message
  -t, --title <value>    notification title (default: "Pushterm")
  -l, --link <value>     link to open when clicking notification
  -h, --help             display help for command

Commands:
  send [options]         Send a push notification
  setup                  Setup Pushterm
  config                 Output current config
  help                   Display this help text
```


## 💻 Development

- run `yarn lint` or `npm run lint` to run eslint.
- run `npm link` to setup the program for development.
- run `yarn build` or `npm run build` to produce a compiled version in the `dist` folder.

## ❔ About

This project was developed by me ([@betahuhn](https://github.com/BetaHuhn)) in my free time. If you want to support me:

[![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=394RTSBEEEFEE)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F81S2RK)

## 📄 License

Copyright 2021 Maximilian Schiller

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
