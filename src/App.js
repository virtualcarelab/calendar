import React from 'react';
import FullCalendar from '@fullcalendar/react'
import './App.css';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import googleCalendarPlugin from '@fullcalendar/google-calendar'

const apiKey = "AIzaSyBIwJdxiiUocK4yJLF6qLWxkc44-_7tf_0";
const gCalId = "cns2ghia12k0nhtqgr6sn50aic@group.calendar.google.com";

export default class App extends React.Component {

  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin, googleCalendarPlugin ]}
        googleCalendarApiKey={apiKey}
        events={{googleCalendarId: gCalId}}
        height="auto"
      />
    )
  }
}
