export default async function(file) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    return new Promise((resolve, reject) => {
        reader.onload = () => {
            const decoder = new TextDecoder('utf-8');
            const readed = decoder.decode(reader.result);
            resolve(readed);
        };

        reader.onerror = () => {
            reject(null);
        }
    });
}