import React, { Component } from 'react';
import logo from './logo.JPG';
import './ManualSearch.css';


// Adjustable variables
const hikingKEY = '200300235-fa081a5bf740f70316b7b10bbbde8a04';
let localLat = 0;
let localLon = 0;
let radius = 10;
let maxResults = 100;
let localTrailsList = [];




// Functions
function homeScreen() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }


    function showPosition(position) {
        localLat = position.coords.latitude.toFixed(4);;
        localLon = position.coords.longitude.toFixed(4);;
        console.log(localLat)
        console.log(localLon)
        fetch(`https://www.hikingproject.com/data/get-trails?lat=${localLat}&lon=${localLon}&maxDistance=${radius}&key=${hikingKEY}&maxResults=${maxResults}&sort=distance`)
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
                localTrailsList = list;
                console.log(localTrailsList)

            });

    }
}

homeScreen();
// Components

class Home extends Component {
    render() {
        return (
            <div className="ManualSearch">
                <header className="ManualSearch-header">
                    <img src={logo} className="ManualSearch-logo" alt="logo" />
                    <h1 className="ManualSearch-title">hillClimber</h1>
                </header>
                <h1>Trails Near You</h1>

                < div className="Trails" >
                    <p>1: {localTrailsList[0].name}</p>
                    <p>2: {localTrailsList[1].name}</p>
                    <p>3: {localTrailsList[2].name}</p>
                    <p>4: {localTrailsList[3].name}</p>
                    <p>5: {localTrailsList[4].name}</p>
                    <p>6: {localTrailsList[5].name}</p>
                    <p>7: {localTrailsList[6].name}</p>
                    <p>8: {localTrailsList[7].name}</p>
                    <p>9: {localTrailsList[8].name}</p>
                    <p>10: {localTrailsList[9].name}</p>
                </div >
            </div>
        );
    }
}

export default Home;
