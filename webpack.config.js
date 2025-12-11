const path = require('path')
const srcPath = path.join(__dirname, 'src') + path.sep
const outputPath = path.join(__dirname, 'build')
const widgetWebpack = require('materia-widget-development-kit/webpack-widget')

const rules = widgetWebpack.getDefaultRules()
const copy = widgetWebpack.getDefaultCopyList()
const entries = {
	"player": [
		path.join(srcPath, "player.html"),
		path.join(srcPath, "player.js"),
		path.join(srcPath, "player.scss"),
		path.join(srcPath, "player.template.html"),
		path.join(srcPath, "player-template-controller.js"),
	],
	"creator": [
		path.join(srcPath, "creator.html"),
		path.join(srcPath, "creator.js"),
		path.join(srcPath, "creator.scss"),
		path.join(srcPath, "player.template.html"),
		path.join(srcPath, "player-template-controller.js"),
	]
}

const babelLoaderWithPolyfillRule = {
	test: /\.js$/,
	exclude: /node_modules/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: ['@babel/preset-env']
		}
	}
}

let customRules = [
	rules.copyImages,
	rules.loadHTMLAndReplaceMateriaScripts,
	rules.loadAndPrefixCSS,
	rules.loadAndPrefixSASS,
	rules.loadAndCompileMarkdown,
	babelLoaderWithPolyfillRule
]

const customCopy = copy.concat([
	{
		from: path.join(__dirname, 'node_modules', 'jsxgraph', 'distrib', 'jsxgraphcore.js'),
		to: path.join(outputPath, 'vendor', 'jsxgraph')
	},
	{
		from: path.join(__dirname, 'node_modules', 'mathquill', 'build'),
		to: path.join(outputPath, 'vendor', 'mathquill')
	},
	{
		from: path.join(srcPath, "player.template.html"),
		to: path.join(outputPath, "player.template.html")
	},
	{
		from: path.join(__dirname, 'src','_guides','assets'),
		to: path.join(outputPath, 'guides', 'assets'),
		toType: 'dir'
	}
])

// options for the build
let options = {
	entries: entries,
	moduleRules: customRules,
	copyList: customCopy
}

const ourFinalWebpackConfig = widgetWebpack.getLegacyWidgetBuildConfig(options)

module.exports = ourFinalWebpackConfig
