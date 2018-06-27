'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('dbooks.services', []).
  value('version', '0.1');

    //API DOMAIN 
    //.value('API_DOMAIN','http://localhost:3300/');//for offline development and testing
    //.value('API_DOMAIN','https://dbooks-api.herokuapp.com/')//main API DOMAIN
    //.value('API_DOMAIN','https://test-dbooks-api.herokuapp.com/')//TEST API DOMAIN
    //SERVICE URLS
    .factory('URLService',[function(){

        return{
            URLS: [{
                id: 1,
                tag: 'LOGIN',
                url: 'login'
            },{
                id: 2,
                tag: 'LOGOUT',
                url: 'logout/'
            },{
                id: 3,
                tag: 'CREATEBOOK',
                url: 'create/book/'
            },{
                id: 4,
                tag: 'FETCHBOOK',
                url: 'read/book'
            },{
                id: 5,
                tag: 'UNLIKEBOOK',
                url: 'delete/like/'
            },{
                id: 6,
                tag: 'LIKEBOOK',
                url: 'create/like/'
            },{
                id: 7,
                tag: 'LOCKBOOK',
                url: 'update/lock_book/'
            },{
                id: 8,
                tag: 'ADDCHAPTER',
                url: 'create/chapter/'
            },{
                id: 9,
                tag: 'UPDATERENTAL',
                url: 'update/rental_price/'
            },{
                id: 10,
                tag: 'RENTBOOK',
                url: 'create/rental/'
            },{
                id: 11,
                tag: 'FETCHRENTEDBOOKS',
                url: 'read/rentals/'
            },{
                id: 12,
                tag: 'FETCHBOOKS',
                url: 'read/books'
            },{
                id: 13,
                tag: 'FETCHCHAPTER',
                url: 'read/chapter'
            },{
                id: 14,
                tag: 'REVIEWBOOK',
                url: 'create/review/'
            },{
                id: 15,
                tag: 'FETCHREVIEWS',
                url: 'read/reviews'
            },{
                id: 16,
                tag: 'FETCHMYBOOKS',
                url: 'read/my_books/'
            },{
                id: 17,
                tag: 'FETCHMYREADS',
                url: 'read/my_reads/'
            },{
                id: 18,
                tag: 'FETCHFAVORITES',
                url: 'read/favorites/'
            },{
                id: 19,
                tag: 'UPDATEPENNAME',
                url: 'update/pen_name/'
            },{
                id: 20,
                tag: 'UPDATECHAPTER',
                url: 'update/chapter/'
            },{
                id: 21,
                tag: 'UPDATEBOOK',
                url: 'update/book/'
            },{
                id: 21,
                tag: 'UPDATELOGUES',
                url: 'update/logues/'
            },{
                id: 22,
                tag: 'FETCHPOPULAR',
                url: 'read/popular'
            },{
                id: 23,
                tag: 'FETCHBOOKSLANGUAGE',
                url: 'read/books_language'
            },{
                id: 24,
                tag: 'REVIEWBOOK',
                url: 'create/review/'
            },{
                id: 25,
                tag: 'FETCHREVIEWS',
                url: 'read/reviews'
            },{
                id: 26,
                tag: 'FETCHCLAIMS',
                url: 'read/claims/'
            },{
                id: 27,
                tag: 'CLAIMREWARDS',
                url: 'update/claim_rewards/'
            },{
                id: 28,
                tag: 'UPVOTE',
                url: 'create/vote/'
            }],
            
            getURLByTag: function(tag){
                for(var i in this.URLS){
                    if(this.URLS[i].tag==tag){
                        return this.URLS[i].url;
                    }
                }
            }
        }
    }]);
