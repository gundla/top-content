(function () {

    var YYY = window.YYY || {};
    var topContent = {};

    topContent.modal = {};
    topContent.modal.show = function(){
        $('.yyy-modal-wrapper').addClass('yyy-show');
        topContent.getStories();
    }
    topContent.modal.hide = function(){
        $('.yyy-modal-wrapper').removeClass('yyy-show');
    }
    topContent.modal.toggle = function(){
        var el = $('.yyy-modal-wrapper');
        if(el.hasClass('yyy-show')){
            topContent.modal.hide();
        }else{
            topContent.modal.show();
        }
    }

    topContent.getData = function(callback){
        var dataUrl = chrome.extension.getURL('js/data.json');
        $.getJSON(dataUrl, function(response){
            callback(response.results);
        });
    }
    topContent.getStories = function(){
        topContent.getData(function(stories){
            _.each(stories, function(story){
                story.trends = _.map(story.trend, function(dataPoint){
                    return Number(dataPoint.ctr);
                });
                var lastTrend = _.first(_.last(story.trends, 2))
                    , currentTrend = _.last(story.trends);

                if(lastTrend == currentTrend){
                    story.direction = 'same';
                }else if(lastTrend > currentTrend){
                    story.direction = 'down';
                }else{
                    story.direction = 'up';
                }

                console.log(lastTrend, currentTrend, story.direction)
            })
            $('.yyy-modal .yyy-stories').html(YYY.Templates.stories({stories:stories}));
            $('.yyy-stories .yyy-trend-line')
                .sparkline('html', {width: '50px', height: '15px', type: 'bar'})
                .css('opacity', '1');
        });
    }

    topContent.init = function () {
        /**
         * Adding the necessary DOM
         */
        $('#yog-content > .yom-remote')
            .css('position', 'relative')
            .before(YYY.Templates.mainHandle())
            .append(YYY.Templates.modal())
            .append(YYY.Templates.overlay());

        /**
         * Adding the necessary DOM event handlers
         */
        $('.yyy-main-handle').click(function (e){
                topContent.modal.toggle();
        });
        $('.yyy-modal-wrapper .yyy-close').click(function(e){
            topContent.modal.hide();
        });
    }

    window.YYY = YYY;
    $(document).ready(function () {
        topContent.init();
    });
})()