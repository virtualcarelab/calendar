import React from 'react';
import FullCalendar from '@fullcalendar/react'
import './App.css';
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import Modal from './components/modal/modal';

const apiKey = "AIzaSyBIwJdxiiUocK4yJLF6qLWxkc44-_7tf_0";
const gCalId = "cns2ghia12k0nhtqgr6sn50aic@group.calendar.google.com";

export default class App extends React.Component {
  calendarRef = React.createRef();
  description = null;
  handleResize = (e) => {
    this.setState({
      windowWidth: window.innerWidth
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      description: null,
      chosenEvent: null,
      showModal: false
    };
  }

  showModal = () => {
    this.setState({ showModal: true });
    console.log(this.state.showModal);
  };

  hideModal = () => {
    this.setState({ showModal: false });
    console.log(this.state.showModal);
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }

  selectEvent(info) {
    this.setState({
      chosenEvent: info,
      description: info.event.extendedProps.description
    });
    this.showModal();
  }

  render() {
    const { windowWidth } = this.state;
    const initView = (windowWidth >= 768) ? 'dayGridMonth' : 'listWeek';

    return (
      <div className='calendarContainer'>
        <FullCalendar
          ref={this.calendarRef}
          plugins={[ dayGridPlugin, interactionPlugin, googleCalendarPlugin, listPlugin ]}
          googleCalendarApiKey={apiKey}
          events={{googleCalendarId: gCalId}}
          height="auto"
          initialView={initView}
          eventClick={(info) => {
            info.jsEvent.preventDefault()
            this.selectEvent(info)
          }}
          windowResize={() => {
            if (windowWidth >= 768) {
              this.calendarRef.current.getApi().changeView('dayGridMonth');
            } else {
              this.calendarRef.current.getApi().changeView('listWeek');
            }
          }}
        />
        <Modal
          show={this.state.showModal}
          handleClose={this.hideModal}
          eventInfo={this.state.chosenEvent}/>
      </div>
    )
  }
}
