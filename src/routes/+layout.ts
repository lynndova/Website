export const prerender = true;

export const load = ({ url }) => {
	const baseMetaTags = Object.freeze({
		title: 'lynndova',
		titleTemplate: '%s | lynndova',
		description: 'I make music. On the Internet.',
		openGraph: {
			type: 'website',
			url: new URL(url.pathname, url.origin).href,
			locale: 'en_CA',
			images: [
				{
					url: 'https://lynndova.com/img/lynndova.png',
					alt: 'lynndova icon'
				}
			],
			siteName: 'lynndova'
		},
		twitter: {
			creator: '@worldwidepixel',
			site: '@worldwidepixel',
			cardType: 'summary'
		}
	});

	return {
		baseMetaTags
	};
};
