# FileComponent #

I/O operations with files.

## get ##

Receiving data from file.

Syntax:
```
#!java

#[File get("filename")]
```

## call ##

Caller of executable files.

Syntax:
```
#!java

#[File call("filename", "args")]
```
```
#!java

#[File call("filename")]
```

## out ##

Receiving data from executed file.

Syntax:
```
#!java

#[File out("filename", "args")]
```

```
#!java

#[File out("filename")]
```

## scall ##

Caller of executable files in silent mode.

Syntax:
```
#!java

#[File scall("filename", "args")]
```
```
#!java

#[File scall("filename")]
```

## sout ##

Receiving data from executed file in silent mode.

Syntax:
```
#!java

#[File sout("filename", "args")]
```

```
#!java

#[File sout("filename")]
```

## write ##

Writes text data in file. 

* Creates if the file does not exist.
* Overwrites content if already exist.

Syntax:
```
#!java

#[File write("filename"): multiline data]
```

v0.10:
 
```
#!java

#[File write(string name, boolean append, boolean line, string encoding): multiline data]
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


## append ##

Writes text data in file. 

* Creates if the file does not exist.
* Adds data to the end file if it already exist.

Syntax:
```
#!java

#[File append("filename"): multiline data]
```

## writeLine ##

Writes text data with CR/LF in file. 

* Creates if the file does not exist.
* Overwrites content if already exist.

Syntax:
```
#!java

#[File writeLine("filename"): multiline data]
```

## appendLine ##

Writes text data with CR/LF in file. 

* Creates if the file does not exist.
* Adds data to the end file if it already exist.

Syntax:
```
#!java

#[File appendLine("filename"): multiline data]
```

## replace ##

Replacing the strings in files.

Syntax:
```
#!java

#[File replace("file", "pattern", "replacement")]
```
```
#!java

#[File replace.Regexp("file", "pattern", "replacement")]
```
```
#!java

#[File replace.Wildcards("file", "pattern", "replacement")]
```

v0.10:

* Alias for Regexp:
```
#!java

#[File replace.Regex("file", "pattern", "replacement")]
```

Sample:

```
#!java

#[File replace.Regexp("source.extension.vsixmanifest", "<Version>[0-9\.]+</Version>", "<Version>#[var ver]</Version>")]
```

## exists ##

v0.10

Determines whether the something exists.

### directory ###

Determines whether the given path refers to an existing directory on disk.

```
#!java

boolean #[File exists.directory(string path)]
```
* path - Path to test

Determines whether the given path refers to an existing directory on disk with searching in environment

```
#!java

boolean #[File exists.directory(string path, boolean environment)]
```
* path - Path to test
* environment - Using the PATH of the Environment for searching. Environment associated with the current process.

Samples:

```
#!java

#[( #[File exists.directory("log")] ){
   ...
}]
```
```
#!java

#[( #[File exists.directory("D:\tmp\log")] ){
   ...
}]
```
```
#!java

#[( #[File exists.directory("System32", true)] ){
   ...
}]
```

### file ###

Determines whether the specified file exists.

```
#!java

boolean #[File exists.file(string path)]
```
* path - The file to check

Determines whether the specified file exists with searching in environment.

```
#!java

boolean #[File exists.file(string path, boolean environment)]
```
* path - The file to check
* environment - Using the PATH of the Environment for searching. Environment associated with the current process.

Samples:

```
#!java

#[( #[File exists.file("data.log")] ){
   ...
}]
```

```
#!java

#[( #[File exists.file("git.exe", true)] ){
   ...
}]
```

```
#!java

#[( #[File exists.file("D:\tmp\data.log")] ){
   ...
}]
```
