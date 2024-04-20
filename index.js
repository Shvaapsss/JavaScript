import { getRandomActivity } from './activity.js';
/**
 * Updates the activity on the webpage.
 * @param {string} activity - The activity to display on the webpage.
 */
function updateActivity(activity) {
    document.getElementById('activity').textContent = activity;
}

/**
 * Fetches a random activity from the server and updates it on the webpage.
 */
async function fetchAndDisplayActivity() {
    try {
        // Fetch a random activity
        const activity = await getRandomActivity();
        // Update the activity on the webpage
        updateActivity(activity);
    } catch (error) {
        // Handle errors by displaying an error message on the webpage
        updateActivity("К сожалению, произошла ошибка");
    }
}

// Initial call to fetch and display activity when the page loads
fetchAndDisplayActivity();

// Update activity every minute
setInterval(fetchAndDisplayActivity, 60000);
