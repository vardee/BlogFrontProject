interface AddressObject {
    text: string;
}

export async function createStringFromAddressObjects(addressObjects: AddressObject[]) {
    const texts: string[] = addressObjects.map(obj => obj.text);
    return texts.join(', ');
}