export async function createStringFromAddressObjects(addressObjects) {
    const texts = addressObjects.map(obj => obj.text);
    return texts.join(', ');
}
