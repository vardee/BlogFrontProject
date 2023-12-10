export async function formatDateTime(dateTimeString) {
    if (!dateTimeString) {
        return 'Некорректная дата';
    }
    const formattedDate = new Date(dateTimeString);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    };
    return formattedDate.toLocaleString(undefined, options);
}
export async function formatDateTimeAuthors(dateTimeString) {
    if (!dateTimeString) {
        return 'Некорректная дата';
    }
    const formattedDate = new Date(dateTimeString);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    return formattedDate.toLocaleString(undefined, options);
}
export function formatDateStringToISOString(dateString) {
    try {
        // Log the input string to check its value
        console.log("Input dateString:", dateString);
        // Split the string into day, month, and year
        const [day, month, year] = dateString.split('.');
        // Log the individual components
        console.log("Day:", day);
        console.log("Month:", month);
        console.log("Year:", year);
        // Create a new Date object
        const dateObject = new Date(`${year}-${month}-${day}T00:00:00`);
        // Log the generated Date object
        console.log("Generated Date:", dateObject);
        // Format the Date object to a string
        const formattedISOString = dateObject.toISOString().slice(0, 19).replace("T", " ");
        // Log the final formatted string
        console.log("Formatted String:", formattedISOString);
        return formattedISOString;
    }
    catch (error) {
        console.error("Error during formatting:", error.message);
        throw error;
    }
}
