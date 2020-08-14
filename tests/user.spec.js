const {expect } = require('chai');
const api = require('./api');
const database = require('../src/models/db');
const models = require('../src/models');
const {UserService} = require('../src/services');

before (() => {
    database.connectDb();
})

after (() => {
    database.dropCollectionByName('users', (err, result) => {
        if(err) throw err;
        database.closeDb();
    });
})

describe('test for feature of users ', () => {
    describe('register(name: String!, email: String!, password: String!): UserAuth', () => {
        it ('return user and token when register success',async () => {
            const user = {
                name: "person test",
                email: "emailtest@gmail.com",
                password: "password"
            }

            const result = await api.register(user);
            const data = result.data.data.register || {};
            expect(data).to.be.an('object').and.is.ok;
            expect(data).to.have.property('user').that.is.an('object').and.that.have.property('id');
            expect(data).to.have.property('token').that.is.an('string').and.is.ok;
        })

        it('return error when email exist',async () => {
            const user = {
                name: "person test",
                email: "emailtest@gmail.com",
                password: "password"
            }
            const result = await api.register(user);
            const data = result.data || {};
            expect(data).to.be.an('object').and.is.ok;
            expect(data).to.have.property('errors').that.is.an('array')
            const code = result.data.errors[0].extensions.code || '';
            expect(code).to.be.equal('BAD_USER_INPUT');
            expect(data).to.have.property('data').that.is.an('object').and.that.have.property('register').to.be.null;
        })
    })

    describe('login(email: String!, password: String!): UserAuth', () => {
        it('return user and token when login success', async () => {
            const user = {
                email: "emailtest@gmail.com",
                password: "password",
            }

            const result = await api.login(user);
            const data = result.data.data.login || {};
            expect(data).to.be.an('object').and.is.ok;
            expect(data).to.have.property('user').that.is.an('object').and.that.have.property('id');
            expect(data).to.have.property('token').that.is.an('string').and.is.ok;
        })

        it('return error when email invalid',async () => {
            const user = {
                email: "wrong@gmail.com",
                password: "password"
            }
            const result = await api.login(user);
            const data = result.data || {};
            expect(data).to.be.an('object').and.is.ok;
            expect(data).to.have.property('errors').that.is.an('array')
            const error = result.data.errors[0] || {};
            const { message, extensions = {} } = error;
            expect(message).to.be.equal("Invalid email");
            const { code } = extensions;
            expect(code).to.be.equal('BAD_USER_INPUT');
            expect(data).to.have.property('data').that.is.an('object').and.that.have.property('login').to.be.null;
        })

        it('return error when password invalid',async () => {
            const user = {
                email: "emailtest@gmail.com",
                password: "wrong"
            }
            const result = await api.login(user);
            const data = result.data || {};
            expect(data).to.be.an('object').and.is.ok;
            expect(data).to.have.property('errors').that.is.an('array')
            const error = result.data.errors[0] || {};
            const { message, extensions = {} } = error;
            expect(message).to.be.equal("Invalid password");
            const { code } = extensions;
            expect(code).to.be.equal('BAD_USER_INPUT');
            expect(data).to.have.property('data').that.is.an('object').and.that.have.property('login').to.be.null;
        })
    })
})

