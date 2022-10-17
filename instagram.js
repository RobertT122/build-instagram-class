class Instagram {
    constructor() {
        this.users = {};
        this.time = 0;
    }

    postPhoto(userId, photoId) {
        // Write code here...
        this.generateUser(userId);
        this.users[userId].postPhoto(photoId, this.time);
        this.time++;
    }

    getFeed(userId) {
        // Write code here...
        this.generateUser(userId);

        let users = [userId];
        let photos = [].concat(...(users.concat([...this.users[userId].following])).map(userId => this.users[userId].photos));
        let feed = photos.sort((photoA, photoB) => photoB.timeStamp - photoA.timeStamp).slice(0,10).map(photo => photo.id);
        console.log(feed);
        return feed;
    }

    follow(userId, followeeId) {
        // Write code here..
        this.generateUser(userId);
        this.generateUser(followeeId);

        this.users[userId].follow(followeeId)
    }

    unfollow(userId, followeeId) {
        // Write code here..
        this.generateUser(userId);
        this.generateUser(followeeId);

        this.users[userId].unfollow(followeeId)
    }

    generateUser(uId){
         !this.users[uId] && (() => this.users[uId] = new User(uId))();
    }

}

class User {
    constructor(id) {
        this.id = id;
        this.following = new Set();
        this.photos = [];
    }

    postPhoto(photoId, time) {
        this.photos.push(new Photo(photoId, time))
    }

    follow(uId){
        this.following.add(uId)
    }

    unfollow(uId){
        this.following.delete(uId)
    }
}

class Photo {
    constructor(id, time){
        this.id = id;
        this.timeStamp = time
        // console.log(`[${this.id}] : ${this.timeStamp}`)
    }
}

// Test Case
const instagram = new Instagram();

instagram.postPhoto(1,11) // User with id=1 posts a photo with id=11
instagram.getFeed(1) // returns [11]
instagram.postPhoto(2, 12) // User with id=2 posts a photo with id=12
instagram.getFeed(1) // returns [11]
instagram.follow(1,2) // User 1 follows User 2
instagram.postPhoto(3, 13) // User with id=3 posts a photo with id=13
instagram.postPhoto(3, 14) // User with id=3 posts a photo with id=14
instagram.postPhoto(3, 15) // User with id=3 posts a photo with id=15
instagram.postPhoto(3, 16) // User with id=3 posts a photo with id=16
instagram.postPhoto(3, 17) // User with id=3 posts a photo with id=17
instagram.postPhoto(3, 18) // User with id=3 posts a photo with id=18
instagram.postPhoto(3, 19) // User with id=3 posts a photo with id=19
instagram.getFeed(2) // returns [12]
instagram.follow(2,3) // User 2 follows User 3
instagram.getFeed(2) // returns [19, 18, 17, 16, 15, 14, 13, 12]
instagram.postPhoto(4, 20) // User with id=4 posts a photo with id=20
instagram.postPhoto(4, 21) // User with id=4 posts a photo with id=21
instagram.postPhoto(4, 22) // User with id=4 posts a photo with id=22
instagram.postPhoto(4, 23) // User with id=4 posts a photo with id=23
instagram.follow(2,4) // User 2 follows User 4
instagram.getFeed(2) // returns [23, 22, 21, 20, 19, 18, 17, 16, 15, 14]
instagram.unfollow(2,3) // User 2 unfollows User 3
instagram.getFeed(2) // returns [ 23, 22, 21, 20, 12 ]
instagram.unfollow(2,4) // User 2 unfollows User 4
instagram.getFeed(2) // returns [ 12 ]