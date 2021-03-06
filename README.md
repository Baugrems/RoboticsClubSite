Robotics Club Site - Entry for Sporediggers Competition November 2021

**Overview of Goals**

Features
- Front page gives info about the club, how to join, our goals, etc.
- Projects and/or Team page(s) show what we are currently doing/recently did.
- A donation link that pops open a new tab/window to the foundation donation page for Robotics Club.
- A help page that tells users how to use the website
- Discord integration for ease of permissions
- Edit log that sends a message to an officer-only discord channel that shows who changed what on the website
- Robotics Club Schedule (When Space is being used, when do teams meet?)
- (Optional/Stretch Goal) Budget tools for Treasurers
- (Optional/Stretch Goal) Github integration


Permissions
- Officers in discord server automatically get admin on website to edit all pages
- Team Leaders in discord server automatically get edit access to teams/projects page
- Members of the discord get access to leave comments on projects, find our github org links, and more.
- Guests who don't login can see all pages but get no comment/edit buttons/accesss 


All goals have been met besides the Optional Goals.


In order to use the site with the default, test settings, you need to take a few steps. The bot token will be given on request for sake of judging or testing.

**Environmental Variables:**
IP=localhost (or wherever you host it)
PORT=53134
DBPASS='robotics'
OFFICER_ROLE_ID='904785555542376469'
TOKEN=<BOT TOKEN HERE>

Join the test discord at https://discord.gg/W2rqUtmzPu


**Technical Features**
- Node JS backend using EJS as a front end engine.
- MongoDB hosted online to store teams information.
- Proper NoSQL Schema and Model techniques demonstrated via team model
- Discord Oauth2 Integration. This controls permissions to edit/delete/add Teams to the database.
- Dynamic Teams using CRUD routes. Teams.js under routes demonstrates CRUD
- Discord Webhooks used to send website logs to the discord server.
- Bootstrap used to help the front end look better
- Discord Bot integrated into the build to help manage both Discord Servers and the Website

