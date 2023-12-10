export async function formatDateTime(dateTimeString: string) {
    if (!dateTimeString) {
        return 'Некорректная дата';
    }

    const formattedDate = new Date(dateTimeString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    };

    return formattedDate.toLocaleString(undefined, options);
}

export async function formatDateTimeAuthors(dateTimeString: string) {
    if (!dateTimeString) {
        return 'Некорректная дата';
    }

    const formattedDate = new Date(dateTimeString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };

    return formattedDate.toLocaleString(undefined, options);
}

