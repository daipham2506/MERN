const express = require("express")
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route   POST api/posts
// @Desc    Create a post
// @Access  Private
router.post(
    '/',
    [
        auth,
        [
            check('text', 'Text is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const user = await User.findById(req.user.id).select('-password')

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })

            const post = await newPost.save()

            res.json(post)
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
)

// @route   GET api/posts
// @Desc    get all post
// @Access  Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

// @route   GET api/posts/:id
// @Desc    get posts form id
// @Access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id)

        if (!posts) {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.json(posts)
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/posts/:id
// @Desc    delete a post
// @Access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!posts) {
            return res.status(404).json({ msg: 'Post not found' })
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        await post.remove()

        res.json({ msg: 'Post deleted' })
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/posts/like/:id
// @Desc    Like a post
// @Access  Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' })
        }

        post.likes.unshift({ user: req.user.id })
        await post.save()

        res.json(post.likes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/posts/unlike/:id
// @Desc    Unlike a post
// @Access  Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' })
        }

        //get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex, 1)

        await post.save()

        res.json(post.likes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/posts/comment/:id
// @Desc    Comment a post
// @Access  Private
router.post(
    '/comment/:id',
    [
        auth,
        [
            check('text', 'Text is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const user = await User.findById(req.user.id).select('-password')
            const post = await Post.findById(req.params.id)

            const newComment = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })

            post.comments.unshift(newComment)

            await post.save()

            res.json(post.comments)
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
)

// @route   DELETE api/posts/comment/:id/cmt_id
// @Desc    delete comment
// @Access  Private
router.delete('/comment/:id/cmt_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.cmt_id)

        // make sure cmt exist
        if (!comment) {
            return res.status(404).json({ msg: 'Comment dose not exist' })
        }

        // check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        //get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

        post.comments.splice(removeIndex, 1)

        await post.save()

        res.json(post.comments)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})


module.exports = router