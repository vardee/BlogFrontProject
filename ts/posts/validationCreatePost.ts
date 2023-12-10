import { PostData } from "./writePost";


interface ValidationResult {
    isValid: boolean;
    errors: string[];
}


export function validatePostData(data: PostData): ValidationResult {
    const errors: string[] = [];
    if (!data.title || data.title.length < 5 || data.title.length > 1000) {
        errors.push('Заголовок должен содержать от 5 до 1000 символов');
    }
    if (!data.description || data.description.length < 5 || data.description.length > 5000) {
        errors.push('Описание должно содержать от 5 до 5000 символов');
    }
    if (!Number.isInteger(data.readingTime) || data.readingTime <= 0) {
        errors.push('Время чтения должно быть положительным целым числом');
    }

    if (!data.tags || !Array.isArray(data.tags) || data.tags.length < 1) {
        errors.push('Необходимо указать хотя бы один тег');
    } 
    return {
        isValid: errors.length === 0,
        errors: errors,
    };
}