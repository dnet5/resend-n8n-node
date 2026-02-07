const { src, dest } = require('gulp');

function buildNodeIcons() {
	return src('nodes/**/*.svg').pipe(dest('dist/nodes'));
}

function buildNodeJson() {
	return src('nodes/**/*.json').pipe(dest('dist/nodes'));
}

function buildCredentialIcons() {
	return src('credentials/**/*.svg').pipe(dest('dist/credentials'));
}

exports['build:icons'] = async function () {
	await Promise.all([
		new Promise((resolve, reject) => buildNodeIcons().on('end', resolve).on('error', reject)),
		new Promise((resolve, reject) => buildNodeJson().on('end', resolve).on('error', reject)),
		new Promise((resolve, reject) => buildCredentialIcons().on('end', resolve).on('error', reject)),
	]);
};
