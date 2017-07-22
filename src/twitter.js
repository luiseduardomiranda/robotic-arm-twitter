import { Observable } from 'rxjs';
import Stream from 'node-tweet-stream';
import _ from 'lodash';
import fs from 'fs';

const credentials = JSON.parse(fs.readFileSync(process.env.CREDENTIALS).toString());;
const stream = new Stream(credentials);

const emojiMap = {
	'\u2615': 'COFFEE',
	'coffee': 'COFFEE',
	'\ud83d\udc4f': 'CLAP'
};

const emojiRegex = /.*(\u2615|\ud83d\udc4f|coffee).*/gim;
const tweetList = [];

stream.track('PagSeguro');
stream.track('TheDevConf');
stream.track('\ud83d\udc4f');
stream.track('\u2615');
stream.track('coffee');

stream.on('tweet', (tweet) => {
	if (!tweet.id || !tweet.text.match(emojiRegex) || tweet.retweeted_status) {
		return;
	}

	const command = emojiMap[tweet.text.replace(emojiRegex, '$1').toLowerCase()];
	if (!command) {
		return;
	}

	const tweetObj = {
		id: tweet.id,
		text: `${command.toLowerCase()}.png`,
		full_text: tweet.text,
		command,
		hashtags: tweet.entities.hashtags,
		user: {
			name: tweet.user.name,
			screen_name: tweet.user.screen_name,
			profile_image: tweet.user.profile_image_url_https.replace(/_normal/, '_400x400')
		}
	};

	const searchHashTags = _.find(tweet.entities.hashtags || [], (item) => {
		return item.text.match(/PagSeguro|TheDevConf/i) != null;
	});

	if (searchHashTags) {
		tweetList.unshift(tweetObj);
	} else {
		tweetList.push(tweetObj);
	}
});

export const twitterStream = () => Observable.create(subscriber => {
	if (tweetList.length == 0) {
		subscriber.error(Observable.throw("empty list"));
	} else {
		subscriber.next(tweetList.shift());
	}
});
