
/**
 * Here is your new Stryke script!
 *
 * Don't forget to check out our docs for details and always end your script with stryke.resolve()
 */
const util = require('util');
const raffle = stryke.data.record;

enterRaffle();

async function enterRaffle() {
    const participant = await getParticipantsForCurrentRaffleAndUser();
    if (participant.Participant !== undefined && participant.Participant.length > 0) {
        stryke.error('You are already participating!');
    }
    
    let newParticipant = {};
    newParticipant.raffle = raffle.id;
    newParticipant.user = stryke.user.id;
    newParticipant.name = stryke.user.username;
    
    // save the new participant
    stryke.create('participant', newParticipant, (err, recordsSaved) => {
        if (err) {
            stryke.error(err.message);
        }
        console.log('saved: ' + recordsSaved);
        stryke.resolve('Your are now participating on this raffle. Good luck!');
    });
}

/**
 * Get participants
 */
async function getParticipantsForCurrentRaffleAndUser() {
    return new Promise((resolve) => {
        const participantsQuery = `{
            Participant(filter: { raffle: {eq: "${raffle.id}"}, user: {eq: "${stryke.user.id}"}}) {
                name
                user {
                    id
                }
                id
            }
        }`;
                
        stryke.query(participantsQuery, true, (err, result) => {                
            const queryResult = processQueryResult(err, result, 'participants');            
            resolve(queryResult);
        });
    });
}

function processQueryResult(err, result, queryName) {
    if (err) {
        stryke.error(`query request (${queryName}) failed: ${util.inspect(err)}`); 
    }

    if (result.errors) {
        stryke.error(`query (${queryName}) failed: ${util.inspect(result.errors)}`);         
    }

    if (!result.data) {
        stryke.error(`query result missing for ${queryName}`);         
    }

    return result.data;
}
