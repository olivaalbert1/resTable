export const spreadSheetData = async () => {
    const res = await fetch(import.meta.env.VITE_EXPO_PUBLIC_SHEETSURL, {
        method: "GET"
    });
    let response = await res.text()
    response = response.slice(10, response.length - 1);
    response = JSON.parse(response);
    // console.log(response)
    return response
}