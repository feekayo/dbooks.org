angular.module('dbooks.main.services',[])
   .factory('BooksCategories',[function(){ //factory function for BookCategories
        return{       
            categories: [{
                id: "all",
                name: "All",
            },{
                id: "adults",
                name: "Adults",
            },{
                id: "kids",
                name: "Kids",
            },{
                id: "self-help",
                name: "Self-Help",
            },{
                id: "academic",
                name: "Academic",
            },{
                id: "programming",
                name: "Programming"
            },{
                id: "entrepreneurship",
                name: "Entrepreneurship"
            },{
                id: "communication",
                name: "Communication"
            },{
                id: "management",
                name: "Management"
            },{
                id: "sales",
                name: "Sales"
            },{
                id: "business",
                name: "Business"
            },{
                id: "motivational",
                name: "Motivational"
            },{
                id: "tutorials",
                name: "Tutorials"
            },{
                id: "design",
                name: "Design"
            },{
                id: "marketing",
                name: "Marketing"
            },{
                id: "lifestyle",
                name: "Lifestyle"
            },{
                id: "gaming",
                name: "Gaming"
            },{
                id: "travel",
                name: "Travel"
            },{
                id: "photography",
                name: "Photography"
            },{
                id: "fitness",
                name: "Fitness"
            },{
                id: "music",
                name: "Music"
            },{
                id: "finance",
                name: "Finance"
            },{
                id: "scifi",
                name: "Science-Fiction"
            },{
                id: "adventure",
                name: "Adventure",                
            },{
                id: "drama",
                name: "Drama",                
            },{
                id: "comedy",
                name: "Comedy",                
            },{
                id: "mystery",
                name: "Mystery",                
            },{
                id: "horror",
                name: "Horror",                
            },{
                id: "nsfw",
                name: "NSFW",                
            },{
                id: "romance",
                name: "Romance",                
            },{
                id: "fantasy",
                name: "Fantasy",                
            },{
                id: "biographies",
                name: "Biographies",                
            },{
                id: "others",
                name: "Others",                
            }]

        }
    }])
    .factory('Languages',[function(){ //factory function for languages
        return{       
            languages: [{
                id: "english",
                name: "English",
            },{
                id: "francais",
                name: "Francais",
            },{
                id: "arabic",
                name: "Arabic",
            },{
                id: "spanish",
                name: "Spanish"
            },{
                id: "german",
                name: "German",
            },{
                id: "korean",
                name: "Korean",
            },{
                id: "chinese",
                name: "Chinese",
            },{
                id: "others",
                name: "Others"
            }]
        }
    }])
    .factory('AccountsService',['$http','localStorageService','API_DOMAIN','URLService',function($http,localStorageService,API_DOMAIN,URLService){
        /***ACCOUNT RELATED SERVICES**/
        
        var session_user_id = localStorageService.get('USER_ID'); //initialize session user from localStorage
        var session_id = localStorageService.get('SESSION_ID');  //initilaize session_id from localStorage

        var login = function(username){ //function for validating logins on the backend
            var url = API_DOMAIN+URLService.getURLByTag('LOGIN');//generate URL from tag
            
            //set http parameters
            return $http({
                url: url,
                method: 'GET', //GET http request type
                params: {
                    steemit_username : username //steemit username is the only parameter required
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }

        var logout = function(){ //function for login user out of the dbooks backend

            var url = API_DOMAIN+URLService.getURLByTag('LOGOUT')+session_id; //initialize session user from localStorage
            
            //console.log(url);//log url
        
            //set http parameters
            return $http({ 
                url: url,
                method: 'POST', //POST http request type
                headers: {'Content-Type':'application/x-www-form-urlencoded'}, //encoded content
                transformRequest: function(obj){//transform request
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    user_id : session_user_id //only session USER_ID is required to be passed 
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }
        
        var update_pen_name = function(pen_name){
            var url = API_DOMAIN+URLService.getURLByTag('UPDATEPENNAME')+session_id;
            
            //set http parameters
            return $http({
                url: url,
                method: 'POST', //POST http request type
                headers: {'Content-Type':'application/x-www-form-urlencoded'}, //encoded content
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    user_id: session_user_id, //session USER_ID is required
                    pen_name: pen_name //new pen name
                }                
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }

        return{ //return values
            login: login,
            logout: logout,
            update_pen_name: update_pen_name
        }
    }])
    .factory('BooksService',['$http','localStorageService','API_DOMAIN','URLService',function($http,localStorageService,API_DOMAIN,URLService){
        
        /***BOOK RELATED SERVICES**/
        
        if(localStorageService.get('USER_ID') && localStorageService.get('SESSION_ID')){ //if session user exists
            //initialize variables
            
            var session_user_id = localStorageService.get('USER_ID');
            var session_id = localStorageService.get('SESSION_ID');
        }else{
            //pass in empty values
            var session_id = "";
            var session_user_id = "";
        }

        var create = function(title,bucket,object,genre,synopsis,language,other_language,premium){//function for creating books 

            var url = API_DOMAIN+URLService.getURLByTag('CREATEBOOK')+session_id;//generate URL
            
            return $http({ //http method
                url: url,
                method: 'PUT', //PUT http method
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: { //data
                    user_id: session_user_id,
                    title: title,
                    bucket: bucket,
                    object: object,
                    genre: genre,
                    synopsis: synopsis,
                    language: language,
                    other_language: other_language,
                    premium: premium
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });            
        }

        var fetch_book = function(book_id){//for fetching a single book by ID
            var url = API_DOMAIN+URLService.getURLByTag('FETCHBOOK');//generate URL 

            return $http({ //http method
                url: url,
                method: 'GET', //GET http request
                params: {
                    book_id: book_id,
                    user_id: session_user_id
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }

        var like_book = function(book_id){//for adding a book to list of Favorites
            
            var url = API_DOMAIN+URLService.getURLByTag('LIKEBOOK')+session_id; //generate URL

            return $http({//http method
                url: url,
                method: 'PUT', //PUT http request
                headers: {'Content-Type':'application/x-www-form-urlencoded'}, //transform request
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    user_id: session_user_id, 
                    book_id: book_id
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }
        
        var unlike_book = function(book_id){ //for removing a book from favorites list
            var url = API_DOMAIN+URLService.getURLByTag('UNLIKEBOOK')+session_id;//generate url

            return $http({
                url: url,
                method: 'POST', //POST http request
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    user_id: session_user_id,
                    book_id: book_id
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }        

        var lock_book = function(book_id,rental_price){ //for locking books during monetization
            var url = API_DOMAIN+URLService.getURLByTag('LOCKBOOK')+session_id; //generate url

            return $http({
                url: url,
                method: 'POST', //POST http method
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    user_id: session_user_id,
                    rental_price: rental_price,
                    book_id: book_id
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });            
        }

        var add_chapter = function(book_id,chapter_title,chapter_number,chapter_content,steemit_published,author,permlink){ //for uploading new chapters
            
            var url = API_DOMAIN+URLService.getURLByTag('ADDCHAPTER')+session_id;//generate url
            
            return $http({
                url: url,
                method: 'PUT',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    user_id: session_user_id,
                    book_id: book_id,
                    chapter_title: chapter_title,
                    chapter_number: chapter_number,
                    chapter_content: chapter_content,
                    steemit_published: steemit_published,
                    author: author,
                    permlink: permlink
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });               
        }

        var update_rental = function(book_id,rental_price){//for updating book rental prices
            var url = API_DOMAIN+URLService.getURLByTag('UPDATERENTAL')+session_id;

            return $http({
                url: url,
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    user_id: session_user_id,
                    rental_price: rental_price,
                    book_id: book_id
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });            
        }

        var rent_book = function(price,book_id,claim_user_id){//for renting books
            var user = localStorageService.get('user_details');//fetch a user's steemit details
            
            var url = API_DOMAIN+URLService.getURLByTag('RENTBOOK')+session_id,//generate URL
                steemit_user_name = user.name;

            return $http({
                url: url,
                method: 'PUT',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    claim_user_id:claim_user_id,//id of user to claim payment
                    steemit_user_name: steemit_user_name,
                    user_id: session_user_id,
                    price: price,
                    book_id: book_id
                }                
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }

        var fetch_rented_books = function(page_number){//for fetching books rented by a user
            var url = API_DOMAIN+URLService.getURLByTag('FETCHRENTEDBOOKS')+session_id; //generate URL

            return $http({
                url: url,
                method: 'GET',
                params: {
                    user_id: session_user_id,
                    page_num: page_number
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }

        var fetch_books_by_category = function(genre,page_number){//for fetching books by genre
            var url = API_DOMAIN+URLService.getURLByTag('FETCHBOOKS');//generate URL
            return $http({
                url: url,
                method: 'GET',
                params: {
                    genre: genre,
                    page_num: page_number
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }
        
        var fetch_books_by_category_language = function(genre,language,page_number){//for fetching books by category & language
            var url = API_DOMAIN+URLService.getURLByTag('FETCHBOOKSLANGUAGE');//generate url
            return $http({
                url: url,
                method: 'GET',
                params: {
                    genre: genre,
                    language: language,
                    page_num: page_number
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }        
        
        var fetch_popular = function(){//for fetching popular books
            var url = API_DOMAIN+URLService.getURLByTag('FETCHPOPULAR');//generate URL
            return $http({
                url: url,
                method: 'GET',
                params: {
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }        

        var find_books_search = function(){//for finding books via search query

        }
        
        var fetch_my_books = function(page_number){//fetch a book written by session user
            
            var url = API_DOMAIN+URLService.getURLByTag('FETCHMYBOOKS')+session_id;//generate url
            return $http({
                url: url,
                method: 'GET',
                params: {
                    user_id: session_user_id,
                    page_num: page_number
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }
        
        var fetch_my_reads = function(page_number){//fetch books being read by a user    
            
            var url = API_DOMAIN+URLService.getURLByTag('FETCHMYREADS')+session_id;//generate url
            return $http({
                url: url,
                method: 'GET',
                params: {
                    user_id: session_user_id,
                    page_num: page_number
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        } 
        
        var fetch_favorites = function(page_number){//for fetching books favorited by session user
            var url = API_DOMAIN+URLService.getURLByTag('FETCHFAVORITES')+session_id;//generate url
            return $http({
                url: url,
                method: 'GET',
                params: {
                    user_id: session_user_id,
                    page_num: page_number
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }         

        var fetch_book_chapter = function(book_id,chapter_number){ //for fetching books by chapter
            var url = API_DOMAIN+URLService.getURLByTag('FETCHCHAPTER');//generate url

            if(localStorageService.get('USER_ID')==undefined){
                session_user_id = "";
            }

            return $http({
                url: url,
                method: 'GET',
                params:{
                    user_id: session_user_id,
                    book_id: book_id,
                    chapter_number: chapter_number
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }        

        var review_book = function(book_id,author,permlink,content,rating){ //for publishing book review

            var url = API_DOMAIN+URLService.getURLByTag('REVIEWBOOK')+session_id;//generate URL

            return $http({
                url: url,
                method: 'PUT',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    user_id: session_user_id,
                    book_id: book_id,
                    author: author,
                    permlink: permlink,
                    content: content,
                    rating: rating
                }                
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }

        var fetch_reviews = function(book_id,page_num){//for fetching book reviews
            var url = API_DOMAIN+URLService.getURLByTag('FETCHREVIEWS');

            return $http({
                url: url,
                method: 'GET',
                params:{
                    book_id: book_id,
                    page_num: page_num
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }
        
        var fetch_claims = function(page_num){ //for fetching session user's money claims
            var url = API_DOMAIN+URLService.getURLByTag('FETCHCLAIMS')+session_id;//generate URL
            
            return $http({
                url: url,
                method: 'GET',
                params:{
                    user_id: session_user_id,
                    page_num: page_num
                }                
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }
        
        var update_logue = function(param,value,book_id,author,permlink){ //for posting epilogues and prologues
            var url = API_DOMAIN+URLService.getURLByTag('UPDATELOGUES')+session_id; //generate URL
            //console.log(url);
            return $http({
                url: url,
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    user_id : session_user_id,
                    param: param,
                    book_id: book_id,
                    value: value,
                    author: author,
                    permlink: permlink
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }

        var update_chapter = function(chapter_title,chapter_content,book_id,permlink){//for making updates to a chapter
            var url = API_DOMAIN+URLService.getURLByTag('UPDATECHAPTER')+session_id;//generate URL
            //console.log(url);
            
            return $http({
                url: url,
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    user_id : session_user_id,
                    chapter_title: chapter_title,
                    chapter_content: chapter_content,
                    book_id: book_id,
                    permlink: permlink
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }
        
        var update_book = function(book_id,title,bucket,object,genre,synopsis){//for updating book details
            var url = API_DOMAIN+URLService.getURLByTag('UPDATEBOOK')+session_id;//generate URL
            
            //console.log(url);
            
            return $http({
                url: url,
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    user_id : session_user_id,
                    book_id: book_id,
                    title: title,
                    img_url: img_url,
                    genre: genre,
                    synopsis: synopsis
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
            
        }   
        
        var claim_reward = function(claim_id){//for claiming writer rewards one at a time
            var url = API_DOMAIN+URLService.getURLByTag('CLAIMREWARDS')+session_id;//generate URL
            console.log(url);
            
            var user = localStorageService.get('user_details');
            var username = user.name;
            return $http({
                url: url,
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    user_id : session_user_id,
                    claim_id: claim_id,
                    claim_acct: username
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });
        }   
        
        var upvote = function(permlink){
            var url = API_DOMAIN+URLService.getURLByTag('UPVOTE')+session_id; //for logging upvotes to the backend
            //console.log(url);        
            return $http({
                url: url,
                method: 'PUT',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    user_id : session_user_id,
                    permlink: permlink
                }
            }).success(function(data,status,header,config){
            }).error(function(data,status,header,config){
            });            
        }


        return{
            create: create,
            fetch_book: fetch_book,
            like_book: like_book,
            unlike_book: unlike_book,
            add_chapter: add_chapter,
            fetch_book_chapter: fetch_book_chapter,
            fetch_books_by_category: fetch_books_by_category,
            fetch_popular: fetch_popular,
            fetch_my_books: fetch_my_books,
            fetch_my_reads: fetch_my_reads,
            fetch_favorites: fetch_favorites,
            update_chapter: update_chapter,
            update_book: update_book,
            update_logue: update_logue,
            lock_book: lock_book,
            fetch_books_by_category_language: fetch_books_by_category_language,
            rent_book: rent_book,
            review_book: review_book,
            fetch_reviews: fetch_reviews,
            fetch_rented_books: fetch_rented_books,
            fetch_claims: fetch_claims,
            claim_reward: claim_reward,
            upvote: upvote
        }
    }]);