import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid';

export function addNote(req, res) {
  const { note, laneId } = req.body;
  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }
  const newNote = new Note({
    task: note.task,
  });
  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

export function deleteNote(req, res) {
  let targetNote = null;
  const checkTargetNote = () => new Promise(resolve => resolve(
    Lane.findOne({ id: req.params.laneId })
      .then(lane => {
        lane.notes.map(note => {
          if (note.id === req.params.noteId) {
            targetNote = note;
          } });
      })
      .catch(() => res.status(400).send(`Don't found lane with id: ${req.params.laneId}`))
  ));
  checkTargetNote()
    .then(() => {
      if (targetNote !== null) {
        targetNote.remove()
          .then(() => res.status(200).end())
          .catch(() => res.status(500).end());
      } else {
        res.status(400).send(`Don't found note with id: ${req.params.noteId}`);
      }
    });
}

export function updateNote(req, res) {
  let targetNote = null;
  const checkTargetNote = () => new Promise(resolve => resolve(
    Lane.findOne({ id: req.params.laneId })
      .then(lane => {
        lane.notes.map(note => {
          if (note.id === req.params.noteId) {
            targetNote = note;
          } });
      })
      .catch(() => res.status(400).send(`Don't found lane with id: ${req.params.laneId}`))
  ));
  checkTargetNote()
    .then(() => {
      if (targetNote !== null && req.body.note.task.length > 0) {
        targetNote.task = req.body.note.task;
        targetNote.save((err, updated) => {
          if (err) {
            res.status(500).end();
          }
          res.json(updated);
        });
      } else {
        res.status(400).send(`Don't found note with id: ${req.params.noteId} or task content was empty`);
      }
    });
}
