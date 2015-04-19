# Work with external utilities

![Work with external utility](https://bytebucket.org/3F/vssolutionbuildevent/wiki/Resources/examples/ext_utility.png)

## Basic work

All basic modes such as a 'Files Mode', 'Interpreter Mode' can be used for work with any external utilities.

You can call what you want and you can redirect results from the output to any place. For example simple batch:

* [get changes between revisions](https://gist.github.com/3F/48dea90aae98ddb64d3a)
* [update revision with data from SCM - git](https://gist.github.com/3F/e0d88d4d5c90df1e9a96)
* [parsing of .html files and generating cshelp.h with C++ macro definitions](https://gist.github.com/3F/c98f172cf97f647c8470)

**However!** you can more... see below

## Extended work

If you need a complex work with data from any external tools or simply need a some features what are not available for [MSBuild](../Scripts_&_Commands/MSBuild) and for any existing component of [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts) core - you can use available things from [FileComponent](../Scripts_&_Commands/SBE-Scripts/Components/FileComponent) for work with executable files.

Of course all data from external utilities can be used for User-Variables or with Conditional statements and others for your complex scripts.

### Examples

*Please also note - [Convenience for single line arguments](Strings)*

#### Calculate sha1 for string with openssl

[openssl](https://www.openssl.org/docs/apps/openssl.html)

* Sha1 for 'Hello World!'
```
#!java

#[File cmd("echo 'Hello World!'| openssl sha1 | sed 's/^.*\s//'")]
```
Result: `41956c7422fd4f2f8796ccf063a45ab5825372af`

* Sha1 for current time:

```
#!java

#[var utcnow = $([System.DateTime]::UtcNow.Ticks)]
#[File cmd("echo '#[var utcnow]'| openssl sha1 | sed 's/^.*\s//'")]
```
Result: `47c14be77bc0a13a0454e1ad2e9a642549f467fc`


#### Version number of package from NuGet server

NuGet command line tool - [nuget.exe](https://www.nuget.org/nuget.exe) ([documentation](http://docs.nuget.org/Consume/Command-Line-Reference))

for example:
```
#!java

#[File cmd("nuget list Moq | grep -e \"^Moq \"", 30)]
```
Result: `Moq 4.2.1502.0911`

* Next patch number for latest package, for example:
```
#!java

$([MSBuild]::Add(#[File sout("cmd", "/C .nuget\nuget.exe list vsSBE.CI.MSBuild | grep 'vsSBE.CI.MSBuild' | sed -r 's/^.*\s[0-9]+\.[0-9]+\.//'", 30)], 1))
```
Result: `1.0.5` -> `1.0.6`

#### Packing files. Archive of binaries files from projects.

For packing you can use free [7za](http://sourceforge.net/projects/sevenzip/files/7-Zip/9.20/7za920.zip/download) archiver ([7-Zip Command line version](http://www.7-zip.org)) or similar...

How to work with [7-zip](http://www.7-zip.org) you can see in '[Artefacts](../Examples/Artefacts)' as a complete solutions.


# References

* [Operations with strings](Strings)
* [MSBuild](../Scripts_&_Commands/MSBuild)
* [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts)
* * [FileComponent](../Scripts_&_Commands/SBE-Scripts/Components/FileComponent)
* [Examples & Features](../Examples)