module.exports = (router) => {
    // 获取图片列表
    router.get('/list', require('./handlers/list'));

    // 上传图片
    router.post('/upload', require('./handlers/upload'));

    // 删除图片
    router.post('/delete', require('./handlers/delete'));
};