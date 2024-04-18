const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
    filename: String,
    path: String,
    size: Number,
    textData: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);