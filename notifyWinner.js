

/**
 * Here is your new Stryke script!
 *
 * Don't forget to check out our docs for details and always end your script with stryke.resolve()
 */
console.log('Hello stryke!');

stryke.resolve('Notified!');

const request = require('request');
const util = require('util');

const raffle = stryke.data.record;

console.log('Hello stryke!');

/*curl -X POST -H 'Authorization: Bearer xoxb-1234-56789abcdefghijklmnop' \
-H 'Content-type: application/json' \
--data '{"channel":"C061EG9SL","text":"I hope the tour went well, Mr. Wonka.","attachments": [{"text":"Who wins the lifetime supply of chocolate?","fallback":"You could be telling the computer exactly what it can do with a lifetime supply of chocolate.","color":"#3AA3E3","attachment_type":"default","callback_id":"select_simple_1234","actions":[{"name":"winners_list","text":"Who should win?","type":"select","data_source":"users"}]}]}' \
*/


const SLACK_URL = 'https://slack.com/api/chat.postMessage';

async function notifyOnSlack() {
    try {
        // https://jsonplaceholder.typicode.com/posts/1
        const options = new CoreOptions(Headers);

        const response = await request.post(SLACK_URL, );

        stryke.resolve('Notified!');
    } catch (error) {
        console.error(error.message);
        stryke.error('The notification could not be sent.');
    }
}


