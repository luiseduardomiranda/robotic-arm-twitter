(function(window) {
    'use strict';

    var socket;
    var $current;

    function render( tplName, data ) {
        try {
        var tpl = $( '#' + tplName )[0].innerHTML || {},
            k, rx = /{\|\|.*?\|\|}/g, tmp ;

        for( k in data ) {
            tmp = new RegExp( '{\\|\\|data\\.'+ k +'\\|\\|}', 'g' );
            tpl = tpl.replace( tmp, data[ k ] );
        }

        while ( tpl.match( rx ) ) {
            tpl = tpl.replace( rx , '');
        }

        return tpl;

        } catch ( e ) {}
    }

    function process (tweet) {
        var tpl = render('tweet', {
            profile_image: tweet.user.profile_image,
            user_name: tweet.user.name,
            screen_name: tweet.user.screen_name,
            emotion: tweet.text
        });

        ($current && $current.addClass('anim-out'));

        setTimeout(function() {
            $current = $(tpl);
            $('#tweets').html($current);
            setTimeout(function() {
                $current.addClass('anim-in');
            }, 40);
        }, 500);

    }

    window.onload = function() {
        socket = io.connect('http://localhost:8080');
        socket.on('tweet', process);
    };

}(window))
