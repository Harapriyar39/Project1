const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  const event = new Event({ ...req.body, image: req.file?.path });
  await event.save();
  res.status(201).json(event);
};

exports.getEvents = async (req, res) => {
  const events = await Event.find().populate("organizer");
  res.json(events);
};

exports.updateEvent = async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

exports.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.send("Event deleted");
};
