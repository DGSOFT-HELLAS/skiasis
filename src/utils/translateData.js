
import iconv from "iconv-lite"
export default async function translateData(response) {
    try {
        const buffer = await response.arrayBuffer();
        const data1251 = Buffer.from(buffer);
        const dataUtf8 = iconv.decode(data1251, 'win1253');
        const jsonData = JSON.parse(dataUtf8);
        return jsonData.data;
    } catch (error) {
        console.error("Error while translating data:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}