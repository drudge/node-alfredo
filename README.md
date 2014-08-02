# Alfredo: A Node.js Module for Alfred Workflows

Alfredo's primary features include:

* Functions for finding your bundle ID, cache and storage paths, and query arguments.
* Functions for reading and writing JSON and plist files.
* A function to perform fuzzy searching operations.
* A class to simplify generating [feedback XML](http://www.alfredforum.com/topic/5-generating-feedback-in-workflows/) for Alfred.


## Installation

    npm install alfredo


## Core Functions
These are intended to make some basic rote tasks easier and faster to code. alfredo defines the following functions:

* `alfredo.bundleSync()`  
    This function returns the bundle ID for your workflow by reading it from its `Info.plist` file.
* `alfredo.readPlistSync(path)`, `alfredo.writePlistSync(path, obj)`, `alfredo.readJSONSync(path)`, `alfredo.writeJSONSync(path, obj)`  
    These functions will read from and write to the plist or JSON files located at `path`.

## Feedback System
Alfredo uses a robust and complete implementation of Alfred's feedback system, generating and outputting the required XML for the attributes you specify. This breaks down into a class called `Item` and a function called `feedback`.

* `alfredo.Item(args)`  
    The `Item` class is initialized with an object of keys and values, and returns one `Item` which can then be passed to the `feedback` function. The following keys are currently understood by Alfredo and Alfred:

    + `title`: The title string to show in the feedback list.
    + `subtitle`: The subtitle string to show below the title.
    + `uid`: A unique identifier string for Alfred's sorting functions.
    + `valid`: Either `true`, `false`, or a string. Tells Alfred whether the item is actionable.
    + `autocomplete`: A string to autocomplete Alfred's query to when an invalid item is chosen.
    + `icon`: A path to an icon image, a path to a file, or a file type (default: `icon.png`).
    + `fileIcon`: If you wish to use a particular file's icon, set `icon` to its path and `fileIcon` to `true`.
    + `fileType`: If you wish to specify a type of file whose icon Alfred should use, set `icon` to the type and `fileType` to `True`.
    + `arg`: The argument to be passed as `{query}` if the item is valid and actioned. If it contains newlines, it will be passed as a separate XML key rather than an attribute of `<item></item>`.
    + `type`: Currently, can only be set to `file`, which tells Alfred to treat the result as a file.

    A nifty trick is to pass an object with some or all of `Alfredo.Item`'s keys and values into the initializer. So you could conceivably do this:

    ```js
    var i = alfredo.Item({
      title: "A Title", 
      subtitle: "This is only a test.", 
      uid: "alfredo-test", 
      valid: false
    })
    ```

* `Item.get()`  
    Returns the current values for the item in the following format. Primarily used with the `feedback()` function below.

    If `autocomplete` or `type` is set, that value will be added to the `"attrib"` dictionary, as will an `arg` that does not contain newlines.
* `Item.feedback()`, `alfredo.feedback(items)`  
    Takes either an individual item or a list of items for `items` and prints a UTF-8-encoded XML string for Alfred to interpret.


## Fuzzy Search
Alfredo's fuzzy search is powered by the [fuzzy-filter](https://github.com/stratuseditor/fuzzy-filter) node module by [DJG](https://github.com/sentientwaffle).

```js
alfredo.fuzzy(pattern, items, [options])
```

#### Parameters

    pattern - The fuzzy String to match against.
    items   - An Array of String.
    options - (optional)
            * pre         - String to insert before matching text.
            * post        - String to insert after matching text.
            * limit       - Integer maximum number of results.
            * separator   - String separator. Match against the last
                            section of the String by default.
            * ignorecase  - Boolean (default: true).
            * ignorespace - Boolean (default: true).
            * separate    - Boolean (default: false). If set to true, the
                            function returns an array of an array of strings,
                            where each array is
                            [beforeLastSeparator, afterLastSeparator].
                            If set, `separator` must also be passed.

Note: If `pre` is passed, you also have to pass `post` (and vice-versa).

#### Example

```js
alfredo.fuzzy("cs", ["cheese", "pickles", "crackers", "pirate attack", "cs!!"])
// => ["cs!!", "cheese", "crackers"]
```
   
## Keychain Interface
If your workflow needs to store a user's sensitive data, particularly a username--password pair, 
the safest way to do so is with the Mac OS X Keychain. The Keychain is normally an utter pain in 
the behind, but Alfredo makes working with it a breeze using the [node-keychain](https://github.com/drudge/node-keychain) module.

* `alfredo.keychain.getPasswordSync(opts)`  
    Searches the Keychain for an account matching the passed `opts.account` and `opts.service`, returning the password.
* `alfreo.keychain.setPasswordSync(opts)`
    Saves or changes the saved password for `opts.account` and `opts.service` to `opts.Password`.
* `alfredo.keychain.deletePasswordSync(opts)`
    Removes `opts.account` and `opts.service`'s password from the Keychain.


## Help and Support
The [Alfred v2 forums](http://www.alfredforum.com) are a good place to look for answers, but you can also file an issue or reach me on Twitter at [@npenree](http://twitter.com/npenree).


## Contributors

The following are the major contributors of Alfredo (in no specific order).

* Nicholas Penree ([drudge](http://github.com/drudge))
* Sérgio Ramos ([ramitos](http://github.com/ramitos))

This module is heavily inspired by [alp](https://github.com/phyllisstein/alp), from [Daniel Shannon](https://github.com/phyllisstein).

## License

(The MIT License)

Copyright (c) 2014 Nicholas Penree &lt;nick@penree.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[Alfred v2]: http://www.alfredapp.com
