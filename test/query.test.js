const chai = require('chai');

const expect = chai.expect;
const url = "http://localhost:3000";
const request = require('supertest')(url);


describe('GraphQL queries', () => {
  it('Returns all forums list', done => {
    request.post('/graphql')
           .send({
              query: `query {
                        allForums {
                          id,
                          name,
                          description
                        }
                      }`
            })
           .expect(200)
           .end((err, res) => {
             if(err) return done(err);
             expect(res.body.data.allForums).to.have.lengthOf.at.least(1);
             expect(res.body.data.allForums[0]).to.have.property('id');
             expect(res.body.data.allForums[0]).to.have.property('name');
             expect(res.body.data.allForums[0]).to.have.property('description');
             done();
           });
  });
  it('Returns a list of joined forums by userId', done => {
    request.post('/graphql')
           .send({
              query: `query {
                        joinedForumsByUserId(userId: "1") {
                            id,
                            name,
                            description
                        }
                      }`
            })
           .expect(200)
           .end((err, res) => {
             if(err) return done(err);
             expect(res.body.data.joinedForumsByUserId).to.have.lengthOf.at.least(1);
             expect(res.body.data.joinedForumsByUserId[0]).to.have.property('id');
             expect(res.body.data.joinedForumsByUserId[0]).to.have.property('name');
             expect(res.body.data.joinedForumsByUserId[0]).to.have.property('description');
             done();
           });
  });
  it('Returns a list of messages by forumId', done => {
    request.post('/graphql')
           .send({
              query: `query {
                        messagesByForumId(forumId: "1") {
                            id,
                            user {
                                id,
                                firstName,
                                lastName,
                                picture
                            },
                            forumId,
                            timestamp,
                            content
                        }
                      }`
            })
           .expect(200)
           .end((err, res) => {
             if(err) return done(err);
             expect(res.body.data.messagesByForumId).to.have.lengthOf.at.least(1);
             expect(res.body.data.messagesByForumId[0]).to.have.property('id');
             expect(res.body.data.messagesByForumId[0]).to.have.property('user');
             expect(res.body.data.messagesByForumId[0].user).to.have.property('id');
             expect(res.body.data.messagesByForumId[0].user).to.have.property('firstName');
             expect(res.body.data.messagesByForumId[0].user).to.have.property('lastName');
             expect(res.body.data.messagesByForumId[0].user).to.have.property('picture');
             expect(res.body.data.messagesByForumId[0]).to.have.property('forumId');
             expect(res.body.data.messagesByForumId[0]).to.have.property('timestamp');
             expect(res.body.data.messagesByForumId[0]).to.have.property('content');
             done();
           });
  });
  it('Returns a list of members by forumId', done => {
    request.post('/graphql')
           .send({
              query: `query {
                        membersByForumId(forumId: "1") {
                            id,
                            firstName,
                            lastName,
                            picture
                        }
                      }`
            })
           .expect(200)
           .end((err, res) => {
             if(err) return done(err);
             expect(res.body.data.membersByForumId).to.have.lengthOf.at.least(1);
             expect(res.body.data.membersByForumId[0]).to.have.property('id');
             expect(res.body.data.membersByForumId[0]).to.have.property('firstName');
             expect(res.body.data.membersByForumId[0]).to.have.property('lastName');
             expect(res.body.data.membersByForumId[0]).to.have.property('picture');
             done();
           });
  });
});
