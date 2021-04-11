import React from 'react';
import { View } from 'react-native';
import { Link } from 'react-router-dom'
import "../assets/LinkedInStyle.css";

export function LinkedInView() {
  return (
    <View>
        <div style={{
            textAlign: "center",
            backgroundColor: 'black'
        }}>
            <h1 id="header">Clairvoyance</h1>
            <hr/>
            <p><a href="https://www.linkedin.com/in/kylemccaf/" target="_blank">Kyle McCaffery</a></p>
            <p><a href="https://www.linkedin.com/in/theodore-weber/" target="_blank">Ted Weber</a></p>
            <p><a href="https://www.linkedin.com/in/davidkatsandres/" target="_blank">David Katsandres</a></p>
            <div id="link">
                <Link to="/app">Launch</Link>
            </div>
            <div id="link"
            style={{
                position: "fixed",
                left: "15px",
                bottom: "25px"
            }}>
                <a href="https://github.com/WWUHackathon2021/Clairvoyance" target="_blank">GitHub</a>
            </div>
        </div>
    </View>
  );
}
