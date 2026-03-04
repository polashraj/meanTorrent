import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import { TorrentController } from '../controllers/torrent.controller';

const router = Router();
const controller = new TorrentController();

// List torrents with pagination
router.get('/torrents', [
    query('page').isInt({ min: 1 }).optional(),
    query('limit').isInt({ min: 1, max: 100 }).optional()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    controller.listTorrents(req, res);
});

// Full-text search
router.get('/torrents/search', [
    query('query').isString().notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    controller.searchTorrents(req, res);
});

// Upload torrent
router.post('/torrents/upload', [
    body('file').notEmpty(),
    body('category').isString().notEmpty(),
    body('name').isString().notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    controller.uploadTorrent(req, res);
});

// Filter by category
router.get('/torrents/category/:category', (req, res) => {
    controller.filterByCategory(req, res);
});

export default router;