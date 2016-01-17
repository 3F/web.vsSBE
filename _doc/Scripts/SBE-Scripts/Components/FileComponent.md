---
layout: doc
title: FileComponent
description: I/O File operations.
permalink: /doc/Scripts/SBE-Scripts/Components/FileComponent/
---
# FileComponent

I/O File operations.

### Remarks

#### Redirection for standard streams

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

#### Support of standard streams

* STDOUT - Standard output stream.
* STDERR - Standard error stream.

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

void #[File call(string filename [, string args])]
```

v0.11.3+:

```java 

void #[File call(string filename [, string args [, integer timeout]])]
```

Where,

* filename - Path to executable file.
* args - Arguments to executable file.
* timeout - How long to wait the execution, in seconds. 0 value - infinitely

### scall

Caller of executable files in silent mode.

Syntax:

```java 

void #[File scall(string filename [, string args])]
```

v0.11.3+:

```java 

void #[File scall(string filename [, string args [, integer timeout]])]
```
* timeout - How long to wait the execution, in seconds. 0 value - infinitely

### sout

Receives data from standard streams for executed file. To disable errors use the `2>nul` and similar ([Redirection for standard streams](#redirection-for-standard-streams)).

Syntax:

```java 

string #[File sout(string filename [, string args])]
```

v0.11.3+:

```java 

string #[File sout(string filename [, string args [, integer timeout]])]
```
* timeout - How long to wait the execution, in seconds. 0 value - infinitely

### cmd

v0.11.3+:

Alias to sout() for cmd.
`- #[File cmd("args")] -> #[File sout("cmd", "/C args")]`

Receives data from standard streams for cmd process with arguments.

```java
string #[File cmd(string args [, integer timeout])]
```
* timeout - How long to wait the execution, in seconds. 0 value - infinitely

### get

Get all data from text file.

Syntax:

```java
string #[File get("filename")]
```

### write

To write data in a text file.

* Creates if the file does not exist.
* Overwrites content if it already exists.
* Allows use a [standard streams](#support-of-standard-streams)

Syntax:

```java
void #[File write("filename"): mixed data]
```

v0.10+:
 
```java
void #[File write(string name, boolean append, boolean line, string encoding): mixed data]
```
* name - File name.
* append - Flag to append the content to the end of the file.
* newline - To write with newline.
* encoding - Preferred [Encoding](https://msdn.microsoft.com/en-us/library/system.text.encoding.aspx#Anchor_5):

```text
utf-8
windows-1251
us or us-ascii	
utf-16
...
```

The `utf-8` is used by default.

[BOM](https://en.wikipedia.org/wiki/Byte_order_mark) (Byte-Order Mark) special names:

v0.12.6+

name      | BOM
----------|-----
utf-8     | no
utf-8-bom | yes - `0xEF 0xBB 0xBF`


### append

To append data to the end of a text file or create new if file does not exist.

Syntax:

```java
#[File append("filename"): mixed data]
```

### writeLine

To write data with newline in a text file.

* Creates if the file does not exist.
* Overwrites content if it already exists.
* Allows use a [standard streams](#support-of-standard-streams)

Syntax:

```java
#[File writeLine("filename"): mixed data]
```

### appendLine

To append data with newline to the end of a text file or create new if file does not exist.

Syntax:

```java
#[File appendLine("filename"): mixed data]
```

### replace

To replace data in files.

Syntax:

```java 
void #[File replace(string file, string pattern, string replacement)]
```

```java
void #[File replace.Regexp(string file, string pattern, string replacement)]
```

* `pattern` should contain [Regular Expression Language](https://msdn.microsoft.com/en-us/library/az24scfc.aspx)
* `replacement` may contain the following [substitution elements and replacement patterns](https://msdn.microsoft.com/en-us/library/ewy2t5e0.aspx)

```java
void #[File replace.Wildcards(string file, string pattern, string replacement)]
```

`pattern` may contain wildcards:

```text
Matches any character:
 *   - 0 or more times.
 +   - 1 or more times.
 ?   - 1 single.
```

Alias for Regexp (v0.10+):

```java
void #[File replace.Regex(string file, string pattern, string replacement)]
```

Samples:

```java
#[File replace.Regexp("source.extension.vsixmanifest", "<Version>[0-9.]+</Version>", "<Version>#[var version]</Version>")]
```

```java
#[File replace.Regexp("file.log", "(\d+)", "~$1~")]
```


### exists

v0.10+

#### directory

Determines whether the given path refers to an existing directory on disk.

```java
boolean #[File exists.directory(string path [, boolean environment])]
```
* path - Path to directory
* environment - Use Environment PATH (Associated for current process).

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
boolean #[File exists.file(string path [, boolean environment])]
```
* path - Path to file
* environment - Use Environment PATH (Associated for current process).

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

### remote

v0.12.6+

Remote servers.

#### download

To download file from remote server.

```java
void #[File remote.download(string addr, string output [, string user, string pwd])]
```
* addr - Full address to remote file. e.g.: ftp://... http://...
* output - Output file name.
* user - Username.
* pwd - Password.

Samples of addresses:

```text
ftp://192.168.17.04/non-api.png
ftp://192.168.17.04:2021/dir1/non-api.png
ftp://user1:mypass123@192.168.17.04:2021/dir1/non-api.png
https://www.nuget.org/api/v2/package/vsSBE.CI.MSBuild/1.5.1
http://example.com
```

Examples:

```java
#[IO remote.download("ftp://192.168.17.04:2021/dir1/non-api.png", "non-api.png", "user1", "mypass123")]
#[IO remote.download("https://nuget.org/api/v2/package/vsSBE.CI.MSBuild/1.5.1", "CIM.nupkg")]
#[IO remote.download("http://example.com", "example.com.html")]
```