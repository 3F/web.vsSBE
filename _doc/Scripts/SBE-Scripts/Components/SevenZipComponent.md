---
layout: doc
title: SevenZipComponent
description: 7-Zip File archiver with high compression ratio.
permalink: /doc/Scripts/SBE-Scripts/Components/SevenZipComponent/
---
# SevenZipComponent

7-Zip. File archiver with high compression ratio - [www.7-zip.org](http://7-zip.org/)

[ v0.12.6+ ]

### Configuration

#### Available compression methods

Value       | Description
------------|------------
`Deflate`   | Combination of the LZ77 algorithm and Huffman coding [[?](https://en.wikipedia.org/wiki/DEFLATE)]
`Deflate64` | A slightly higher compression ratio and lower compression time *(increased dictionary size - 64kB)* [[?](https://en.wikipedia.org/wiki/DEFLATE#Deflate64.2FEnhanced_Deflate)]
`BZip2`     | More effectively than Deflate, but is considerably slower [[?](https://en.wikipedia.org/wiki/Bzip2)]
`Lzma`      | A high compression ratio than bzip2. Uses dictionary (improved variant of LZ77 + range encoding) and special handling of binary data [[?](https://en.wikipedia.org/wiki/LZMA)]
`Lzma2`     | Efficient multithreaded compression/decompression + improved compression of partially or completely incompressible files. [[?](https://en.wikipedia.org/wiki/LZMA2)]
`Ppmd`      | Adaptive statistical data compression. Based on context modeling and prediction. [[?](https://en.wikipedia.org/wiki/Prediction_by_partial_matching)]
`Copy`      | Without compression algorithm.

#### Available compression levels

Value | Description
------|------------
 `0`  | None
 `1`  | Fast
 `2`  | Low
 `3`  | Normal
 `4`  | High
 `5`  | Ultra (Maximum)

#### Available types of archive

Format      | Typically extension of file | +Methods                                                | Description
------------|-----------------------------|---------------------------------------------------------|-------------
`SevenZip`  | .7z                         | `Lzma`, `Lzma2`, `Ppmd`, `BZip2`, `Copy`                | Original format of the 7-Zip archiver. May contain one or more files/directories. May use different compression algorithms (`Lzma`/`Lzma2` is the most common). But it can't store filesystem permissions (Unix owner/group permissions etc.) [[?](https://en.wikipedia.org/wiki/7z)]
`Zip`       | .zip                        | `Deflate`, `Deflate64`, `BZip2`, `Lzma`, `Ppmd`, `Copy` | May contain one or more files/directories. May use different compression algorithms (Deflate is the most common). [[?](https://en.wikipedia.org/wiki/Zip_%28file_format%29)]
`GZip`      | .tar.gz or .tgz             | `Deflate`                                               | Based on the `Deflate` algorithm. To compress only single files. [[?](https://en.wikipedia.org/wiki/Gzip)]
`BZip2`     | .tar.bz2                    | `BZip2`                                                 | Based on the `BZip2` algorithm. To compress only single files. [[?](https://en.wikipedia.org/wiki/Bzip2)]
`Tar`       | .tar                        | `Copy`                                                  | For collecting many files into one archive file. Contains **uncompressed** byte streams of the files. [[?](https://en.wikipedia.org/wiki/Tar_%28computing%29)]
`XZ`        | .tar.xz or .txz             | `Lzma2`                                                 | Incorporates the `Lzma2` compression algorithm. Supports Unix-like file system metadata. [[?](https://en.wikipedia.org/wiki/Xz)]
 

## pack

Packing with 7-zip engine.

```java
#[7z pack]
```

### files

To compress selected files with default settings. 

The solution directory is path by default for all input & output files.

```java
void pack.files(object files, string output [, object except][, enum format, enum method, integer level])
```

Argument | Value by default
---------|-----------------
format   | `Zip`
method   | `Deflate`
level    | 3 (Normal)

Individual signatures:

```java
void pack.files(object files, string output)
```
```java
void pack.files(object files, string output, object except)
```
```java
void pack.files(object files, string output, enum format, enum method, integer level)
```
```java
void pack.files(object files, string output, object except, enum format, enum method, integer level)
```

Arguments:

* files - List of files as `{"f1", "path\*.dll", ..}`. May contain file mask.
* output - Archive name.
* except - List of files to exclude from input list. May contain file mask.
* format - Type of archive: `SevenZip`, `Zip`, `GZip`, `BZip2`, `Tar`, `XZ`
* method - Compression method: `Copy`, `Deflate`, `Deflate64`, `BZip2`, `Lzma`, `Lzma2`, `Ppmd`
* level - Compression level: 0 (None) to 5 (Maximum)

Samples:

```minid
#[7z pack.files({"IntelOCL.log", "IntelChipset.log"}, "ilog.7z")]
#[7z pack.files({"bin\gpp.exe", "bin\lib\*.dll"}, "gpp.7z", {"bin\lib\stub.dll"}, SevenZip, Lzma2, 4)]
#[7z pack.files({"C:\Intel\Logs\IntelAMT.log"}, "P:\s01\CodeAnalysisLog.xml"}, "D:\output.zip", Zip, Deflate, 2)]
```

```minid
#[7z pack.files({"bin\xscale.exe", "bin\libintl-8.dll"}, "xscale.tar", Tar, Copy, 0)]
#[7z pack.files({"xscale.tar"}, "xscale.tar.xz", XZ, Lzma2, 4)]
```

### directory

To compress selected directory with default settings.

```java
void pack.directory(string dir, string output [, enum format, enum method, integer level])
```

Individual signatures:

```java
void pack.directory(string dir, string output)
```
```java
void pack.directory(string dir, string output, enum format, enum method, integer level)
```

Arguments:

* dir - Path to directory for packing.
* output - Archive name.
* format - Type of archive: `SevenZip`, `Zip`, `GZip`, `BZip2`, `Tar`, `XZ`
* method - Compression method: `Copy`, `Deflate`, `Deflate64`, `BZip2`, `Lzma`, `Lzma2`, `Ppmd`
* level - Compression level: 0 (None) to 5 (Maximum)

Samples:

```minid
#[7z pack.directory("bin", "release.zip")]
#[7z pack.directory("D:\log", "log.7z", SevenZip, Lzma2, 4)]
```

## check

```java
#[7z check]
```

**Method:**

Verification data of archive. Returns true if no any errors for archive.

```java
boolean check(string file [, string pwd])
```

Individual signatures:

```java
boolean check(string file)
```
```java
boolean check(string file, string pwd)
```

Arguments:

* file - Archive for testing.
* pwd - Password of archive if requires.

Samples:

```minid
#[( !#[7z check("arch.tar.xz")] ){
    #[Build cancel = true]
}]
```

```minid
#[var arch = #[7z check("arch.tar.xz", "pass-123")]]
```

## unpack

**Method:**

Extract archive data.

```java
void unpack(string file [, string output][, boolean delete][, string pwd])
```

**Individual signatures**

Extract archive data into same directory:

```java
void unpack(string file)
```

Extract archive data into selected directory:

```java
void unpack(string file, string output)
```

Extract data from protected archive into selected directory:

```java
void unpack(string file, string output, string pwd)
```

Extract archive data into selected directory and delete it after extraction if needed:

```java
void unpack(string file, string output, boolean delete)
```

Extract data from protected archive into selected directory and delete it after extraction if needed:

```java
void unpack(string file, string output, boolean delete, string pwd)
```

Extract archive data into same directory and delete it after extraction if needed:

```java
void unpack(string file, boolean delete)
```

Extract data from protected archive into same directory and delete it after extraction if needed:

```java
void unpack(string file, boolean delete, string pwd)
```

Arguments:

* file - Archive for unpacking.
* output - Output path to unpacking archive data.
* delete - To delete archive after extraction if true.
* pwd - Password of archive.

Samples:

```minid
#[7z unpack("release.7z", true)]
```

```minid
#[7z unpack("xscale.zip", "D:\app\xscale", false, "pass-123")]
```

# References

* [7-zip engine](http://7-zip.org/)
* [SBE-Scripts]({{site.docp}}/Scripts/SBE-Scripts/)
    * [ConditionComponent]({{site.docp}}/Scripts/SBE-Scripts/Components/ConditionComponent/)
* [Examples & Features]({{site.docp}}/Examples/)
* Compression
    * Methods:
        * [Deflate](https://en.wikipedia.org/wiki/DEFLATE)
        * [Deflate64](https://en.wikipedia.org/wiki/DEFLATE#Deflate64.2FEnhanced_Deflate)
        * [BZip2](https://en.wikipedia.org/wiki/Bzip2)
        * [Lzma](https://en.wikipedia.org/wiki/LZMA)
        * [Lzma2](https://en.wikipedia.org/wiki/LZMA2)
        * [Ppmd](https://en.wikipedia.org/wiki/Prediction_by_partial_matching)
    * Formats:
        * [SevenZip](https://en.wikipedia.org/wiki/7z)
        * [Zip](https://en.wikipedia.org/wiki/Zip_%28file_format%29)
        * [GZip](https://en.wikipedia.org/wiki/Gzip)
        * [BZip2](https://en.wikipedia.org/wiki/Bzip2)
        * [Tar](https://en.wikipedia.org/wiki/Tar_%28computing%29)
        * [XZ](https://en.wikipedia.org/wiki/Xz)