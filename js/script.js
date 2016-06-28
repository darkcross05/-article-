function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var articles;

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    var streetStr = $("#street").val();
    var cityStr = $("#city").val();
    var address = streetStr + cityStr;
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '&key=AIzaSyAeNBN2b4bVxoPTjr7lJ4v2rL7VFSCBF1I';
    $body.append('<img class="bgimg" src="'+ streetviewUrl + '">')// para insertar html en la página

    $greeting.text('So, you want to live at ' + address + '?');

    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=d6c19a94f24a45aeb1986b59361dfcca'

    $.getJSON(nytimesUrl, function(data){
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            article = articles[i];
            images = 'https://pbs.twimg.com/profile_images/460620712567250944/aDpRY3yQ_normal.png';
            if(article.multimedia.length>0 ){ images = 'http://www.nytimes.com/' +article.multimedia[0].url }

           $nytElem.append('<li class="article">'+
              '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
              '<p>' + article.snippet + '</p>'+ '<img src="'+ images  +'">' +
          '</li>')
       }
        console.log(data);
    }).error(function(e){
        $nytHeaderElem.text("New York Times Articles Could Not Be Load");
    });

    https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=YOUR_API_KEY
    
    var wikiUrl =  'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(response){
            console.log(response);
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                 articleStr = articleList[i];
               var url = 'http://en.wikipedia.org/wiki/' + articleStr;
               $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            }
        }
    })

    return false;
};

$('#form-container').submit(loadData);
