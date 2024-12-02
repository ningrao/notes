=====================================================
standards
https://www.w3.org/WebPlatform/WG/PubStatus
https://w3c.github.io/html/
https://w3c.github.io/ServiceWorker/
jsdoc:
http://usejsdoc.org
=====================================================
W3C spec
 - levels:
 1st) WD(working draft): published for public review; maybe have significant modification later;
 2nd) CR(candidate recommendation): ensure its implementability among development community; significant features are mostly decided;
 3rd) PR(proposed recommendation): submitted to w3c advisory council for final approval; last call for feedback;
 4th) REC(recommendation): ready for deployment to public;
 5th) RT(retired)
 - standards may define levels of conformance for developer to follow; 
 - Normative: details implementors should conform to;
 - Informative: examples and explanations;
 
=====================================================
## OWASP: Open Web App Security Project
https://www.owasp.org

### optimization
- server side
- network
  + CDN
  + cache strategy
  + compress
  + mutiple domains to achieve parallel downloadings (two for each domain per http 1.1); however too much cause dns lookup penalty.
  + cookie free domain for assets
  + keep-alive
  + reduce redirects

- resources
  + combine
  + minimize
    - image
      + static gif to palette PNG (PNG8)
      + optimize images with tool
      + no scaling images
  + reduce web fonts
  + `link` in header to ensure progressive rendering (some browsers intend to avoid reflow when find link in body, they don't render before loading done)

  + script at bottom (in case it prevents parallel downloading)

  + inline script and css boost responsiveness but lose caching.

  + iPhone only cache files less than 25k

  + preload assets for next page

  + postload assets unrelated for initial rendering.
  
- js
  + framework
- css

## HOL(Head of Line) blocking: in FIFO sequence processing, the first in the task line blocks those after it;
 - input buffered network switches; 
 - out-of-order delivery;

## test pyramid: ratio of amount of tests between the three types(from top to bottom):
	end-to-end	->	intergration	-> unit

## header Content-Security-Policy(CSP): specify valid resources uri;

`Content-Security-Policy: frame-src https://example.com/`
script-src/frame-src/object-src/img-src/base-uri/

## HTTP Strict Transport Security(HSTS)
`Strict-Transport-Security`, https only

## normalized table:
 1st) primary key; atomic value; no repeating columns(value1, value2, value3...);
 2nd) non-key columns depends on primary key;
 3rd) the dependency is non-transitive(doesn't rely on a third column in the middle: personId->weight->isOverweight)

## higher-order-sth: a function which accepts some 'sth' as parameters and returns a new 'sth'; 
------------------------------------------
architecture & design
------------------------------------------
## angular1(framework)
 - html-centric;
 - two-way data-binding;
 - dependency injecting;
 - custom element(directive);
 - builtin unit testing;
 - dirty-check for model change detection;
 - cons:
 	.) dirty-check is slow;
 	.) may have cascading update, when one change triggers other changes, watchers and digest cycle may run multiple times for dirty-check;

## module can not be registered after bootstraped.

## define module

## define providers: store in `providerCache`;

## bootstrap
  `jQuery.ready() -> angularInit -> bootstrap -> doBootstrap -> createInjector (from module in 'ng-app') -> loadModules -> runInvokeQueue (exec providers)`

## loadModules loads dependency modules first, which are stored in 'requires' field.

## modules has its own invokeQueue, which stores provider()/factory()/service()/... callback, which are called in `loadModules`

## provider.$get() returns an instance, stored in instanceCache. All services of all modules are stored in a single cache, so duplicate names will override others.

## injector.invoke() parse arguments (injectionArgs) and retrieve them (getService) from cache and pass to invoked functin.

## angular2(framework)
 - mobile oriented
 - native support(NativeScript)
 - component driven(substitutes directive&controller); 
 - Hierarchical Dependency Injection
 - change detection 
 	 .) zone.js
	 .) unidirectional tree based 
      data flow from parent to child only.
	 .) observable&immutable
 - route load on-demand;
 - independent on runtime environment;
 - i18n support;
 - data from top to bottom, event bubbles up;
 - server side rendering(Universal Angular 2);

## react(library for view)
 - js-centric(jsx);
 	.) view is coupled with logic;
	.) not intuitive;
	.) transpile;
	.) non-standard;
 - functional components(stateless, immutable data/object, no side-effects, same input same output) -- hot reloading;
 - virtual dom abstraction(only data for constructing the dom);
 	Component(stateful)	------>	Element(stateless/immutable)	-------> HTML DOM
						(diff)
 - pros:
 	.) to build view in programming way;
	.) model observable instead of dirty-check(only for dom);
	.) ecosystem is mature;
	.) virtual-dom can be rendered in server;
	.) plugin for two-way binding/promises;
 - cons: 
 	.) plugins are required for other tasks, incurs inconsistency; 
 	.) root state changes cause child components re-render, unless 'shouldComponentUpdate' is correctly implemented; 
	.) component scoped style in js or manipluate class name;
	.) virtual-dom is memory consuming;
- hooks
  reusability, readability, and testability

## react native(react for mobile)

## flux(architecture): redux, facebook, reflux, alt...;
 - unidirectional data flow: view doesn't modify model;
 - bypassing data flowing through components hierarchy, managing states outside the root component;
 ```
 action -> dispatcher -> store -> view
 	|		(user interaction)		|
	<--------------------------------
 ```
 - cons: 
 	.) hard to scale;

## vue(library for view)
 - html-centric;
 - functional components;
 - virtual dom abstraction(snabbdom);
 - two-way;
 - pros:
 	.) components dependencies are tracked(parsing text of function for property setting and getting);
	.) component scoped css in a single file or css module or preprocessor(name prefix);
 - cons: 
 	.) 

## react vs vue
- react
DOM diff
- vue
data tracking


## web component(standard for module):
 - custom element
  + life cycle events: connected/disconnected/attributeChanged/adopted;
 - shadow dom
  + js is not encapsulated, but `querySelector` and `getElementById` won't traverse into, start from `shadowRoot` instead.
  + `::shadow p` control from outside
    - `body /deep/ p` any root
  + `::host` control container from inside
  + event target is hoisted to its host
  + `document.body.dir` takes effect
  + css outside taking effects.
    - inheritable (color/...)
    - custom proporty (variable)
  
 - html import
  obsolete, superceded by html module <https://github.com/WICG/webcomponents/blob/gh-pages/proposals/html-modules-proposal.md>
  + css is **not** applied
  + js is executed and encapsulated
 - template & slot
 - pros:
 	.) native
	.) open & portable
	.) encapsulate js/style;

## polymer(library for web component):

## polymer Toolbox(archetecture): app-layout + app-route + app-localize-behavior + app-storage + app-localize-behavior
 - features are encapsulated and represented as custom element;

## ember(framework)
 - full feature;
 - apply handlebar template;	 
 - requires library(jquery) for dom manipulating;
 - setter for detecting model changes;
 - two-way
 - cons: 
 	.) opinionated
	.) heavy

## backbone(framework)
 - pros: 
 	.) light
 - cons: 
 	.) no template
	.) refreshing model&view is achieved manually; 

## knockout
 - mvvm;
 - observables;
 - cons: 
 	.) no component;

## underscore(library for utility)
 - template
	 

## Progressive Web App(Progressive enhancement, Responsive, Connectivity independent, App-like, Fresh, Safe, Discoverable, Re-engageable, Installable, Linkable)

## isomorphic/universal web app: Client+Server MVC, share codes between client and server;
 - isomorphic.net;
 - frameworks/library: Meteor, Rendr... 
 - server renders once, then leave for client side;
 - application logic; 
 - abstraction:
 	.) Route uniforms 'window.location' with 'request/response'(director...);
	.) Data from model or uri(superAgent...);
	.) HTML got without browser support;
	.) build separate codes for client;

## foundation: equivalent to bootstrap;

## Cordova is base of PhoneGap(which is adapted by Adobe);

------------------------------------------
tools & tech
------------------------------------------
## Esprima is a parser/metaprogramming tool for javascript;

## PhantomJS is a webkit browser without UI;
 - phantom.require can resolve phantom-buitin module, node modules, and absolute path files;
 - overcome ssl error/bugs: --ignore-ssl-errors=true
 - it executes in browser environment with its own modules available.
 - for its own module, file path is local file system style, whereas for browser's native, prefix 'file:///' is required.
 - initial scripts and injected (`injectJs`)
    * `global.require` shadows `require`;
    * `this` and `global` both are `window`
 - in required script
    * `global.require` can not shadow `require`;
    * `this` is an empty object, `global` is window.
 - caches file even from local system (add query to overcome).

## casperjs

The cli calls engine with its implementation as entry. So Casper is preloaded in the engine running environment, then it loads the target js file in the running environment.

 - cli has several versions targeted different OS and languages (python, node, exe).

 - the `casper.test` and `test` passed in `casper.test.begin` callback are the same one instance of `Tester` being pre-created.

 - if args exists in PhantomJS, then pass to it; or pass to itself;
 - waitFor() is a spinning, call callback repeatedly;
 - get output from client by message;
 - this.getElementAttribute return '' if no attribute;
 - casperjs test --verbose --log-level=debug e2e/test.js --dir=from_source
  --dir custom arguments
 - when assert fails, function is aborted in this `then`.
 - error message shows what this assert expect.
 - entry point is bootstrap.js
 - phantom doesn't pick 'global.require' for 'require'.


## weex is a platform for mobile app(web can be converted to native);

## coffeescript is language sugar;

## hyperscript is a tool to create doms in js;

## bundler:
 - webpack(https://webpack.github.io/docs)
	pros:
	.) amd & cjs & global;
 	.) hot module replacement;
	.) code splitting;
	cons:
	.) only support js files natively, other format requres loaders;
	.) config too much;

 - browserify
 	.) set js alternative version for browser in package.json
	pros:
	.) json is supported;
	.) no config and plugin is needed when conforming to convention; 
	cons:
	.) only support commonJS module;

## bower: download js modules;

## memoization: cache function result for recalling;

## ORM is object-relatinal mapping, database tool;

## protractor: e2e tester for angular, based on selenium and jasmine; 

## selenium for e2e; karma for unit;

## grunt-cli(global) is a tool which invoke grunt(local) in current directory;
 - task is a function defined directly(registerTask/registerMultiTask) or from a plugin();
 - returns false to fail the task;
 - config is queried in json defined in initConfig with the same name;
 - extra arguments can be passed, seperated with colon;
 - arbitrary properties defined in initConfig can be accessed in template or by 'grunt.config.get()';
 - load plugin tasks with blob by plugin 'load-grunt-tasks';
grunt.initConfig({
	task1:{
		tar1:[1,2]
		,tar2:{a:1, b:2}
	}
});
grunt.registerMultiTask('task1', 'this is task1', function(arg1, arg2){
	this.name	-> 'task1'
	this.target	-> 'tar1'
	this.data	-> [1,2]
	arg1	-> 'a1'
	arg2	-> 'a2'
});
> grunt task1:tar1:a1:a2

## babel
 - in '.babelrc', 'env' is merged shallowly.
 - '.babelrc' are merged through hierarchy until package root.
  **if file is in a nested package, the config files are not read**
 - only transform syntax, new globals(Promise) and new native methods need polyfill;
 - preset is a collection of sharable configs for an array of plugins; itself has to be installed;
 - 'env' preset can load correct plugins according to the specified target browsers;
 - babel-register: overwrite 'require' to compile nodejs files on the fly;
 - babel-node: put in babel-polyfill and call babel-register internally;
 - doesn't bundle, so es6/cjs import/export let it is. (es6 module syntax can be converted to other)
 - 'env/es' should be placed before `stage-*`;
 - 'ignore' is normalized into 'array', env is deep merged. **can not override**
 - babel-plugin-dynamic-import-node: return require() in a promise
 - babel-plugin-dynamic-import-webpack: require.ensure()
 - babel parser (babylon) has its own plugins for syntax
  * .babelrc: parserOpts
  * plugin: manipulateOptions
 - transform accept a context with field 'caller', which specify special environment properties
  * supportsStaticESM: if this is true, converts to esm module if not specified in config ('module: auto')
 * babel-polyfill vs babel-runtime
  * babel-polyfill shim builtin objects globally
  * babel-runtime work once
 * babel7 config file search strategy
  - find project-wide config file named 'babel.config.js' (root path and searching direction can be specified, 'root', 'rootMode', 'configFile')
  - find file relative configuration named '.babelrc', this starts from the file folder upwards until folder where 'package.json' is found
    **'root/cwd' should in the path**
  - merge '.babelrc' on top of 'babel.config.js'
 

## json5
 - comment
 - no quotes(valid identifier), single quote;

## tapable stores plugins in `_plugins`

# webpack
 - WebpackOptionsDefaulter.js apply default options. 
 - bail: prevent from running
 - entry:
  * array: single entry named 'main'
  * object: multiple
 - all processings are subscribed as event handlers/plugins. (default actions are set in 'WebpackOptionsApply.js')
 - v2 support es6 module natively;
 - target environment:	target: 'node'/'web'(default)/...
 - `@import`ed css file is not `test`ed as a module, it's part of host file.
 - all matched tests are executed.
 - return array of config to output several bundling for once;
 - use 'define' plugin to set global variable from file for conditional build along with uglify;
 	..) value can be a installed module name;
 - css imported is inserted in to html as `<style>`; or employ 'extract-text-webpack-plugin' to extract them into a css file;
 - './' required in 'entry' if relative
 - '-p' flag only set NODE_ENV for compiled code; set this in command line preceding 'webpack' for tool itself;
 - special chars in file names may cause problems;
 - Rule.use == Rule.loaders
 - output.path vs output.publicPath:
	*- path is where files reside(imperative to be absolute), publicPath is where browser access those files(routing done by server);
	*- url composed is resolved with publicPath;
	*- webpack-dev-server has to know how to route, '/' is assumed by default;
	*- publicPath should has trailing '/';
 - webpack-dev-middleware/[webpack-hot-middleware] injects webpack-dev-server into connect-app;
 - loaders dependency (adopt 'enforce' to ensure order);
	* 'loader!dependLoader'
	* [loader, dependLoader]
 - css-loader: css -> js; (has to be used with other plugins: extract(file)/style(tag))
	 - css-loader/locals: only return module name mapping without file emitting;
   - if 'modules' not turned on, name mapping is not emitted, since needless.
 - style-loader: insert <style> into html which includes this js module; **don't work in ssr**
 - url-loader: embed image data in url(if size larger than 'limit' when which is set, file-loader is applied);
 - file-loader: copy file and adjust url; 'emitFile=false' only return path(already done in client built in isomorphic app);
 - html-loader: parse attr and minify...;
 - extract-loader: pass content as string to next loader;
 - bootstrap logic exist in each entry;
 - manifest code can change each build;
 - CommonsChunkPlugin extract codes, if duplicate then filter;
 	.) the chunks collection is parsed and modified by a definition once; 
		.) the latter one work on what is left by the previous one;
		.) the current chunk is the only entry (contains bootstrap);
 	.) chunks: from where to extract
	.) minChunks:
		.) number: presence in chunks; (Infinity	-- only populate bootstrap logic;)
		.) function: custom criteria;
		.) default: 
 	.) array: names or more instances;
	.) bootstrap logic is placed in the last chunk;
	.) if nothing left, this common chuck is dropped;
	.) if entry has nothing left, only thunk exist;
	.) extract all third-party libraries: minChunk:function(module, count){return module.resource && module.context.indexOf('node_modules')>-1;}
	.) 'async': lazy load;
 - AggressiveSplittingPlugin/AggressiveMergingPlugin: divide/merge chunks (?not suitable for cache, only http2);
 - ProvidePlugin: load module corresponding to variable
 - DefinePlugin:define global constants;
 	.) accepts function;
	.) if string, quotes is mandatory (JSON.stringify): {'process.env.name':'"str"'}
 - 'eslint-loader' options is which that will be passed to 'CLIEngine', general config is still required if needed;
 - 'hash' is a random number in each compile; 'chunkhash' is calculated from file; 
 - require('webpack-merge')
 	.) smart:  to merge loader options against 'test' and other fields which are all equal;
	.) strategy/smartStrategy: key rules;
	.) merge({customizeArray, customizeObject}); customizing;
 - on-demand loading: import('');
 - dynamic loading: require(variable); import doesn't work;
 - libaryTarget doesn't support es6;
 - "babel-plugin-" ("babel-plugin-transform-object-rest-spread") can be omited in config;
 - es6 exports that are required in commonjs are wrapped in an object, the default one is with key name 'default';
 - `watch` is for cmd; (devServer watch definitely.)
 - webpack-dev-server:
	.) compiles file in memory;
 	.) allow host:	'--host 0.0.0.0' + 'disableHostCheck:true';
	.) better set publicPath(&path) explicitly in development;
	.) if none in memory, physical folder is checked then;
	.) proxy appends matched path to target;
	.) take precedence to historyApiFallback rewrites;
	.) logLevel:debug in each route;
	.) blob match rule;
  .) its client works with `webpack/hot/dev-server`
  .) `webpack/hot/dev-server` is added by cli but not Server, call server.addDevServerEntrypoints(configWebpack, optionsServer) manually
 - lazy load in webpackv1, require.ensure([], (require)=>{}, outputPath)
 - `target` controls which main field to pick
 - 
 externals:{
	react: {
		root: 'React',				// module.exports=window.React
		commonjs2: 'react',			// module.exports=require('react')
		commonjs: 'react',
		amd: 'react'
	},
 }
 - output.library & libraryTarget
 * `webpack --json > file.json` emits stats content
 * compiler.run(function(err, stats){ stats.toJson()});
 * tree-shaking
  - es6 module (don't convert to commonjs by loader)
  - installed package is controlled by its own package.json
  - declare `sideEffects` explicitly in `package.json` to specify files not being shaked. (false indicates none.)
    - only affect this file, imported file if not used will be removed.
    - if only a portion is referenced, codes not referenced by exports will be removed.
    ```
    sideEffects: ['file1', file2, 'abc.css']

    file1:
    import 'abc.css'

    file2:
    [wrong]
    export * from file1
    [correct]
    import file1

    entry:
    import file2
    ```
  * optimization option
    - development, 'namedModules' is turned on by default, then 'moduleIds' is 'named'. module id is set to relative path (related to context);
    - production, 'occurrenceOrder' is turned on by default, then 'moduleIds' is 'size'. module id is set to numeric index of occurence;

- watching
  + restart watching after each HMR compilation from newly added dependencies (file,folder/context)
  + any one file changed, all files are processed to compare its timestamp to decide whether to update
 
## plugins:

 	* an object, with a method named 'apply' being called with `compiler`;

  * Function is a builtin Object of this type.

  * can be registered in an event by `Tapable.plugin(event, Plugin)` or executed by `Tapable.apply(Plugin)`.


 - html-webpack-plugin: inject assets in created/existing html entry file;
 - extract-text-webpack-plugin: save css to files;(extract method exist both on instance and class);
 - DllPlugin & DllReferencePlugin should have the same context
  * required global path is relative to context
  * when replace dll, fs structure should keep consistent.

## outputed bundle format (self-executing bootstrap function with module list):

    `(function bootstrap(modules){})([module, module, ...]);`

## 'WebpackOptionsApply.js' initialization

## Compiler

  * resolvers: instances of `enhanced-resolver`

  * compile(): runner

  * emitAssets()

  * input filesystem are difined in enhanced-resolve, with wrapping of reading methods of node fs.

  * output filesystem are difined by webpack in the same way, with only writing APIs from input fs;

```
  build modules  ->  add chunks  -> (optimize-tree) ->  create assests;
```

## enhanced-resolver

  `resolve (check cache) -> new-resolve -> parsed-resolve`

  * pass resolved path with query as 'resource' to module via compilation.

  * 'fs.stat' to check existence.

  * `ModulesInHierachicDirectoriesPlugin` for modules in 'node_modules';

  * if no error and no result, resolve again, in 'onResolve'

  * `JoinRequestPlugin` append `request` to `path` and clear 'request'.
  ```
{
  path: directory
  request: file name
}
  ```
  * `FileExistsPlugin` is the last resort to check specific file.

  * if a directory, extensions and index file names are tried.

  * `Resolver.parse` determine kinds
  ```
{
  module: 'abc' --> no './'
  directory: '....abc/'  --> ends with [back]slash
  file: not used, true if other two are false
}
  ```

  * async.parallel returns an array of all results

  *
	resolver.plugin(this.source, function(request, callback) {
		if(request.directory) return callback(); --> give up processing, pass to other plugin being subscribed to this event.
		var obj = Object.assign({}, request);
		delete obj.directory;
		resolver.doResolve(target, obj, null, callback); --> next step/event (target) registered when apply this plugin (ResolverFactory)
	});

  * ModuleKindPlugin/FileKindPlugin make sure its module/file to process next step.

  * NextPlugin relay to next step.

  * JoinRequestPlugin is the last resort, which
    1. join 'request' to 'path'
    2. join 'request' to 'relativePath'
    3. clear 'request'


## Compilation 

  * Compilation (build in 'make' event, sources are available in this callback)

  * each module acquiration has a corresponding dependency plugin, which takes a proper template registered (`plugin('compilation')`) in `compilation.dependencyTemplates`;

  * entryModule is exported in bootstrap

  * a chunk is corresonding to a output bundle.
  
  * the first chunk of the first entrypoint has bootstrap codes.

  * if a chunk has entrypoints, it's initial, which is the 'entry' option in webpack config file.

  * addChunk() to add new chunk.
 ??? loader returns array of [[id, source]] ?
 
  * build in 'make' event, sources are available in this callback

  * chunks(processDependenciesBlocksForChunk) and assets are created in 'seal'.

  * mainTemplate: asset template with bootstrap logics.

  * chunkTemplate: asset template without bootstrap logics.

    > `addEntry (SingleEntryDependency/MultiEntryDependency) -> _addModuleChain/addModuleDependencies() -> buildModule() -> NormalModule.build()`

  * dependencyFactories: handlers for dependencies(resolve path and loaders (loaders in path along with rules));
    + add by 'entry' alike plugins.
    + map of Dependency constructor to the next two Factory instance.
    + NormalModuleFactory.js
      - resolve module path & map loaders
        + this.ruleSet: loaders(config.modules) definitions
      - then create new NormalModule object
    + ContextModuleFactory.js
    + the two instances are created for each compilation in newCompilationParams

  * _addModuleChain: load module and dependencies.
  
  * createModuleAssets: copy modules assets to compilation.

  * createChunkAssets: create assets from template.

    > modules are rendered in Template.renderChunkModules();

## NormalModule.js: Module object, method 'build' executes loaders, then parse ast.

  * _source: file name and content;

  * derive from Module <- DependenciesBlock

  * buildInfo.fileDependencies contains files which this module come from. they are loaded by readResource instead of pitch.

## parser.js parse **javascript** ast; (if file is not javascript, adopt loader to convert to commonjs module with content as string)

  * this.state.current is the module;

  * add variables;

  * add dependencies;

  * each code of line can apply an event;

## loaders contains two types: pitch & normal. in first run, executes each pitch from low index up, until one returns module content (non-undefined), then execute normal loaders with the content from there down (not including itself). others are ignored.
 ```
loader         loader         loader         
pitch  ->      pitch      ->   pitch 
                ↓ (return non-undefined)    -> readResource
             (load file)
normal <-      normal   <-    normal
 ```

  * the request which loader receives is the path with its own truncated (what is left is other loaders and file path).

  * loader is executed on 'loaderContext', which is created in NormalModule.createLoaderContext();

    + readResource: reading file method.

    + exec: execute read module text via module._compile();

  * content is got from pitch, if no loader or no pitch loader or pitch loader return nothing,  `readResource` is called.
    
    + both string and Buffer(raw) are allowed.
    
    + if loader receives Buffer, export field 'raw' as undefined.

### context loader: for require('aff'+abc);

## LoaderRunner.js

  * processResource: call `readResource` to read target content

  * loadLoader: read loader content

### prefixes: don't apply loaders in options

  * `!!` - normal loaders 
  * `!` - pre loaders 
  * `-!` - post loaders 

## 'normal-module-loader' is triggered before build in 'NormalModule'.

## styleloader.pitch returns rest loaders chain in require as a module. later they are be parsed as dependencies;
  `require('cssloader....')`

## extract-text-webpack-plugin

  1. 'fallback' loaders are invoked at first to compile into module;

  2. after compilation, in 'optimize-tree' rebuild is invoked;

  3. when rebuild, in pitch loader of child compiler. 

    * in 'normal-module-loader', loaderContext[NS] is flagged. which is a function. turned off in the same event in child compiler.

      + check 'allChunk' and module[`NS/extract`].

      + store extracted content built from child-compiler.

    * in loader pitch: module[`NS`] (contains extracted content) is set to indicate that this module needs to be extracted.

    * in 'optimize-tree: 

      + module[`NS`] is checked if this module needs to be extracted.

      + if true,  additionally to check if its containing chunk is initial/entry or orphan or options.allChunk (including descending chunks) is set; then set module[`NS/extract`]

    * if true and not extracted, rebuild is invoked (_source is cleared in module.rebuild()).

    * in loader pitch, it checks module[`NS`] for whether to invoke a child compiler to build with the loaders after 'callback' and then file is executed and result is moved in module[NS]. (loaderIndex is also moved to the last callbacks; if options.remove is set, data is returned, then normal loaders will be executed from there down, or pitch goes up)

    * in rebuildModule callback, "additional-assets" handler is registered to retrieve result in module[NS] into assets. 
                  


## postcss


------------------------------------------
general
------------------------------------------
## what changes model:
 - event
 - xhr
 - timer

## immutable object makes diff easier by replace comparing object content with comparing object address;
 - if a field is changed, a new object is returned;

## bail: return 'money' as security or will fail.

## HTML5 differences from HTML4 
https://www.w3.org/TR/2010/WD-html5-diff-20101019/#changes-2010-06-24

## module and dependency:
 - AMD(async): requirejs
```
	define([modB], function(){
		return {};
	});
```

 - CommonJS 2(sync): nodejs
```
	let b=require('modB');

	module.exports={};



	function require(/* ... */) {
	  const module = { exports: {} };
	  ((module, exports) => {
		// Module code here. In this example, define a function.
		function someFunc() {}
		exports = someFunc;
		// At this point, exports is no longer a shortcut to module.exports, and
		// this module will still export an empty default object.
		module.exports = someFunc;
		// At this point, the module will now export someFunc, instead of the
		// default object.
	  })(module, module.exports);
	  return module.exports;
	}
```

 	.) an empty object is assigned at parse time; overridden at runtime by assigning to 'module.exports';
  .) for both `import` types work, append `exports.default = module.exports`
    import * as mod from 'mod';  -> mod = require('mod');
    > babel
      - primitive type `{default: module.exports}`
      - others, copy properties to a new object and return
    import mod from 'mod';  -> mod = require('mod').default;
    > babel
      `{default: module.exports}`
    > babel can add default automatically `{default: module.exports}`

 - CommonJS (sync): exports is an object predefined (which can not be changed as cjs2), output can only be appended to it;
```
Invalid:
	exports={};
```

 - es6:
 	.) an empty object is assigned at parse time; values are added at runtime by 'export';

 - UMD(universal module defination: mixed of the above two with global variable);
```
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define("library", [], factory);
  else if(typeof exports === 'object')
    exports["library"] = factory();
  else
    root["library"] = factory();
})(this, function() {
return (function(modules) {
 ...
 ...
```

## requirejs circular dependency resolution:
 - call require() in define(); (although it's empty, it is mandatory to add it in the dependency array as well)
 - apply CommonJS wrapper(no dependency array; access refed module property after this returns);

## in some browser, reload occurs when back from new pages opened by ways of browser, such as "open" or 'a'.

- transition will not work if that property changed has no initial value;

- setCustomValidity('') can't remove the builtin errors;

## when position:absolute, margin-top is respective to height in some browser;

## rt(ruby text), rp(ruby parenthesis)

## append codes to window created by 'window.open()'; 
## rotate3d(x,y,z,d):
(x,y,z) is a point in 3d space, which combines with (0, 0, 0) as a line to define the rotate axis;

## origin is related to its original location before any tranforming applied;

## if duration between setting start css  and end is too short, transition may have no effect;

## transitionend fires for each property;

## to remove inline style, set an invalid value;

## http 1.0 defines authorization header format as:
Authorization: <type> <credentials>
 - 'Bearer' type belongs to 'OAuth 2.0'; 

## nginx can handle TLS(Transport layer security);

## SSE: Server Send Event:
 - unidirectional
 - better set 'Cache-Control: no-cache';
 - MIME: text/event-stream

## WebSocket:
 - bidirectional;

## WebWorker:
 - 'WorkerGlobalScope' is the counterpart of 'window' in pages;
 - no sync issue, since data passed are copied;
 - importScript(path) to use external script;
 - can't load from other origin, even with CORS header set(module worker is an exception); 
 - alert counterpart is Notification;

## ServiceWorker(special webworker):
 - a proxy to intercept requests, scope is:
 	.) pages resides in the same directory(or under) of the worker scirpt file;
	.) whatever requests those pages triggers(even another origin);
	exceptions:
	.) iframe & <object>
	.) service worker update
	.) requests in service worker;
 - return from 'caches' or result of a new request or whatever artifacts;
 - https only(importScript to get codes from wherever place);
 - installed worker: navigator.serviceWorker.controller
 - byte compare the script file in background to upgrade the worker; (new version takes effect only when all controlled pages in all tabs are closed; except .replace() is called in install);
 - bypass: shift+reload
 - work in background:
 	.) push: server initiates
		self.onpush=function(){}/self.addEventListener('push', ...);
	.) sync: agent initiates; 

this.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(cacheNames['static'], event.request.url).catch(function() {
      return fetch(event.request); //relay of default request;
    }));
});

## offline app(superseded by ServiceWorker);
 - manifest file is a text file of whatever name with '.appcache' extension and 'text/cache-manifest' MIME type;
 - query string distinguishs different file; 
 - when a single file doesn't exist in manifest, the whole file is ignored;
 - no expiration date, except manifest changes;

## http2/SPDY
- multiplex streams: all files in a single connection
 * divided into BINARY frames sent asyncally.
 * prioritizing
 * intertwined requests and responses
   (keepalive suffers with HOL blocking of request/response)
- server push
won't be applied to webpage, just cached.
 
- header compression

## http3
http over QUIC/tcp2 (Quick UDP Internet Connections).
- tcp suffers from head-of-line-blocking when packets lost

## http/2 dependency tree priority model
 * 

## idempotant functions: the result is the same when execute more than one times;

## Clickjacking: cover page with an iframe, which hosts a third-party page which accept user inputs(click/type);
 - top!=window&&(top.location=window.location);
 - X-Frame-Options: Deny/SAMEORIGIN
 - scp: frame-src

## eslint:
- `--print-config file` to display the rules as well as other configs
 - dot file is ignored by default;
	- when linting ignored file error: "eslint file ignored by default use a negative ignore pattern"
 - shared-node-browser: only those common in both; 
 - commonjs: require, exports and module
 - globals: bool, whether writable
 - turn off/on with Inline Comments
 	.) /*eslint-disable/enable no-console, no-alert*/
 	.) //eslint-disable-line no-console, no-alert
 	.) //eslint-disable-next-line no-console, no-alert
 - support react:
 	.) parserOptions.ecmaFeatures.jsx:true
	.) eslint-plugin-react (also support jsx formatting)
		..) plugins:["react"]
		..) extends:["plugin:react/all",...]

 - no-mixed-spaces-and-tabs: '=' format again;
 - no-case-declarations: 'let' in 'case', risk to break DMZ; wrap in {};
 - react/prefer-stateless-function: if only 'render' existes in component, adopt pure function style definition;
 - react/jsx-no-literals: place string in {};
	*- [{"noStrings": true}]: no string literals at all; for ensuring translated;
 - react/jsx-no-bind: no nested function;
 	**anonymous function is not checked**
 - react/require-optimization: mandate shouldComponentUpdate, failed to check when (bugs):
 	.) if 'extends' from an alias
	.）if has an arrow function method
 - enable fix react hook deps
 ```
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true
      }
    ],
 ```

## prettier-eslint do not work if eslint plugin is not installed globally.

## js-beautify
 - decode unicode escape sequence: -x
 - modify the orginal file: -r

## basic Authorization header:
	Authorization: Basic btoa(username:password); 
	> btoa: base64 encoding;
## when config file 'gulpfile.js' converted to 'gulpfile.babel.js', gulp executes after 'babel-register()';

## simple request (without preflight):
 - methods: GET, POST, HEAD
 - headers: Accept Accept-Language Content-Language Content-Type (but note the additional requirements below) Last-Event-ID DPR Downlink Save-Data Viewport-Width Width
 - Content-Type: application/x-www-form-urlencoded multipart/form-data text/plain
 - No event listeners are allowed to be registered on any XMLHttpRequestUpload object used in the request.
 - No ReadableStream object is used in the request.
 - `Access-Control-Allow-Origin` in response to control access
  + when `Access-Control-Allow-Credentials: true`, this should not be `*`

## third-party cookie: another domain in iframe/ajax
 - a looser extent than origin: only top domain difference (whatever subdomain/port/protocol is);
 - if 'block third party cookie' is enabled, codes in another domain run in 'third-party' scenario have **no access** to its own cookies;
 - open new window to turn to 1st party to overcome restriction;

## babel-preset-es2015/env:
 * modules:false to prevent converting es6 modules to commonjs modules for webpack tree-shaking(remove unused `export`ed) working;
 * useBuiltin: insert `import` individual polyfill into scripts based on usage.
    ** webpack harmony-module mark this as es6 module, cause `module.exports` in commonjs module unwrittable and 'exports' renamed to '__webpack_exports__' so don't apply this feature on commonjs module. **

## 'react-test-renderer' is desined for snapshot test;
 * version should match with React; 

	renderer16 & react15:

	`TypeError: Cannot read property 'ReactCurrentOwner' of undefined`

## source map may cause debugging problem;

## enzyme
	* shallow
    - no instances in desendants;
    - simulate('click') won't propagate & bubbleup
	* equals: full props match
	* matchesElement: subcollection of props match;
	* call wrapper.update() when html changed before traversing(find/contains/...);
	* after updated, find the element again, previous found is not used anymore;
  * mount().prop() gets props of component, shallow().prop() get from root dom.

## jest
  * `--logHeapUsage` detect memory leaks
  * find the text node then call `text()`
  * it caches outputs files automatically;
	* `collectCoverageFrom` defaults to what tested;
	* beforeAll for async;
	* async: return promise or accept a param and call it when done;
	* in async callback, place 'expect' in 'try', call 'done.fail(err)' in catch; since error thrown in async function can not be caught;
	* [bug] 'verbose' clears console output;
  * transform use babel-jest implicitly, if it's configed, 'babel-jest' should be added explicitly also.
  * 'react-flow-props-to-prop-types' is not compatible with 'istanbul' when 'collectCoverage' is set.

  - `import * as abc from ...`
    change `abc.field` affects everywhere, since modules are cached.

  -  debug
    `node --inspect/inspect-brk  node_modules/jest/bin/jest --runInBand`
    `debugger`
    + in CRA, this won't work, add `--inspect` in `react-scripts` or `craco`

  - jest.mock will be hoisted to the top (variable reference results error) 
    + jest.requireActual
    + `jest.doMock()` will no be hoisted

  - force `shallow` to render nested components `shallow().dive()`

  - react lifecycle event
    ```
    const spyDidMount = jest.spyOn(HomePage.prototype, 'componentDidMount')
    const spyWillUnmount = jest.spyOn(HomePage.prototype, 'componentWillUnmount')
    const wrapper = shallow(
      <Provider store={store}>
        <HomePage {...props}/>
      </Provider>
    ).dive()
    expect(spyDidMount).toHaveBeenCalled()
    wrapper.unmount()
    expect(spyWillUnmount).toHaveBeenCalled()
    ```

  - find Component
    + Component constructor
      `import SomeComp from ''; find(SomeComp)`
    + Component rendered name
      `find('SomeComp')`
    + with specific prop
      `find('EDSRectangleButton').find({weight: 'loud'})`
      - `key/ref` don't work
    + dom selector doesn't work such as '.class_name'
 - `simulate` works on Component

 - coverage
 `npm test -- --coverage --collectCoverageFrom=src/components/pages/admin_page/* src/components/pages/admin_page/__tests__/* -u --coverageReporters lcov --coverageReporters text-summary`

## craco debug
200~@craco/craco/bin/craco.js
processArgs.unshift('--inspect-brk')

## travis adopt a new vm each time for a new build. cache file for saving download time is in vain, since downloading for cache server has no difference.

## new version of codeclimate reporter finds lcov reports in 'coverage' directory and no options to overrides.

## postcss-advanced-variables replace sass interpolation `#{$var}` with `$(var)` to separate variable with strings.

## prettier-eslint --write "**/*.js"
 * "" is required
 * option error may occur in plugin, ignore them.
 * option error may occur in plugin, ignore them.
## flow
  * Node/Element exists in core, in React as well. 
  * object.keys can infer types correctly, but values/entries not until v0.66.
  * `any` bypasses type checking; use `mixed` instead.
  * asterisk (`*`) tells Flow to infer a type parameter, rather than making you write it out explicitly.
  * adopt intersection `&` to extend.
    **{ a: number } & { a: string }** results unusable type `a: number & string`
    `|` should be used instead.

  * opaque type:
    * can not be modified, e.g. manipulate its members.
    * can not be infered to its underlying type
    * equal in defining file (inner structure is accessable), nominal in outside
  * width subtyping
    * {a, b} is subtype of {a};
    * is allowed by default, set 'exact' to prevent: {|a: string|} 
  * depth subtype 
    * no more members are added, by added to some of its members (width subtype of properties).
    * is not allowed caused by object mutability. 
    * prevent write (+), then subtype is acceptable (no base type will be set to cause the object with subtype property reading error).
    * prevent read (-), then base type is acceptable (no non-existing properties will be read)
    * when a property is not invariant, its self also behaves the same. (change whole object).

  * nominal comparison takes only name into account, whereas structural compares their inner structure. 
    * class is nominal ( convert to interface to apply structural)
    * object is structural
  * class its own is a type (no need to create manually)
  * interface covariant(+) accept subtypes, contravariant(-) accept base types.
  * create type of a variable instead of creating manually, adopt 'typeof' 
  * `import * as React from react` retrieves 'PropTypes', which triggers warning in React 15.
  * when type is imported from a file ignored/(without @flow), it's not checked.
  * ignore path is regexp pattern matching against absolute path (<PROJECT_ROOT> is symbol for root dir)
  * ingored files will be unresolvable.
  * check-contents always resolve bases on root dir.
  * `Function` is alias to `any`

npmjs: roney


## mocha 

* debug: `mocha debug ...`

## ava

* debug
node debug node_modules/ava/profile.js some/test/file.js
?? lib/fork.js:40

* with nyc, nyc needs instrument.

## nyc: args for itself should be placed before tester.

## sinon
calledWithExactly: calledWith + exact arguments counts
calledWith: deepEqual (sinon.match.same(obj) to apply shallow)

## casperjs & phantomjs

  * `require`: equivalent of that in 'nodejs'

  * detect error in target: 
    +
      1. `--verbose`
      2. 
      ```
      window.onerror = function(err) {
          alert(err);
      }
      ```

    + 
      ```
      casper.start().then(function() {
        page.onerror = function (err) { this.echo(err); }
      })
      ```


## requirejs

- modules are loaded in a context (a global object), different contexts can be applied to load different versions of the same module.

- when call `require`, a dummy module is created, of which the required module array ('string' is invalid) is dependency.

- module.init: flag module loaded.

- module.enable: store factory, load deps

- when dependency number decreased to 0, `define` callback is invoked.

## test throwing error:
 * chai.expect(function() { fun(arg); }).throw(err);
 * sinon.assert.threw checks after called, does'nt invoke and catch by itself.

## websocket is and independent protocol based on TCP. however it's handshake is http upgrade request. uri scheme is 'ws/wss'

    0                   1                   2                   3
      0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
     +-+-+-+-+-------+-+-------------+-------------------------------+
     |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
     |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
     |N|V|V|V|       |S|             |   (if payload len==126/127)   |
     | |1|2|3|       |K|             |                               |
     +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
     |     Extended payload length continued, if payload len == 127  |
     + - - - - - - - - - - - - - - - +-------------------------------+
     |                               |Masking-key, if MASK set to 1  |
     +-------------------------------+-------------------------------+
     | Masking-key (continued)       |          Payload Data         |
     +-------------------------------- - - - - - - - - - - - - - - - +
     :                     Payload Data continued ...                :
     + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
     |                     Payload Data continued ...                |
     +---------------------------------------------------------------+

@ clear console
```
    process.stdout.write(
      process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
    );
```

## redux-saga
 * runSaga: specifiy store/compaitible explicitly instead of in middleware (which binds the store to its first argument middleware.run)
 * sagaEmitter: receive actions from store(dispatch)
 * stdChannel: default channel
 * no buffer by default
 * takeEffect callback is `next`
 * takeEvery adopts `fsmIterator`
 * check takers when 'PUT'

## preload (before other resources)
 ```
<link rel="preload" href="fonts/zantroke-webfont.svg" as="font" type="image/svg+xml" crossorigin="anonymous">
<link rel="preload" href="bg-image-wide.png" as="image" media="(min-width: 601px)">
 ```

## prefetch (for next navigation)

## af-webpack
- configs are placed in `getConfig.js`

## cache
- no-store, no cache at all
- no-cache, check validation each time.

## lerna
- '--scope'
  - match agains 'name'
  - * can not match non-alpha-numeric chars such as '@', '/';

- 'hoist' is not turned on by default when install with 'lerna boostrap'

- lerna publish --conventional-commits

## render process

```
DOM -> CSSOM -> RenderTree -> Layout -> Paint -> Compositing

                       (block Render Tree instead of DOM)
CSSOM  ---------------------------------------------------------------------
  | (JS may need get dimension)                                             |
   ----------------------------> JS                                         |---> Render Tree ---> PAINT
                                 |             (if no JS)                   |
                                  ---> DOM [- - - - - - - > FOUC PAINT] ---- 
```

- DOM
**incrementally** parsing and rendering, main thread
- CSSOM
  stylable node tree, main thread
- RenderTree
  displayed (has dimensions) node tree, **incremental**
- FOUC: flash of unstyled content
- DOMContentLoaded 
DOM tree contructed and safe to access.
 + DOMParser blocking scritps (including defer)
 + Script-blocking css
 + other css (most browsers)
- external resources
download in other threads other than main thread
  + script
    * async: load side by side with parsing, execute immediately after loaded while pausing parsing; 
      - load first run first
    * defer: load side by side with parsing, and enquequed in the order of being encounterd until parsing done (domInteractive(document.readyState === interactive): whole DOM tree is contructed) to execute.
      - execute in order
    * preload: async but won't be applied (usually for those appear in js/css or next html page).
      - change rel for stylesheet
      - create new script

    * HTTP/2 server push
    * script-inserted script tag, `async` by default
      **set async to false act as `defer` to ensure execution order**
    * DOMParser blocker (halting main thread). execute in main thread.
      - normal
      - defer
  + css
    when each file is downloaded, update CSSOM, then continue DOM parsing and RenderTree constructing and painting.
    - render blocking (Render Tree construction is halted).
    - script blocking (scripts after it will not run until this is loaded).
- Compositing
  combine 

- metrics
  + FP
  first paint, such as background

  + FCP
  First Contentful Paint, such as text or image

  + LCP
  Largest Contentful Paint, the first full page without scrolling

  + FMP
  first meaningful paint, similar to LCP

## performance
- resources parsing is tasked to main thread.
- `navigator.sendBeacon()`


## cypress
- `a` click will not fire native event as jquery behavior
- `.text()` should be invoked in `should(function)` or as `.invoke('text')`
- it only retries the last one function
- all functions don't return the value directly, get it in `then`, `should`
- `window.parent/top === ` is replaced with `self`
  + `modifyObstructiveCode: false`
  + store in a variable
- debug
  `set DEBUG=cypress:* && npx cypress open`
- tags should not be quoted if only a single name
  `--env TAGS=@test`
- delay response
```
  cy.intercept("GET", /groups?(.)*&query=(\S+)/, (req) => {
    req.on('response', (res) => {
      // Wait for delay in milliseconds before sending the response to the client.
      res.setDelay(3000)
    }
  )
})
```

- out of band commands won't work, such as in `setTimeout` devtools console, instead
  + `cy.clock()`
  + `cy.now()`

## cross-domain communication
- server proxy
- jsonp
- cors
  + simple request
- postMessage
- window.name
  one way
- document.domain
  + only child to parent
  + both should set explicitly even already the domain
- `#hash`
- websocket
  check "origin" header from server (blacklist)

## node-gyp on windows
`choco install python visualstudio2017buildtools visualstudio2017-workload-vctools -y`
- python2
- [vsbuild2017](https://download.visualstudio.microsoft.com/download/pr/343898a7-7d12-4faa-b5df-958b31e57b3e/1ed6bc00aaf9df4b43c5dad91bf046257376cd13764dbf0d044208684adc4c2a/vs_BuildTools.exe)
- [vc++](https://download.visualstudio.microsoft.com/download/pr/7239cdc3-bd73-4f27-9943-22de059a6267/003063723B2131DA23F40E2063FB79867BAE275F7B5C099DBD1792E25845872B/VC_redist.x64.exe)

## label
when it contains input/button, its `for` won't work to target others

## react-devtools
use standalone version to debug react in iframe

## tailwind
- NO spaces in arbitrary values
  `bg-[rgb(0,0,0)]` rather than `bg-[rgb(0, 0, 0)]`
- `rgba` doesn't work in arbitrary values, instead adopt opacity modifier for color `rgb()/20`


## typescript
- `--traceResolution`
- `--diagnostics` verbose
- suppress error
  - tslint: `/* tslint:disable-next-line */`
  - typescript: `// @ts-ignore`
- when `extends` from an union `a | b`, it's restraned to only `a` or `b`
- module: commonjs for 'lib', es6 form 'es' and webpack (tree-shaking).
- only set 'files' to entry point, or unused files are also checked.
- import-name rule can not handle name with only '../'
- `... rule requires type information.`, pass `--project` to invoke type checking.
- `include` should cover the file if type checking is invoked.
- variable-name doesn't allow PascalCase for stateless component
- typescript can not check types of other formats than js
  - adopt require instead of import to bypass typescript
  - define type definition for the files
    - define custom types:
    ```
      declare module "*.png" {
        const value: string;
        export default value;
      }
    ```
    - css: adopt typings-for-css-modules-loader to substitute css-module and turn on 'namedExport: true'
    - if css is not referenced, will not be extracted.
    - the first time may not find, for it generates after tsc.
    - fail to generate when `modules` flag is not set for imported file
- es6 target compiling adopts 'classic' module resolution, which picks up '.ts' only.
- to remove a field from extended inteface, set its type to 'never'
- if two base types has conflict fields, redefine it in derived.
- treat 'this.constructor' as a pure function, adopt type assertion:
` (this.constructor as typeof SomeClass).prop;`
- Exclude works for strings
`Exclude<"a" | "b" | "c" , "a" | "c">` -> "b"
- omit fields:
`Pick<T, Exclude<keyof T, K>>.`

- hybrid types

function or object:

```
interface SumFunction {
  // Invoke signature.
  (param: number): number;

  // Property.
  empty: () => number;
}
```
- argument name can not be omited
`fn: (a: number) => void`

- extends multiple types
  - interface A extends B, C {}
  - if a type with the same exist on both, define it again.

- allow an interface to add additional properties, add indexer
```
interface a {
  [x: string]: any;
}
```

- add custom value to `window`
`window['name']`

- type alias can appear in type definition of its own, but not of other types.

- access nested types with square, rather than dot which is invalid
  `IStateFilters['others']['readiness']`
- local lookup strategy
  `sameName.d.ts` -> `sameName.ts` -> `sameName.js`
  + it will infer types from `.js` implementation files if `allowJs`
  + `declare module` no effect, e.g. it's always augmenting
- node_modules lookup strategy
  `sameName.d.ts` -> `types/typings`  -> `declare module`
  + inference won't happen even `allowJs`
  + `declare module`
    - relative path in the lib won't work
    - if inside a file with `import`, it augments an exsiting one, e.g. it's not a declartion of this module which would still be unfound.

- `(../)*node_modules/@types` are picked up automatically
  more specified in
  ```
  "compilerOptions": {
    "types": ["node", "jest", "express"]
  }
  ```
- `import type`
  prepend `typeof` automatically if the target is a value

- `unknown`
  restricted `any`, requires type checking when use.

- interfaces/classes with the same name are merged

  + reopen an interface/class in other modules
```
declare module 'pretender' {
  export interface Server {
    public handledRequests: Request[]
  }
}
```
  + `class` should be **replaced** with `interface`

- class is also a type (`typeof` is not required)

- arbitrary fields
<https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures>
```
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}
```

- global types without importing when use, extending the `module` scope
  + no `import` in the type file, or its restricted to this module scope
  + `global` block is ignored in a script (already top scope) 
    ```
    global {
      type TName = string
    }
    ```
    - add `export {}` to turn it into a module or remove the `global {}`

- function
```
// argument names are mandatory
interface SearchFunc {
  (source: string, subString: string): boolean;
}

interface Obj {
  MethodFunc(source: string, subString: string): boolean;
}

type SearchFunc = <T>(arg1: T, arg2: string) => boolean;
```

- string array to union
  + const
  ```
    const array = ['value1', 'value2', 'value3'] as const;
    type UnionType = typeof array[number]; // 'value1' | 'value2' | 'value3'
  ```

- extract generic types
```
type ExtractGenericTypes<T> = T extends Api<infer U1, infer U2, infer U3, infer U4, infer U5> ? [U1, U2, U3, U4, U5] : never;
```

- generic types should be passed all or nothing, fails otherwise

- arguments
  json fields cast automatically unless inline passing
  ```
  type Abc = 'abc'
  type Obj = { a: Abc }
  function f(a: Abc) {}
  f({ a: 'abc' }) // works
  const o = { a: 'abc' }
  f(o) // error
  ```
  `fun({a: 'abc'})`

## <script>
- crossorigin
  check cors header if present
  + "" === "anonymouse"
    without cookies
  + "use-credential"
- type='module'
  implies 'crossorigin'


## vitest
- debug `npm test --  DeviceList --inspect-brk --single-thread`

- console output truncation prevention
 env: `DEBUG_PRINT_LIMIT=99999`

- `.only` is allowed only in development env otherwise pass `--allowOnly`

- change timezone in `test-globals.ts`
```
export const setup = () => {
  process.env.TZ = 'UTC'
}

// vitest.config.ts
    globalSetup: './src/test-globals.ts',

```

- `mockReturnValue` is singleton
- `mockReturnValueOnce` takes precedence than `mockReturnValue`
- `mockReset` sets to an empty function
  + including `mockReturnValue/...`
- `mockRestore` sets to whatever passed to `fn()` 
- auto-mock
  When vi.mock() is called without factory and no `__mock__/fileName` is found
  + functions are replaced with `() => void 0`
  + arrays are emptied
  + primitives/classes/objects keep the same
aaaa
