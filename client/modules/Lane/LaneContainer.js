import { connect } from 'react-redux';
import Lane from './Lane';
import { createLaneRequest, deleteLaneRequest, updateLaneRequest, editLane } from './LaneActions';
import { createNoteRequest, deleteNoteRequest, updateNoteRequest, editNote } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => {
  return {
    laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
  };
};

const mapDispatchToProps = {
  editLane,
  createLane: createLaneRequest,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
  deleteNote: deleteNoteRequest,
  updateNote: updateNoteRequest,
  editNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);
