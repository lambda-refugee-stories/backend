const request = require('supertest');

const db = require('../../database/dbConfig.js');
const Stories = require('./storiesDBRequestModels.js');

describe('Stories Model functions', () => {
    beforeAll(async () => {
        await db('stories').truncate();
   
    });

    describe('addStory()', () => {
        

        it('should add the entered story into the db', async () => {
            let subStory = await Stories.addStory({
                name: 'Rima',
                title: '$28 and a jar of olive oil',
                story: 'From this small initial donation, today Najwa has built up a soap making business that provides her and four other women with a vital income, and which recently began exporting its first orders to China.'
            });
            expect(subStory).toEqual([1]);
        });
    });

    

    describe('getAll()', () => {
       

        it('should retrieve all stories from the stories db', async () => {
            let stories = await Stories.getAll();

            expect(stories.length).toEqual(1);
        });
    });

    describe('findById()', () => {
      

        it('should find the particular story by its id', async () => {
            let story = await Stories.findById("1");

            expect(story).toEqual([{"id": 1, "imageurl": null, "isapproved": 0, "name": "Rima", "story": "From this small initial donation, today Najwa has built up a soap making business that provides her and four other women with a vital income, and which recently began exporting its first orders to China.", "title": "$28 and a jar of olive oil"}]);
        });
    });

    describe('getApproved()', () => {
        

        it('should only retrieve the stories in the db that are approved', async () => {
            let approvedStories = await Stories.getApproved();

            expect(approvedStories.length).toBe(0);
        });
    });

    describe('update()', () => {
        

        it('should update the story record', async () => {
            let updatedStory = await Stories.update({
                name: 'Rachel', 
            }, 1);

            const name = ['Rachel'];

            expect(updatedStory).toBe(1);
        })
    });

    describe('deleteStory()', () => {
        

        it('should remove the story from the stories database', async () => {
            let subStory = await Stories.deleteStory({name: 'Rima'});

            const name = ['Rima'];

            expect(db).toEqual(expect.not.arrayContaining(name));
        });
    });
});