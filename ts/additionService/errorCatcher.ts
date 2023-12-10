interface CustomError extends Error {
    response?: {
        status?: number;
    };
}

export function handleErrors(error: CustomError): string {
    if (error instanceof TypeError) {
        return 'Ошибка: Неверный тип данных';
    } else if (error.response && error.response.status) {
        const statusCode = error.response.status;
        switch (statusCode) {
            case 400:
                return 'Ошибка: Неверный запрос';
            case 401:
                return 'Ошибка: Неавторизованный запрос';
            case 403:
                return 'Ошибка: Доступ запрещен';
            case 404:
                return 'Ошибка: Ресурс не найден';
            case 500:
                return 'Ошибка сервера: Внутренняя ошибка сервера';
            default:
                return `Ошибка сервера: Код состояния ${statusCode}`;
        }
    } else {
        return 'Произошла неизвестная ошибка';
    }
}
