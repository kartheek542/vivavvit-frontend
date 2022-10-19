import "./index.css";

const EventCheckboxItem = (props) => {
  const { eventDetails, onChangeEvent } = props;
  const { eventName, id, selected } = eventDetails;

  const onCheckEvent = (event) => {
    onChangeEvent(id, event.target.checked);
  };
  return (
    <div className="event-checkbox-container">
      {selected ? (
        <input
          id={id}
          type="checkbox"
          name="selectedEvents"
          value={id}
          onChange={onCheckEvent}
          checked={true}
          className="event-checkbox"
        />
      ) : (
        <input
          id={id}
          type="checkbox"
          name="selectedEvents"
          value={id}
          onChange={onCheckEvent}
          checked={false}
          className="event-checkbox"
        />
      )}
      <label htmlFor={id}>{eventName}</label>
    </div>
  );
};

export default EventCheckboxItem;
