import "./index.css";

const EventCheckboxItem = (props) => {
  const { eventDetails, onChangeEvent } = props;
  const { eventName, id, selected } = eventDetails;

  const onCheckEvent = (event) => {
    onChangeEvent(id, event.target.checked);
  };
  return (
    <div>
      {selected ? (
        <input
          id={id}
          type="checkbox"
          name="selectedEvents"
          value={id}
          onChange={onCheckEvent}
          checked={true}
        />
      ) : (
        <input
          id={id}
          type="checkbox"
          name="selectedEvents"
          value={id}
          onChange={onCheckEvent}
          checked={false}
        />
      )}
      <label htmlFor={id}>{eventName}</label>
    </div>
  );
};

export default EventCheckboxItem;
