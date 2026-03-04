import mongoose, { Schema } from 'mongoose';

const torrentSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
    },
    infoHash: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
        index: true
    }],
    seeders: {
        type: Number,
        default: 0,
        index: true
    },
    leechers: {
        type: Number,
        default: 0
    },
    fileMetadata: {
        type: Schema.Types.Mixed,
    },
    imdbId: {
        type: String,
        index: true,
    },
    tmdbId: {
        type: String,
        index: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'removed'],
        default: 'active'
    }
}, { timestamps: true });

// Create text search index
// This can be adjusted based on specific needs
torrentSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Torrent = mongoose.model('Torrent', torrentSchema);

export default Torrent;