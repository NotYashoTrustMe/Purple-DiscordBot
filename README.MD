![Yasho](images/Purple-banner.png) 

# Purple - A Discord JS bot (Beta)

[![Yasho022 - Purple-DiscordBot](https://img.shields.io/static/v1?label=Yasho022&message=Purple-DiscordBot&color=%235e324&logo=github)](https://github.com/Yasho022/Purple-DiscordBot "Go to GitHub repo")
[![Invite - Purple#5344](https://img.shields.io/static/v1?label=Invite&message=Purple%235344&color=%234248f5&logo=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F12%2FDiscord-Logo.png)](https://discord.com/api/oauth2/authorize?client_id=908201780494606356&permissions=397808498902&scope=bot%20applications.commands)
[![Build Test - Passed](https://img.shields.io/badge/Build_Test-Passed-success)](https://github.com/Yasho022/Purple-DiscordBot/actions)
> An open-source discord bot with feaures such as memes, quotes, moderation and auto role assignment.

### Launguage: <br>
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">

## Features
- Calculate Mathematical Equation
- Get a random quote
- Get a meme from any subreddit
- And Many more...

## Installation and Setup
1. Install [Node.js](https://nodejs.org/en/) version`v16.13.0` or above.

1. Create a new app from [Discord Developer Portal](https://discord.com/developers/applications)
1. Get the `TOKEN` and store it somewhere safe. [_Keep it a secret_]
1. Open `.environ` file and rename it to `.env` and fill up the following (if you're running this from your PC): 
    - `TOKEN` - The Token you got from [Discord Developer Portal](https://discord.com/developers/)"
    - `GUILD_ID`= Your Server's ID
    - `GENERAL_CHANNEL`= The general channel of your server (To direct the new members to that channel)
    - `BOT_COMMANDS_CHANNEL`= The bot commands channel ID
    - `MEMBER_LOG_CHANNEL`= The member log channel ID (Keep the channel so only Bots allowed to message)
1. Install the required dependencies with:
    ```
    npm install
    ```
1. Start the bot with:
    ```
    npm start
    ```

If everything goes well, you should see `Purple is Online 🟢` in the console. 

## Run and Host
### PC
You can run your bot on you pc with the command `npm start`. However the bot will be online while you are running the application.
### Heroku (Recommended)
**_This is not a Paid Promotion_**<br>
It is advised to host this bot on heroku for a free or a paid plan according to your needs as the bot will be online even if your PC is not running.


<a href="https://heroku.com/deploy?template=https://github.com/Yasho022/Purple-DiscordBot"><img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku"></a>

[Setting the environment variables in Heroku](https://devcenter.heroku.com/articles/config-vars).


> By Yasho<br>
 Readme inspired from [Disc-11](https://github.com/zhycorp/disc-11/blob/main/README.md)
