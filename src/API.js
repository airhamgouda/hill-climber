import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Keys
const hikingKEY = '200300235-fa081a5bf740f70316b7b10bbbde8a04';
const googleKEY = 'AIzaSyCsDwQGH_Ghtjr33-PguKiqNWm-S1ZE70M';

// Error Handling
if (hikingKEY === '') {
    console.log('Missing credentials for Hiking Project');
}

// Adjustable variables
let lat = 0;
let lon = 0;
let radius = 10;
let maxResults = 100
let trailsList = []

// Snippets
class Trails extends Component {
    render() {
        return (
            < div className="Trails" >
                Test
            </div >
        )
    }
}


// Functions 
function fetchHikes() {

    fetch(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=${radius}&key=${hikingKEY}&maxResults=${maxResults}&sort=distance`)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            // If 0, call failed.
            if (myJson.success !== 1) {
                console.log('Connection to Hiking Project failed... Idk why yet.');
                return;
            } else {
                return myJson.trails
            }
        })
        .then(function (list) {
            trailsList = list;
            console.log(trailsList)
            for (let i = 0; i < array.length; i++) {
                const element = array[i];

            }
            ReactDOM.render(<Trails />, document.getElementById('trails'));
        });
}


// Export Function
// Order of Operations: 
//      1. Pass through addresss to Google's Geocode to get Lon & Lat
//      2. Adjust to .0000, and set variables in global scope
//      3. Call fetchHikes(), which passes through lon, lat, radius to search for, and how many results to call.
//      4. Convert to JSON
//      5. Post snippet of list of hikes
//      6. When new search called, clear list



export default function generateList(zip, radius) {

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1402+Tori+Court,+Loveland,+CO&key=${googleKEY}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            lat = myJson.results[0].geometry.location.lat.toFixed(4);
            lon = myJson.results[0].geometry.location.lng.toFixed(4);

        })
        .then(function () {
            fetchHikes();
        })



}

