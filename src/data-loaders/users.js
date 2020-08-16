const DataLoader = require('dataloader');
const {PostService} = require('../services');
async function batchPosts (ids) {
    const posts = await PostService.find({userId: {$in: ids}});
    return ids.map(id => posts.filter(item => item.userId.toString() == id.toString()) || null);
}

module.exports = {
    getPosts: new DataLoader(batchPosts, {cacheKeyFn: key => key.toString()})
}
