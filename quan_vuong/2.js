/* global $ */

$("h1").after("<h2>RijksStudio/Museum API</h2>");

$('form').submit(function(event) {
    event.preventDefault();
    $("ul").text("");
    
    // CONTENT PAGES
    // GET /api/pages/[culture]/[slug]
    // https://www.rijksmuseum.nl/api/pages/nl/ontdek-de-collectie/overzicht/rembrandt-harmensz-van-rijn?key=fakekey&format=json
    // https://www.rijksmuseum.nl/api/pages/en/rijksstudio/artists/vincent-van-gogh?key=&format=json
    
    var root = "https://www.rijksmuseum.nl";
    var contentPages = "/api/pages";
    var culture = "/en";
    var slug = "/rijksstudio/artists/";
    
    var input = $(this).serializeArray()[0].value;
    input = input.split(" ").join("-");
    console.log(input);
    
    var key = "?key=FKQYAZ6E"
    var format = "&format=json";
   
    $.ajax({ // content pages request
        url: root + contentPages + culture + slug + input + key + format,
        success: function(data) {
            var artObjNumArr = data.contentPage.artObjectSet;
            console.log("artObjectSet: ", artObjNumArr);
            
            // COLLECTION IMAGES
            // GET https://rijksmuseum.nl/api/nl/collection/[object-number]/tiles?key=FKQYAZ6E&format=json
            // https://rijksmuseum.nl/api/nl/collection/SK-C-5/tiles?key=FKQYAZ6E&format=json
            // https://www.rijksmuseum.nl/api/nl/collection/sk-c-5?key=fakekey&format=json
            // need WWW. WHY ?

            var colImgRoot =  "https://www.rijksmuseum.nl/api/en/collection/";
            // var tiles = "/tiles";
            
            for (var i = 0; i < artObjNumArr.length; i++) {
                $.ajax({ // collection image request
                    url: colImgRoot + artObjNumArr[i] + key + format,
                    success: function(data) {
                        var colImgUrl = data.artObject.webImage.url
                        console.log("webImage url: ", colImgUrl);
                        var colImgLi = document.createElement('li');
                        colImgLi.innerHTML = "<img src='" + colImgUrl + "' alt='testing'></img>";
                        $("ul").append(colImgLi);
                        
                    }
                })
            }
        }
    })
})
