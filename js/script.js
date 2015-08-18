
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load GOOGLE streetview img
    var streets = $('#street').val();
    var cities = $('#city').val();
    var address = streets + ', ' + cities;
    $greeting.text('You want to live at ' + address + ' ?');

    var street_img_url = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append( '<img class="bgimg" src=" ' + street_img_url + '">');

    

    // NEW YORK TIMES API CODE
    // API KEY: acc9894f4d20673739c998677ab88fe4:8:72696168

    var nytimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + address + '&sort=newest&api-key=acc9894f4d20673739c998677ab88fe4:8:72696168';

    $.getJSON(nytimesURL, function (data) {
        $nytHeaderElem.text('New York Times Articles about' + " " + address);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append(
                '<li class="articles">' +
                '<a href="' + article.web_url + '">' +
                article.headline.main +
                '</a>' + 
                '<p>' + article.snippet + '</p>' +
                '</li>');
                    };
        
            }).error(function(e){
                $nytHeaderElem.text('Cannot find any New York Times articles');
            });


            



            // wikipedia API
        var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cities + '&callback=wikiCallback&format=json';
            


            var delay =  setTimeout(function() {
                $wikiElem.text('Error, page could not load in time')
            }, 8000);

            $.ajax( {
                url: wikiURL,
                dataType: 'jsonp',
                //jsonp callback
                success: function(response) {
                    var articlelst = response[1];
                for (var i = 0; i < articlelst.length; i++) {
                    var articlestr = articlelst[i];
                    var url = 'https://en.wikipedia.org/wiki/' + articlestr;
					$wikiElem.append(
					'<li><a href="' + url + '">' +
					articlestr +
					'</a></li>');
                    };
                    clearTimeout(delay);
       
                }
                });

            return false;
                };
        
            

$('#form-container').submit(loadData);
// loadData();




