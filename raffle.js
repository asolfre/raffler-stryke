
/**
 * Here is your new Stryke script!
 *
 * Don't forget to check out our docs for details and always end your script with stryke.resolve()
 */
const util = require('util');
const raffle = stryke.data.record;

getParticipantsForCurrentRaffle().then((participants) => {
    if (participants.Participant === undefined || participants.length === 0) {
        stryke.error('There are no participants on this raffle!');
    }
    console.log(`participants count: ${participants.Participant.length}`);

    // Check if a winner already exists
    getExistingWinner().then((existingWinner) => {
        if (existingWinner.Winner !== undefined && existingWinner.Winner.length > 0) {

            stryke.error('There is a winner already!');
        }
    
        // Find a winner
        const newWinner = participants[Math.floor(Math.random() * participants.length)];
    
        const raffleWinner = {};
        raffleWinner.name = newWinner.name;
        raffleWinner.participant = newWinner.id;
    
        // save the new winner
        stryke.create('winner', raffleWinner, (err, recordsSaved) => {
            if (err) {
                stryke.error(err.message);
            }
            console.log('saved: ' + recordsSaved);
            stryke.resolve(`The winner is: ${raffleWinner.name}`);
        })  
    });

}).catch((err) => {
    stryke.error('Action failed while retrieving the participants: ' + err);
});

/**
 * Check if a winner already exists
 */
async function getExistingWinner() {
    return new Promise((resolve) => {
        const winnersQuery = `{
            Winner(filter: {raffle: {eq: "${raffle.id}"}}) {
                participant {
                    id
                }
                id
            }
        }`;
                
        stryke.query(winnersQuery, true, (err, result) => {                
            const queryResult = processQueryResult(err, result, 'winnersQuery');            
            resolve(queryResult);
        });
    });
}

/**
 * Get participants
 */
async function getParticipantsForCurrentRaffle() {
    return new Promise((resolve) => {
        const participantsQuery = `{
            Participant(filter: {raffle: {eq: "${raffle.id}"}}) {
                name
                user {
                    id
                    username
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