const {model, Schema, ObjectId} = require('mongoose')


const File = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    accessLink: {type:String},
    size: {type: Number, default: 0},
    path: {type: String, default: ''},
    date: {type: Date, default: Date.now()},
    user: {type: ObjectId, ref: 'Users'},
    parent: {type: ObjectId, ref: 'Files'},
    childs: [{type: ObjectId, ref: 'Files'}],
})

module.exports = model('Files', File)