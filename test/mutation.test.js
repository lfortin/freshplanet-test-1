const chai = require('chai');

const expect = chai.expect;
const url = "http://localhost:3000";
const request = require('supertest')(url);


describe('GraphQL mutations', () => {
  it('Creates a new forum', done => {
    request.post('/graphql')
           .send({
              query: `mutation {
                        createForum(userId: 1, name: "new forum", description: "description of new forum") {
                            statusText,
                            forum {
                                id,
                                name,
                                description
                            }
                        }
                      }`
            })
           .expect(200)
           .end((err, res) => {
             if(err) return done(err);
             expect(res.body.data.createForum).to.have.property('statusText');
             expect(res.body.data.createForum).to.have.property('forum');
             expect(res.body.data.createForum.forum).to.have.property('id');
             expect(res.body.data.createForum.forum).to.have.property('name');
             expect(res.body.data.createForum.forum).to.have.property('description');
             done();
           });
  });
  it('Joins a forum by userId', done => {
    request.post('/graphql')
           .send({
              query: `mutation {
                        joinForum(userId: 1, forumId: "2") {
                            statusText
                        }
                     }`
            })
           .expect(200)
           .end((err, res) => {
             if(err) return done(err);
             expect(res.body.data.joinForum).to.have.property('statusText');
             done();
           });
  });
  it('Posts a new message', done => {
    request.post('/graphql')
           .send({
              query: `mutation {
                            postMessage(userId: 1, forumId: "1", content: "Hi everyone!") {
                                statusText,
                                message {
                                    id,
                                    user {
                                        id,
                                        firstName,
                                        lastName,
                                        picture
                                    }
                                    forumId,
                                    timestamp
                                    content
                                }
                            }
                     }`
            })
           .expect(200)
           .end((err, res) => {
             if(err) return done(err);
             expect(res.body.data.postMessage).to.have.property('statusText');
             expect(res.body.data.postMessage).to.have.property('message');
             expect(res.body.data.postMessage.message).to.have.property('id');
             expect(res.body.data.postMessage.message).to.have.property('user');
             expect(res.body.data.postMessage.message.user).to.have.property('id');
             expect(res.body.data.postMessage.message.user).to.have.property('firstName');
             expect(res.body.data.postMessage.message.user).to.have.property('lastName');
             expect(res.body.data.postMessage.message.user).to.have.property('picture');
             expect(res.body.data.postMessage.message).to.have.property('forumId');
             expect(res.body.data.postMessage.message).to.have.property('timestamp');
             expect(res.body.data.postMessage.message).to.have.property('content');
             done();
           });
  });
});
