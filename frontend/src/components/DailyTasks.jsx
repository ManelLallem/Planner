import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dailyTasks.css";

const DailyTasks = ({ id, date, title }) => {
  const [form, setForm] = useState({
    userId: id,
    taskDate: date,
    name: "",
    startTime: "",
    endTime: "",
    location: "",
    tags: "",
    highPriority: false,
    color: "#4285f4", // Default color
  });
  const [displayFlag, setDisplayFlag] = useState(true);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);
  const [events, setEvents] = useState([]); // We'll keep this state to display the events but won't store the full events locally.

  // Fetch tasks for the given userId and taskDate
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:7010/api/planner/getTasks", {
        params: { userId: id, taskDate: date },
      });
      setEvents(response.data); // Set tasks data
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component loads
  }, [id, date]); // Re-fetch if `id` or `date` changes

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addOrUpdateEvent = async (e) => {
    e.preventDefault();

    const start = parseTime(form.startTime);
    const end = parseTime(form.endTime);

    if (!form.name || start === null || end === null || start >= end) {
      alert("Please enter a valid event with correct start and end times.");
      return;
    }

    if (selectedEventIndex !== null) {
      // Update event on the server
      try {
        const response = await axios.put("http://localhost:7010/api/planner/updateTasks", {
          taskId: events[selectedEventIndex]._id,
          userId: form.userId,
          taskDate: form.taskDate,
          name: form.name,
          startTime: form.startTime,
          endTime: form.endTime,
          location: form.location,
          tags: form.tags,
          highPriority: form.highPriority,
          color: form.color,
        });

        // Re-fetch tasks after updating
        fetchTasks();
      } catch (error) {
        console.error("Error updating task:", error);
        alert("Failed to update the task. Please try again.");
        return;
      }
    } else {
      // Send new task to the backend
      try {
        const response = await axios.post("http://localhost:7010/api/planner/addTask", {
          userId: form.userId,
          taskDate: form.taskDate,
          name: form.name,
          startTime: form.startTime,
          endTime: form.endTime,
          location: form.location,
          tags: form.tags,
          highPriority: form.highPriority,
          color: form.color,
        });

        // Re-fetch tasks after adding a new one
        fetchTasks();
      } catch (error) {
        console.error("Error saving task:", error);
        alert("Failed to save the task. Please try again.");
        return;
      }
    }

    resetForm();
    setDisplayFlag(true);
  };

  const parseTime = (time) => {
    if (!time) return null;
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };

  const calculateTop = (time) => {
    const parsedTime = parseTime(time);
    if (parsedTime === null) return "0%"; // Fallback for invalid time
    return `${(parsedTime / 24) * 100}%`;
  };

  const calculateHeight = (start, end) => {
    const startParsed = parseTime(start);
    const endParsed = parseTime(end);
    if (startParsed === null || endParsed === null || startParsed >= endParsed) {
      return "0%"; // Fallback for invalid duration
    }
    return `${((endParsed - startParsed) / 24) * 100}%`;
  };

  const resetForm = () => {
    setForm({
      userId: id,
      taskDate: date,
      name: "",
      startTime: "",
      endTime: "",
      location: "",
      tags: "",
      highPriority: false,
      color: "#4285f4",
    });
    setSelectedEventIndex(null);
  };

  const handleEventClick = (index) => {
    const event = events[index];
    setForm({
      ...event,
      tags: event.tags.join(", "),
    });
    setSelectedEventIndex(index);
    setDisplayFlag(false);
  };

  return (
    <div className="day-view-container">
      {!displayFlag && (
        <form className="form-container" onSubmit={addOrUpdateEvent}>
          <div className="form-group">
            <div className="arrow" onClick={() => setDisplayFlag(true)}>
              <img src="right-arrow.png" alt="" />
            </div>
            <label>Event Name</label>
            <input
              type="text"
              name="name"
              placeholder="Event Name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Start Time</label>
            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>End Time</label>
            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              placeholder="e.g., Work, Meeting"
              value={form.tags}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="highPriority"
                checked={form.highPriority}
                onChange={handleInputChange}
              />
              High Priority
            </label>
          </div>
          <div className="form-group">
            <label>Event Color</label>
            <input
              type="color"
              name="color"
              value={form.color}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">
            {selectedEventIndex !== null ? "Update" : "Add Event"}
          </button>
        </form>
      )}
      <div className="grid-container">
        {displayFlag ? (
          <div className="grid-header">
            <h1>{title}</h1>
            <input
              type="button"
              value="Add Event"
              onClick={() => {
                resetForm();
                setDisplayFlag(false);
              }}
            />
          </div>
        ) : (
          ""
        )}
        <div className="day-calendar">
          <div className="hour-grid">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="hour">
                <div className="hour-label">{i}:00</div>
              </div>
            ))}
          </div>
          <div className="event-container">
            {events.map((event, index) => (
              <div
                key={index}
                className="event"
                onClick={() => handleEventClick(index)}
                style={{
                  top: `calc(${calculateTop(event.startTime)} + 7px)`,
                  height: `calc(${calculateHeight(event.startTime, event.endTime)})`,
                  backgroundColor: event.color,
                  borderColor: event.highPriority ? "red" : event.color,
                }}
              >
                <div className="event-name">{event.name}</div>
                {event.location && (
                  <div className="event-location">{event.location}</div>
                )}
                {event.tags && event.tags.length > 0 && (
                  <div className="event-tags">
                    {event.tags.map((tag, i) => (
                      <span key={i} className="tag">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTasks;
