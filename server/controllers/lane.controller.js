import Lane from '../models/lane';
import uuid from 'uuid';

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }
  const newLane = new Lane(req.body);
  newLane.notes = [];
  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    lane.notes.map(note => {
      note.remove();
    });
    lane.remove(() => {
      res.status(200).send({});
    });
  });
}

export function updateLane(req, res) {
  const updateLaneName = () => new Promise(resolve => resolve(
    Lane.findOne({ id: req.params.laneId })
      .then(lane => {
        lane.name = req.body.name;
        lane.save((err, updated) => {
          if (err) {
            res.status(500).send(err);
          }
          res.json(updated);
        });
      })
      .catch(() => {
        res.status(400).send(`Don't found lane with id: ${req.params.laneId}`);
      })
  ));
  if (!req.body.name) {
    res.status(403).end();
  } else {
    updateLaneName();
  }
}
