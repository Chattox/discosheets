# Discosheets

_Spreadsheet like nobody's watching_ 💃

### Installation

#### Clone the repo

- `git clone https://github.com/Chattox/discosheets.git`

#### Install dependencies

- `npm i`

#### Setup environment variables

- Create a file in the root directory called `.env`
- Copy the contents of `.env.example`
- Fill out the fields
  - Your discord bot token and application ID can be found in the [Discord developer portal](https://discord.com/developers)
  - The Guild ID is the ID of the server you want the bot to run on. You can get this by right clicking on the server icon in Discord with developer mode enabled, and clicking `Copy Server ID` at the bottom
  - Google service account email and private key are obtained from the Google developers console. [Here](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication) is a pretty handy guide for setting that up and getting those credentials, specifically [Setting up your Application](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication?id=setting-up-your-quotapplicationquot) and [Service Account](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication?id=service-account). Once you've done those steps you can skip the rest of the guide and just paste the relevant credentials into the matching variables in your `.env` file
  - The Google spreadsheet ID is the ID of the google spreadsheet you want the bot to work with and edit. This can be obtained from the URL of the spreadsheet when you're in it. For example: `https://docs.google.com/spreadsheets/d/{THIS-BIT-IS-THE-SPREADSHEET-ID}/edit?gid=0#gid=0`

### Building and running locally

- `npm run build`
- `npm run start`

### Development

- `npm run dev`

### Adding new commands

When writing new commands, they should be added in the `src/commands` folder.  
Once a new command is written and you're ready to register it to the bot so that it will show up as a slash command in Discord itself, run `npm run deploy-commands`.
&nbsp;  
&nbsp;  
_(**Note:** Discord limits new command registrations to 200 per day per server, which this bot is unlikely to hit but it's something to keep in mind and is why the deploy commands functionality is kept as an entirely seperate script rather than being part of the bot that runs every time on start up. Also, currently `deploy-commands` re-registers all commands in `src/commands` whether they're new or not. This is something I'm looking into to hopefully make more efficient down the line so it only registers new/changed commands)_
