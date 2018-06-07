var minutes = 0;
let seconds = 0;
var hours = 0;
var Stop = 0;
window.onload = function() {
    setInterval(function() {
        if (Stop !== 1) {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            if (minutes === 60) {
                hours++;
                minutes = 0;
                seconds = 0;
            }
            $('.timer').html(hours + ':' + minutes + ':' + seconds);
            
			
            console.log(minutes);
            console.log(seconds);
        }

    }, 1000);
};

/*
 * Create a list that holds all of your card
 */
var card = [];
var Name_of_card = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
var Card_open = [];
/*
 * Display the card on the page
 *   - shuffle the list of card using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
$('.deck').each(function() {
    $(this).find('li').each(function() {
        card.push($(this));
    });
});
var temporary = 0;

Name_of_card = shuffle(Name_of_card);

var cardNumber = 0;
$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        $(this).removeAttr('class');
        $(this).addClass(Name_of_card[cardNumber]);
        cardNumber++;
    });
});

//console.log($($(card[0][0]).find('i')[0]).attr('class'));
$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        var temporaryClass = $($(card[temporary][0]).find('i')[0]).attr('class');
        $(this).removeAttr('class');
        $(this).addClass(temporaryClass);
        temporary++;
    });
});
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
var user_moves = 0,
    ratings = 3;

removeProperties = function(prop) {
    setTimeout(function() {
        prop.removeClass('show open animated wobble');
        Card_open[0].removeClass('show open animated wobble');
        Card_open = [];
    }, 400);
};

showCardOnClick = function(clickEvent) {
    clickEvent.on('click', function() {
        user_moves++;
        if (user_moves === 16) {

        } else if (user_moves > 16 && user_moves <= 25) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            ratings = 2;
        } else if (user_moves > 25) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            ratings = 1;
        }
        $('.moves').html(user_moves);
        if ((Card_open.length % 2) === 0) {
            $(this).addClass('show open animated wobble');
            $(this).off('click');
            Card_open.push($(this));
        } else if (Card_open.length !== 0) {
            $(this).addClass('show open animated wobble');

            var self = $(this);
            for (var i = 0; i < Card_open.length; i++) {
                if (Card_open[i].find('i').attr('class') === self.find('i').attr('class')) {
                    // Card_open.push(self);
                    self.removeClass('animated wobble');
                    self.addClass('show match animated rubberBand');
                    Card_open[i].removeClass('animated wobble');
                    Card_open[i].addClass('show match animated rubberBand');
                    console.log('match');
                    $(this).off('click');
                    //Card_open.push(self);
                    Card_open = [];
                    break;
                } else {
                    self.addClass('show open animated wobble');
                    removeProperties(self);
                    Card_open[0].on('click', showCardOnClick(Card_open[0]));
                    console.log('no match');
                }
            }
        }
        if ($('.deck').find('.match').length === 16) {
            setTimeout(function() {
                $('.deck').each(function() {
                    // $(this).find('li').hide();
                    swal({
                        title: 'Congratulations',
                        type: 'success',
                        text: 'You have won the game . Moves conceded are ' + user_moves + '. You have got ' + ratings + ' ratings Time taken is ' + hours + ' Hours ' + minutes + ' Minutes and ' + seconds + ' Seconds',
                        allowOutsideClick: false,
                        showCancelButton: true,
                        confirmButtonText: 'Play Again',
                        confirmButtonColor: '#0000FF',
                        cancelButtonText: 'Close',
                        cancelButtonColor: '#FF0000'
                    }).then(function() {
                        location.reload();
                    }, function(dismiss) {
                        console.log('Yes');
                    });

                });
            }, 300);
            Stop = 1;
            $('.timer').hide();
            $('.timer').html('0:0:0');
            $('.timer').show();
        }


    });
};

for (var i = 0; i < card.length; i++) {
    card[i].on('click', showCardOnClick(card[i]));
}

$('.restart').on('click', function() {
    location.reload();
});