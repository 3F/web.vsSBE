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

#[File replace.Regex("file", "pattern", "replacement")]
```
```
#!java

#[File replace.Wildcards("file", "pattern", "replacement")]
```

Sample:

```
#!java

#[File replace.Regexp("source.extension.vsixmanifest", "<Version>[0-9\.]+</Version>", "<Version>#[var ver]</Version>")]
```
