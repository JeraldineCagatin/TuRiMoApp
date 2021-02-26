const newsRow = document.querySelector('.newsRow');

fetch('http://newsapi.org/v2/top-headlines?country=ph&apiKey=f4a2965964d9408c8fb46fd3359e8faf')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        // console.log(myJson.articles);
        var newsArticles = myJson.articles;

        for (var index = 0; index < newsArticles.length; index++) {
            let cardImage = '';
            let cardAuthor = '';
            let cardDescription = '';

            // image here
            if (newsArticles[index].urlToImage == null) {
                cardImage = 'https://www.pngitem.com/pimgs/m/287-2876158_not-available-hd-png-download.png'
            }
            else {
                cardImage = newsArticles[index].urlToImage;
            }

            // description here
            if (newsArticles[index].description != null) {
                cardDescription = newsArticles[index].description;
            }
            else if (newsArticles[index].content != null) {
                cardDescription = newsArticles[index].content;
            }
            else {
                cardDescription = 'No description found. Check the original news by click the the view here button.';
            }

            // author here
            if (newsArticles[index].author != null) {
                cardAuthor = newsArticles[index].author;
            }

            else if (newsArticles[index].source.name != null) {
                cardAuthor = newsArticles[index].source.name;
            }

            else {
                cardAuthor = "Author is not included. We're very sorry";
            }

            let publishedDate = new Date(newsArticles[index].publishedAt);

            let html = [
                `
                    <div class="card horizontal cardsResponsive">
                        <div class="card-image">
                            <img class="activator hoverable"
                                src="${cardImage}">
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <span class="card-title grey-text text-darken-4">${newsArticles[index].title}</span>
                                <p>Author: ${cardAuthor}</p>
                                <p>Published date: ${publishedDate.toLocaleString()}</p>
                            </div>
                            <div class="card-action">
                                <a href="${newsArticles[index].url}">View here</a>
                            </div>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4"><i
                                    class="material-icons right">close</i></span>
                            <p>${cardDescription}</p>
                        </div>
                    </div>
                `
            ].join('');

            let div = document.createElement('div');
            div.setAttribute('class', 'col s12 m12 l12');
            div.innerHTML = html;
            let fragment = new DocumentFragment();
            fragment.appendChild(div);
            newsRow.appendChild(fragment);

            $(window).resize(function () {
                var width = $(window).width();
                if (width <= 768) {
                    $('.cardsResponsive').removeClass('horizontal');
                }

                else {
                    $('.cardsResponsive').addClass('horizontal');
                }
            }).resize();
        }
    });
