import React from 'react';
import FullCalendar from '@fullcalendar/react'
import './App.css';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import googleCalendarPlugin from '@fullcalendar/google-calendar'

const apiKey = "AIzaSyBIwJdxiiUocK4yJLF6qLWxkc44-_7tf_0";
const gCalId = "cns2ghia12k0nhtqgr6sn50aic@group.calendar.google.com";

export default class App extends React.Component {
  calendarRef = React.createRef();
  handleResize = (e) => {
    this.setState({
      windowWidth: window.innerWidth
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }

  render() {
    const { windowWidth } = this.state;

    return (
      <div>
        {windowWidth}
        <FullCalendar
          ref={this.calendarRef}
          plugins={[ dayGridPlugin, interactionPlugin, googleCalendarPlugin ]}
          googleCalendarApiKey={apiKey}
          events={{googleCalendarId: gCalId}}
          height="auto"
          defaultView='dayGridMonth'
          windowResize={this.handleCalendarResize}
        />
      </div>
    )
  }

  // handleCalendarResize() {
  //   const { windowWidth } = this.state;
  //   if (windowWidth >= 768 ) {
  //       this.calendarRef.changeView('dayGridMonth');
  //   } else {
  //       this.calendarRef.changeView('dayGridWeek');
  //   }
  // }
}
