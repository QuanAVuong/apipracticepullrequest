$('form').submit(function(event) {
    event.preventDefault();
    // document.getElementsByTagName('ul')[0].innerHTML("");
    $("ul").text("");
    var input = $(this).serializeArray()[0].value;
    input = input.split(" ").join("+");

    $.ajax({
        url: "https://restcountries.eu/rest/v1/name/" + input, // Request Country
        success: function(data) {
            console.log("data: ", data);
            var lang = data[0].languages[0]; // Get country's language
            console.log('lang', lang);
                // var gifURL = data.data[0].images.original.url
                // var giphy = document.createElement('img')
                // giphy.setAttribute('src', gifURL)
                // $('body').append(giphy)

            $.ajax({
                url: "https://restcountries.eu/rest/v1/lang/" + lang, // Request country(ies) speaking lang
                success: function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var country = document.createElement('li');
                        country.innerHTML = data[i].name;
                        $('ul').append(country);
                    }
                },
                error: function(err) {
                  console.log("something's wrong");
                }
            })
        }
    })
})
