const { CardFactory } = require('botbuilder');
const { ActivityHandler } = require('botbuilder');
const { LuisRecognizer, QnAMaker } = require('botbuilder-ai');
const WelcomeCard = require('./resources/welcome.json');
class DispatchBot extends ActivityHandler {
    constructor() {
        super();

        const dispatchRecognizer = new LuisRecognizer({
            applicationId: process.env.LuisAppId,
            endpointKey: process.env.LuisAPIKey,
            endpoint: `https://westeurope.api.cognitive.microsoft.com/luis/v2.0/apps/6160e9b9-6923-4cfa-8827-36062911800d?verbose=true&timezoneOffset=0&subscription-key=9f7e615813a34be89578f6b4e9a07a6c&q=`
        }, {
            includeAllIntents: true,
            includeInstanceData: true
        }, true);



        this.dispatchRecognizer = dispatchRecognizer;
        

        this.onMessage(async (context, next) => {
           

            
            const recognizerResult = await dispatchRecognizer.recognize(context);

            
            const intent = LuisRecognizer.topIntent(recognizerResult);

            
            await this.dispatchToTopIntentAsync(context, intent, recognizerResult);

            await next();
        });

        this.onMembersAdded(async (context, next) => {
           
            const membersAdded = context.activity.membersAdded;

            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    
                    const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
                    await context.sendActivity({ attachments: [welcomeCard] });
                }
            }

            
            await next();
        });
    }

    async dispatchToTopIntentAsync(context, intent, recognizerResult) {
        switch (intent) {
        case 'Blue':
            await context.sendActivity(`Inside the ${ intent } bin.`);
            break;
        case 'black':
            await context.sendActivity(`Inside the ${ intent } bin.`);
            break;    
        case 'brown':
            await context.sendActivity(`Inside the ${ intent } bin.`);
            break;
        case 'gray':
            await context.sendActivity(`Inside the ${ intent } bin.`);
            break;
        case 'resedual':
            await context.sendActivity(`Inside the ${ intent } bin.`);
            break;
        case 'none':
            await context.sendActivity(`To Know more follw this pdf ==>  https://www.poing.de/fileadmin/eigene_dateien/05_Bauen_Umwelt/Abfall_Wertstoffe/Muellfibel_Oktober_2018.pdf `);
            break;
        default:
            
            await context.sendActivity(`To Know more follw this pdf ==>  https://www.poing.de/fileadmin/eigene_dateien/05_Bauen_Umwelt/Abfall_Wertstoffe/Muellfibel_Oktober_2018.pdf `);
            break;
        }
    }

  
}

module.exports.DispatchBot = DispatchBot;
