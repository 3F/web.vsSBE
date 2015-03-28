# FileComponent #

I/O operations with files.

**Note** for call/out/scall/sout:

* All errors can be ~disabled with arguments, for example:
* * stderr to stdout: *<command>* **2>&1**
* * stderr to NUL i.e. as disabled: *<command>* **2>nul**
* * stderr into file: *<command>* **2>** *<path_to_file>*
* * etc.
* stdout can be a similar:
* * *<command>* **>** *<destination>* or *<command>* **1>** *<destination>*
* * Where <destination> it's similar as above.
* For more details see: [MS Q110930](http://support.microsoft.com/kb/110930/en-us)


## call ##

Caller of executable files.

Syntax:
```
#!java

void #[File call(string filename, string args)]
```
```
#!java

void #[File call(string filename)]
```

**v0.11.3+**:
```
#!java

void #[File call(string filename, string args, uinteger timeout)]
```

Where,

* filename - Full path to executable file.
* args - Arguments to executable file.
* timeout - How long to wait the execution, in seconds. 0 value - infinitely


## out ##

Receiving data from stdout for executed file.

Syntax:
```
#!java

string #[File out(string filename, string args)]
```

```
#!java

string #[File out(string filename)]
```

**v0.11.3+**:
```
#!java

string #[File out(string filename, string args, uinteger timeout)]
```
* timeout - How long to wait the execution, in seconds. 0 value - infinitely

## scall ##

Caller of executable files in silent mode.

Syntax:
```
#!java

void #[File scall(string filename, string args)]
```
```
#!java

void #[File scall(string filename)]
```

**v0.11.3+**:
```
#!java

void #[File scall(string filename, string args, uinteger timeout)]
```
* timeout - How long to wait the execution, in seconds. 0 value - infinitely

## sout ##

Receiving data from stdout for executed file with silent mode.

Syntax:
```
#!java

string #[File sout(string filename, string args)]
```

```
#!java

string #[File sout(string filename)]
```


**v0.11.3+**:
```
#!java

string #[File sout(string filename, string args, uinteger timeout)]
```
* timeout - How long to wait the execution, in seconds. 0 value - infinitely


## get ##

Receiving data from file.

Syntax:
```
#!java

string #[File get("filename")]
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

v0.10+:
 
```
#!java

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

v0.10+:

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

v0.10+

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

