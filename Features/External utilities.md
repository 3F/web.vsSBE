# Work with external utilities

![Work with external utility](https://bytebucket.org/3F/vssolutionbuildevent/wiki/Resources/examples/ext_utility.png)

If needed a some additional external tool or if need a some features what are not available for [MSBuild](../Scripts_&_Commands/MSBuild) & any existing component of [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts) core - you can use functions for work with executable files from [FileComponent](../Scripts_&_Commands/SBE-Scripts/Components/FileComponent).

## Examples

*Please also note - [Convenience for single line arguments](Strings)*

### Calculate sha1 for string with openssl

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


### Version number of package from NuGet server

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

# References

* [Operations with strings](Strings)
* [MSBuild](../Scripts_&_Commands/MSBuild)
* [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts)
* * [FileComponent](../Scripts_&_Commands/SBE-Scripts/Components/FileComponent)
* [Examples & Features](../Examples)

