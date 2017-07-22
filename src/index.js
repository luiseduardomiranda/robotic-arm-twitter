import { twitterStream } from './twitter';
import { sendCommand } from './arm';
import { showTweet } from './server';
import { Observable } from 'rxjs';

twitterStream()
    .take(1)
    .flatMap(tweet => {
        console.info(tweet);

        showTweet(tweet);
        return sendCommand(tweet.command)
    })
    .repeat()
    .retryWhen(errors => {
        return errors
            .do(e => console.error(e.error))
            .delayWhen(val => Observable.timer(1000));
    })
    .subscribe();