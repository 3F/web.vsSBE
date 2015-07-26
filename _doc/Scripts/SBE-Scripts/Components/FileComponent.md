---
layout: doc
title: FileComponent
permalink: /doc/Scripts/SBE-Scripts/Components/FileComponent/
---
# FileComponent

Operations with files and standard streams.

### Remarks

#### Redirection for standard streams.

*for call/scall/sout* etc.:

* All errors can be ~disabled with arguments, for example:
    * stderr to stdout: `command` **2>&1**
    * stderr to NUL i.e. as disabled: `command` **2>nul**
    * stderr into file: `command` **2>** `path_to_file`
    * etc.
* stdout can be a similar:
    * `command` **>** `destination` or `command` **1>** `destination`
    * Where `destination` it's similar as above.
* For more details see: [MS Q110930](http://support.microsoft.com/kb/110930/en-us)

#### IO alias

*available with v0.12+*
{% highlight java %}

#[IO ...]
{% endhighlight %}

#### MSBuild Property Functions.

You should also remember, the some features also available with [MSBuild](../../../MSBuild/) core as [Property Functions](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx)

* Use the [System.IO Namespace](https://msdn.microsoft.com/en-us/library/System.IO%28v=vs.100%29.aspx) for example:

{% highlight bash %}

$([System.IO.File]::Exists("D:/tmp/result.log"))
{% endhighlight %}
*[File.Exists](https://msdn.microsoft.com/en-us/library/system.io.file.exists%28v=vs.100%29.aspx) Method*

## Available features

### call 

Caller of executable files.

Syntax:
{% highlight java %}

void #[File call(string filename, string args)]
{% endhighlight %}
{% highlight java %}

void #[File call(string filename)]
{% endhighlight %}

v0.11.3+:
{% highlight java %}

void #[File call(string filename, string args, uinteger timeout)]
{% endhighlight %}

Where,

* filename - Full path to executable file.
* args - Arguments to executable file.
* timeout - How long to wait the execution, in seconds. 0 value - infinitely

### scall

Caller of executable files in silent mode.

Syntax:
{% highlight java %}

void #[File scall(string filename, string args)]
{% endhighlight %}
{% highlight java %}

void #[File scall(string filename)]
{% endhighlight %}

v0.11.3+:
{% highlight java %}

void #[File scall(string filename, string args, uinteger timeout)]
{% endhighlight %}
* timeout - How long to wait the execution, in seconds. 0 value - infinitely

### sout

Receives data from standard streams for executed file. To disable errors use the '2>nul' and similar - see above.

Syntax:
{% highlight java %}

string #[File sout(string filename, string args)]
{% endhighlight %}

{% highlight java %}

string #[File sout(string filename)]
{% endhighlight %}


v0.11.3+:
{% highlight java %}

string #[File sout(string filename, string args, uinteger timeout)]
{% endhighlight %}
* timeout - How long to wait the execution, in seconds. 0 value - infinitely

### cmd

v0.11.3+:

Alias to sout() for cmd.
`- #[File cmd("args")] -> #[File sout("cmd", "/C args")]`

Receives data from standard streams for cmd process with arguments.

{% highlight java %}

string #[File cmd(string args)]
{% endhighlight %}
{% highlight java %}

string #[File cmd(string args, uinteger timeout)]
{% endhighlight %}
* timeout - How long to wait the execution, in seconds. 0 value - infinitely

### get

Gets all data from file.

Syntax:
{% highlight java %}

string #[File get("filename")]
{% endhighlight %}

### write

Writes text data in file. 

* Creates if the file does not exist.
* Overwrites content if already exist.

Syntax:
{% highlight java %}

#[File write("filename"): multiline data]
{% endhighlight %}

v0.10+:
 
{% highlight java %}

void #[File write(string name, boolean append, boolean line, string encoding): multiline data]
{% endhighlight %}
* name - File name
* append - Flag of adding data to the end file
* line - Adds a line terminator
* encoding - Code page name of the preferred [Encoding](http://msdn.microsoft.com/en-us/library/system.text.encoding.aspx)

Examples of values of the encoding names:

	utf-8
	windows-1251
	us or us-ascii	
	utf-16


### append

Writes text data in file. 

* Creates if the file does not exist.
* Adds data to the end file if it already exist.

Syntax:
{% highlight java %}

#[File append("filename"): multiline data]
{% endhighlight %}

### writeLine

Writes text data with CR/LF in file. 

* Creates if the file does not exist.
* Overwrites content if already exist.

Syntax:
{% highlight java %}

#[File writeLine("filename"): multiline data]
{% endhighlight %}

### appendLine

Writes text data with CR/LF in file. 

* Creates if the file does not exist.
* Adds data to the end file if it already exist.

Syntax:
{% highlight java %}

#[File appendLine("filename"): multiline data]
{% endhighlight %}

### replace

Replacing the strings in files.

Syntax:
{% highlight java %}

#[File replace("file", "pattern", "replacement")]
{% endhighlight %}
{% highlight java %}

#[File replace.Regexp("file", "pattern", "replacement")]
{% endhighlight %}
{% highlight java %}

#[File replace.Wildcards("file", "pattern", "replacement")]
{% endhighlight %}

v0.10+:

* Alias for Regexp:
{% highlight java %}

#[File replace.Regex("file", "pattern", "replacement")]
{% endhighlight %}

Sample:

{% highlight java %}

#[File replace.Regexp("source.extension.vsixmanifest", "<Version>[0-9\.]+</Version>", "<Version>#[var ver]</Version>")]
{% endhighlight %}

### exists

v0.10+

Determines whether the something exists.

#### directory

Determines whether the given path refers to an existing directory on disk.

{% highlight java %}

boolean #[File exists.directory(string path)]
{% endhighlight %}
* path - Path to test

Determines whether the given path refers to an existing directory on disk with searching in environment

{% highlight java %}

boolean #[File exists.directory(string path, boolean environment)]
{% endhighlight %}
* path - Path to test
* environment - Using the PATH of the Environment for searching. Environment associated with the current process.

Samples:

{% highlight java %}

#[( #[File exists.directory("log")] ){
   ...
}]
{% endhighlight %}
{% highlight java %}

#[( #[File exists.directory("D:\tmp\log")] ){
   ...
}]
{% endhighlight %}
{% highlight java %}

#[( #[File exists.directory("System32", true)] ){
   ...
}]
{% endhighlight %}

#### file

Determines whether the specified file exists.

{% highlight java %}

boolean #[File exists.file(string path)]
{% endhighlight %}
* path - The file to check

Determines whether the specified file exists with searching in environment.

{% highlight java %}

boolean #[File exists.file(string path, boolean environment)]
{% endhighlight %}
* path - The file to check
* environment - Using the PATH of the Environment for searching. Environment associated with the current process.

Samples:

{% highlight java %}

#[( #[File exists.file("data.log")] ){
   ...
}]
{% endhighlight %}

{% highlight java %}

#[( #[File exists.file("git.exe", true)] ){
   ...
}]
{% endhighlight %}

{% highlight java %}

#[( #[File exists.file("D:\tmp\data.log")] ){
   ...
}]
{% endhighlight %}
