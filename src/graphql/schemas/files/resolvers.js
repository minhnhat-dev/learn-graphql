
const fs = require("fs");
const { extname, join } = require("path");
const slug = require("slug");

const resolvers  = {
    Mutation: {
        uploadFile: async (_, {files, path}) => {
            files.map(async (file) => {
                const { createReadStream, filename, mimetype } = await file;
                await new Promise((resolve, reject) => {
                    const name = slug(filename, {
                        replacement: "-",
                        remove: null,
                      });
                })
            })
        }
    }
};

