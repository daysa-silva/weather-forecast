//const request  = require("request")

console.log('Esta tudo funcionando aqui')

const $button = document.querySelector('button')

$button.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        // { 
        //     latitude: position.coords.latitude, 
        //     longitude: position.coords.longitude
        // }
    
        document.cookie = 'placeName=' + encodeURI('your current location')
        document.cookie = 'latitude=' + position.coords.latitude
        document.cookie = 'longitude=' + position.coords.longitude
        location.href = location.origin + '/result'

        $LocationButton.removeAttribute('disabled')
        
    })
})