import React from 'react';
import FullCalendar from '@fullcalendar/react'
import tippy from 'tippy.js';
import './App.css';
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import 'tippy.js/themes/light-border.css';

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

  tooltipData(info) {
    return (
      `
        <p><strong>${info.event.title}</strong></p>
        <p>
        ${ info.event.extendedProps.description || 'no description' }
        </p>
        <a href='${ info.event.extendedProps.location}'>Location</a>
      `
    )
  }

  render() {
    const { windowWidth } = this.state;
    const initView = (windowWidth >= 768) ? 'dayGridMonth' : 'listWeek';

    return (
      <div>
        <FullCalendar
          ref={this.calendarRef}
          plugins={[ dayGridPlugin, interactionPlugin, googleCalendarPlugin, listPlugin ]}
          googleCalendarApiKey={apiKey}
          events={{googleCalendarId: gCalId}}
          height="auto"
          initialView={initView}
          eventDidMount={(info) => {
            tippy(info.el, {
              content: this.tooltipData(info),
              allowHTML: true,
              theme: 'light-border'
            })
          }}
          windowResize={() => {
            if (windowWidth >= 768) {
              this.calendarRef.current.getApi().changeView('dayGridMonth');
            } else {
              this.calendarRef.current.getApi().changeView('listWeek');
            }
          }}
        />
      </div>
    )
  }
}
