with (require('./resumate')) {

	show(

		hello(my('name').is('Iain Nash')),

		say(my('favorite server').is('nodejs')),

		i.skills(),

		i.skills(enumerate({node:9, linux:7, css:8, html:9, js:9})),

		i.skills('[_]'),

		my('drive').is('learning'),

		my((node > 1000000) + ' nodejitsu ').is('exciting'),

		bye('thanks for reading')

	).using(web); // or console or web

	open(my().website);
	open(my().resume);

}