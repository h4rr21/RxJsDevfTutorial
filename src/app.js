import $ from 'jquery';
import Rx from 'rxjs/Rx';

// //Referenciamos el btn que esta en el html
// const btn = $('#btn')
// //Creamos n observable desde el vento de click
// const btnStream$ = Rx.Observable.fromEvent(btn,'click');
// btnStream$.subscribe(
//     function (e){
//         console.log('Click')
//     }, function (err){
//         console.log('Error')
//     }, function (){
//         console.log('Complete')
//     });

// const input = $('#input');
// const output = $('#output');

// const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');
// inputStream$.subscribe( 
//     function (e){
//         console.log(e.currentTarget.value)
//         output.text(e.target.value)
//     }, function (err){
//         console.log('Err')
//     }, function (){
//         console.log('Complete')
//     });

// const moverStream$ = Rx.Observable.fromEvent(document, 'mousemove');
// moverStream$.subscribe(
//     function(e){
//         output.html('<h1> x:' + e.clientX+ ' y: '+e.clientY+'</h1>')
//     });

// const numbers = [1,2,3,4,5,6,7,8,9]
// const numbersStream$ = Rx.Observable.from(numbers)
// numbersStream$.subscribe(
//     function (e) {
//         console.log(e)
//     });

// const postElement = $('#posts')
// const posts = [
//     {title: 'Post uno', body: 'Este es el cuerpo'},
//     {title: 'Post uno', body: 'Este es el cuerpo'},
//     {title: 'Post uno', body: 'Este es el cuerpo'}
// ]

// const postStreams$ = Rx.Observable.from(posts)
// postStreams$.subscribe(
//     function (post){
//         postElement.append('<li><h3>'+post.title+'</h3><p>' + post.body+'</p></li>')
//     }
// );
    
// const set = new Set(['Hello',44, {algo:'some thing'}])
// const set$ = Rx.Observable.from(set);
// set$subscribe(
//     function (value){
//         console.log(value)
//     });

// const map = new Map ([1,2],[2,3],[4,5]);
// Rx.Observable.from(map)
//     .subscribe(
//         function (value){
//             Rx.Observable.from(value)
//                 .subscribe(
//                     function (e){
//                         console.log(e)
//                     }
//                 )
//         }
//     )
// --------------------------------------------
// const source$ = new Rx.Observable(
//     function (observer){
//         observer.next('Hello World')
//         observer.next('Otro valor')
//         setTimeout( 
//             function(){
//                 observer.next('Todavia falta otro valor')
//                 observer.complete()
//             },
//             2000
//         )
//     }
// )

// source$
//     .subscribe(
//         function (x){
//             console.log(x)
//         },
//         function (err){
//             console.log(err)
//         },
//         function (){
//             console.log('complete')
//         }
//     )
// --------------------------------------------

//Rx from Promise
const myPromise = new Promise(
    function (resolve, reject){
        console.log('creando promesa')
        setTimeout(
            function (){
                resolve("Hello World desde promesa")
            },
            3000
        )
    }
)

myPromise.then(
    function (x){
        console.log(x)
    }
)

Rx.Observable.fromPromise(myPromise)
    .subscribe(
        function (x){
            console.log(x)
        }
    )

function getUser(username){
    return $.ajax({
        url: 'https://api.github.com/users/' + username,
        dateType: 'json'
    }).promise();
}

// getUser('h4rr21')
//     .then (
//         function (x){
//             console.log(x)
//         }
//     )        

Rx.Observable.fromEvent($('#username'), 'keyup')
    .subscribe(
        function (x){
            Rx.Observable.fromPromise(getUser(x.target.value))
                .subscribe(
                    function (user){
                        $('#name').text(user.name),
                        $('#blog').text(user.blog),
                        $('#repos').text(user.public_repos)
                    }
                )
        }
    )
