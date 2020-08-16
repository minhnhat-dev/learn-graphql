const graphqlFields = require('graphql-fields');
const common = {};


common.getMongooseSelectionFromRequest = (info) => {
    const topLevelFields =  graphqlFields(info);
    const select = Object.keys(topLevelFields).reduce((pre, cur) => {
        return pre + ' ' + cur;
    }, '');
    return select;
}

module.exports = common;


