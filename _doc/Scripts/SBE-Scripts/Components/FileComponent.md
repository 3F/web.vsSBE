---
layout: doc
title: FileComponent
description: Operations with files and standard streams.
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

```java 

#[IO ...]
```

#### MSBuild Property Functions.

You should also remember, the some features also available with [MSBuild](../../../MSBuild/) core as [Property Functions](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx)

* Use the [System.IO Namespace](https://msdn.microsoft.com/en-us/library/System.IO%28v=vs.100%29.aspx) for example:

```bash 

$([System.IO.File]::Exists("D:/tmp/result.log"))
```
*[File.Exists](https://msdn.microsoft.com/en-us/library/system.io.file.exists%28v=vs.100%29.aspx) Method*

#### Regex & Wildcards rules

* Regular Expression Language - [Quick Reference](https://msdn.microsoft.com/en-us/library/az24scfc.aspx)
* Wildcards - Matches any single character:
    * `*` - 0 or more times.
    * `+` - 1 or more times.
    * `?` - 1 any single character.

## Available features

### call 

Caller of executable files.

Syntax:

```java 

void #[File call(string filename, string args)]
```

```java 

void #[File call(string filename)]
```

v0.11.3+:

```java 

void #[File call(string filename, string args, uinteger timeout)]
```

Where,

* filename - Full path to executable file.
* args - Arguments to executable file.
* timeout - How long to wait the execution, in seconds. 0 value - infinitely

### scall

Caller of executable files in silent mode.

Syntax:

```java 

void #[File scall(string filename, string args)]
```

```java 

void #[File scall(string filename)]
```

v0.11.3+:

```java 

void #[File scall(string filename, string args, uinteger timeout)]
```
* timeout - How long to wait the execution, in seconds. 0 value - infinitely

### sout

Receives data from standard streams for executed file. To disable errors use the '2>nul' and similar - see above.

Syntax:

```java 

string #[File sout(string filename, string args)]
```

```java 

string #[File sout(string filename)]
```


v0.11.3+:

```java 

string #[File sout(string filename, string args, uinteger timeout)]
```
* timeout - How long to wait the execution, in seconds. 0 value - infinitely

### cmd

v0.11.3+:

Alias to sout() for cmd.
`- #[File cmd("args")] -> #[File sout("cmd", "/C args")]`

Receives data from standard streams for cmd process with arguments.

```java 

string #[File cmd(string args)]
```

```java 

string #[File cmd(string args, uinteger timeout)]
```
* timeout - How long to wait the execution, in seconds. 0 value - infinitely

### get

Gets all data from file.

Syntax:

```java 

string #[File get("filename")]
```

### write

Writes text data in file. 

* Creates if the file does not exist.
* Overwrites content if already exist.

Syntax:

```java 

#[File write("filename"): multiline data]
```

v0.10+:
 
```java 

void #[File write(string name, boolean append, boolean line, string encoding): multiline data]
```
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

```java 

#[File append("filename"): multiline data]
```

### writeLine

Writes text data with CR/LF in file. 

* Creates if the file does not exist.
* Overwrites content if already exist.

Syntax:

```java 

#[File writeLine("filename"): multiline data]
```

### appendLine

Writes text data with CR/LF in file. 

* Creates if the file does not exist.
* Adds data to the end file if it already exist.

Syntax:

```java 

#[File appendLine("filename"): multiline data]
```

### replace

Replacing the strings in files.

Syntax:

```java 

#[File replace("file", "pattern", "replacement")]
```

```java 

#[File replace.Regexp("file", "pattern", "replacement")]
```

```java 

#[File replace.Wildcards("file", "pattern", "replacement")]
```

v0.10+:

* Alias for Regexp:

```java 

#[File replace.Regex("file", "pattern", "replacement")]
```

Sample:

```java 

#[File replace.Regexp("source.extension.vsixmanifest", "<Version>[0-9\.]+</Version>", "<Version>#[var ver]</Version>")]
```

### exists

`v0.10+`

Determines whether the something exists.

#### directory

Determines whether the given path refers to an existing directory on disk.

```java 

boolean #[File exists.directory(string path)]
```
* path - Path to test

Determines whether the given path refers to an existing directory on disk with searching in environment

```java 

boolean #[File exists.directory(string path, boolean environment)]
```
* path - Path to test
* environment - Using the PATH of the Environment for searching. Environment associated with the current process.

Samples:

```java 

#[( #[File exists.directory("log")] ){
   ...
}]
```

```java 

#[( #[File exists.directory("D:\tmp\log")] ){
   ...
}]
```

```java 

#[( #[File exists.directory("System32", true)] ){
   ...
}]
```

#### file

Determines whether the specified file exists.

```java 

boolean #[File exists.file(string path)]
```
* path - The file to check

Determines whether the specified file exists with searching in environment.

```java 

boolean #[File exists.file(string path, boolean environment)]
```
* path - The file to check
* environment - Using the PATH of the Environment for searching. Environment associated with the current process.

Samples:

```java 

#[( #[File exists.file("data.log")] ){
   ...
}]
```

```java 

#[( #[File exists.file("git.exe", true)] ){
   ...
}]
```

```java 

#[( #[File exists.file("D:\tmp\data.log")] ){
   ...
}]
```
