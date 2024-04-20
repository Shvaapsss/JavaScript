/**
 * Fetches a random activity from the external API.
 * @returns {Promise<string>} A promise that resolves with a random activity.
 */
export async function getRandomActivity() {
    try {
        // Fetch data from the API
        const response = await fetch('https://www.boredapi.com/api/activity/');
        // Parse the JSON response
        const data = await response.json();
        // Return the random activity
        return data.activity;
    } catch (error) {
        // If an error occurs during fetching, throw an error
        throw new Error("Failed to fetch activity");
    }
}
