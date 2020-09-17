import React from 'react';
import styles from './modal.module.css';

// date and time ...
const modal = (props) => {
  let showHideClassName = props.show ? styles.display : styles.hide;
  let location = props.eventInfo?.event?.extendedProps?.location;
  let description = props.eventInfo?.event?.extendedProps?.description || 'No Description Available';
  let locationDiv = null;

  if (location) {
    locationDiv = <div><a href={ location }>Location</a><br/></div>
  }
  return (
    <div className={styles.modal.concat(" ", showHideClassName)} >
      <section className={styles.modalMain}>
        <h1>{ props.eventInfo?.event?.title || 'No title'}</h1>
        <div className={styles.modalDescription}
        dangerouslySetInnerHTML=
        {{__html: description}}/>
        <br/>
        {locationDiv}
        <button onClick={props.handleClose}>close</button>
      </section>
    </div>
  )
};

modal.defaultProps = {
  eventInfo: null,
  show: false
};

export default modal;
