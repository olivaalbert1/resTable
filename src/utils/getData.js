export const spreadSheetData = async () => {
    const res = await fetch('https://script.google.com/macros/s/AKfycby1FuI2_cCSHOLShbhE0_9-PDqxJoT8IGE2nPn1VCEeVacNUfsKeHwRV7SH0ag9Rd3Tng/exec', {
    // const res = await fetch(import.meta.env.VITE_EXPO_PUBLIC_SHEETSURL, {
        method: "GET"
    });
    let response = await res.text()
    response = response.slice(10, response.length - 1);
    response = JSON.parse(response);
    console.log(response)
    return response
}

spreadSheetData()