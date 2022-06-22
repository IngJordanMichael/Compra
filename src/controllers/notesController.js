const notesCtrl = {};
const { use } = require('passport/lib');
const Note = require('../models/Note');
const Role = require('../models/roles');
const User = require('../models/User');

notesCtrl.renderNoteForm = (req, res) => {
    console.log('Este es el usuario', req.user.roles);
    res.render('notes/new-note');
}
notesCtrl.createNewNote = async(req, res) => {
   const {title, description} = req.body;
   const newNote = new Note({title: title, description: description});
   newNote.user = req.user.id;
   await newNote.save();
   req.flash('success_msg', 'Note added successfully')
   res.redirect('/notes');
}
notesCtrl.renderNotes = async(req, res) => {
   const notes = await Note.find({user: req.user.id}).lean();
   const roles = await User.find({id: Role.id}).populate('roles').lean();
   console.log(roles);
   res.render('notes/all-notes', {notes});
   
}
notesCtrl.renderEditForm = async(req, res) => {
    const note = await Note.findById(req.params.id).lean();
    console.log(note);
    res.render('notes/edit-note',{note});
}
 notesCtrl.updateNote = async(req, res) => {
     const {title, description} = req.body;
     await Note.findByIdAndUpdate(req.params.id,{title, description});
     console.log(req.body);
     req.flash('success_msg', 'Note updated successfully');
     res.redirect('/notes');
     
 }
 notesCtrl.deleteNote = async(req, res) => {
   await Note.findByIdAndDelete(req.params.id);
   req.flash('success_msg', 'Note delete successfully');
    res.redirect('/notes');
 }
module.exports = notesCtrl;
























