---
layout: doc
title: Operations with strings
permalink: /doc/Features/Strings/
---
# Operations with strings

*Should be enabled the [MSBuild](../../Scripts/MSBuild/) support at least.*

In examples below, we use the [MSBuild Property Functions](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_PropertyFunctions) and you can use any static method or property of these system classes:

* [System.String](https://msdn.microsoft.com/en-us/library/system.string_methods%28v=vs.100%29.aspx)
* [System.StringComparer](https://msdn.microsoft.com/en-us/library/system.stringcomparer_methods%28v=vs.100%29.aspx)
* [System.Char](https://msdn.microsoft.com/en-us/library/system.char_methods%28v=vs.100%29.aspx)
* [System.Convert](https://msdn.microsoft.com/en-us/library/system.convert_methods%28v=vs.100%29.aspx)
* [System.Enum](https://msdn.microsoft.com/en-us/library/system.enum_methods%28v=vs.100%29.aspx)
* [...](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_Static)

{% assign infoData = "v0.12.6+ Now allows evaluation of string arguments with MSBuild engine in File/Function/BuildComponent + some newer. You can also use the [MSBuildComponent](../../Scripts/SBE-Scripts/Components/MSBuildComponent/) to force evaluation if still needed." %}

## Remove newline characters and other problematic symbols

Some your results may contain a some problematic characters for different functions. In most cases this applies to [MSBuild Property Functions](../../Scripts/MSBuild/).

You can use [System.String](https://msdn.microsoft.com/en-us/library/system.string_methods%28v=vs.100%29.aspx) static methods if you can't manually change your data.

For example:

```{{site.msblang}}
$(cs.Replace("\r\n", ""))
```

or with different combination CR/LF ([Newline - representations](http://en.wikipedia.org/wiki/Newline#Representations))

```{{site.msblang}}
$(cs.Replace("\r", "").Replace("\n", ""))
```


So, if you have a multiline value in your variable **projectRev**:

```{{site.sbelang1}}
#[var cs = Version is a %ver% !] 

#[var projectRev = v1.2
debug 
rev321]
```

you can use the Replace() method for changing on any compatible sequence, e.g.:

```{{site.sbelang}}
#[var projectRev = $(projectRev.Replace("\r\n", " :: "))]
#[var cs = $(cs.Replace("%ver%", "#[var projectRev]"))]
```

or as variant:

```{{site.sbelang}}
#[var cs = $(cs.Replace("%ver%", $(projectRev.Replace("\r\n", " :: "))))]
```
and similar...

note:

* escape \\\r \\\n if need
* use `\x00 - \xFF` for other chars


as result we have:

```{{site.sbelang1}}
Version is a v1.2 :: debug  :: rev321 !
```

## Escape-Sequences

You can use available escape-sequence in [SBE-Scripts](../../Scripts/SBE-Scripts/) & [MSBuild](../../Scripts/MSBuild/) cores, for example:

```{{site.msblang}}
$([System.String]::Concat("\r\n"))
```

```{{site.msblang}}
$(ver = "1.2.3")
$([System.String]::Format("\t version is a {0}", $(ver)))
```

### What's available ?

Currently used a strictly limited set:

* [hexadecimal-escape-sequence](https://msdn.microsoft.com/en-us/library/aa691087%28v=vs.71%29.aspx): `\x   0-0xF  [0-0xF  [0-0xF  [0-0xF]]]`
* [unicode-escape-sequence](https://msdn.microsoft.com/en-us/library/aa664669%28v=vs.71%29.aspx): 
    * `\u   0-0xF  0-0xF  0-0xF  0-0xF` 
    * `\U   0-0xF  0-0xF  0-0xF  0-0xF  0-0xF  0-0xF  0-0xF  0-0xF`
* basic: `\r \n \t \v \a \b \0 \f`

## Tricks for the longest string arguments

{% include elem/info %}

If you want to pass a long string as argument for some function or method, for example:

```{{site.sbelang1}}
#[File sout("cmd", "/C cd \"#[var pDir]bin/#[var cfg]/\" & xcopy *.dll \"#[var nupCIMdir]\bin\" /Y/R/I & xcopy NLog.dll.nlog \"#[var nupCIMdir]\bin\" /Y/R/I")]
```

You can for example:

* Use the User-Variables for splitting the logic:
    * With [MSBuild](../../Scripts/MSBuild/) core
    * With [UserVariableComponent](../../Scripts/SBE-Scripts/Components/UserVariableComponent/) ([SBE-Scripts](../../Scripts/SBE-Scripts/) core)

The [UserVariableComponent](../../Scripts/SBE-Scripts/Components/UserVariableComponent/) is  more useful because for current component allowed the multiline mixed definition and therefore you can for example:

```{{site.sbelang}}
#[var arg = cd \"D:/tmp/\" 
dir
cd ..
dir]

#[var arg = $(arg.Replace("\r\n", " & "))]
```
Evaluated value for **arg** variable above should be as `cd \"D:/tmp/\"  & dir & cd .. & dir`

You can also automatically escape the '"' (double quotes), erase the first & last the newline symbols etc.:

```{{site.sbelang1}}
#[var arg = 
cd "D:/tmp/" 
dir
cd ..
dir
]
$(arg.Trim("\r\n").Replace('"', '\"').Replace("\r\n", " & "))
```

Therefore the long single line from example above also can be as:

```{{site.sbelang}}
#[var arg = 

cd \"#[var pDir]bin/#[var cfg]/\"
xcopy *.dll \"#[var nupCIMdir]\bin\" /Y/R/I
xcopy NLog.dll.nlog \"#[var nupCIMdir]\bin\" /Y/R/I

]

#[var arg = $(arg.Trim("\r\n").Replace("\r\n", " & "))]
#[File sout("cmd", "/C  #[var arg]")]
```

also with [cmd](../../Scripts/SBE-Scripts/Components/FileComponent/) alias it can be as:

```{{site.sbelang1}}
#[var arg = 

cd "#[var pDir]bin/#[var cfg]/"
xcopy *.dll "#[var nupCIMdir]\bin" /Y/R/I
xcopy NLog.dll.nlog "#[var nupCIMdir]\bin" /Y/R/I

]

#[var arg = $(arg.Trim("\r\n").Replace('"', '\"').Replace("\r\n", " & "))]
#[File cmd("#[var arg]")]
```
and similar..

## Dynamic evaluation with both engines MSBuild & SBE-Scripts

Not all values from strings may be automatically evaluated beetween different engines.

*You also should remeber [behaviour of strings for User-variables in MSBuild core](../../Scripts/MSBuild/#user-variables-for-msbuild-core)*

{% include elem/info %}

For example:

```{{site.sbelang1}}
#[Func hash.SHA1("$([System.Guid]::NewGuid())")]
```

For line above:

* Will be (v0.12.5 or less) **always** value - `2A2C9B690E475D713B35BD1FB8A1AB7F214121C6`, **because** the SHA1 method has looked first argument 'as is' - `$([System.Guid]::NewGuid())`

The result above is not correct **if** you want evaluate this `$([System.Guid]::NewGuid())`.

To force evaluation of similar, you should for example, use throught [variable with this engine](../../Scripts/SBE-Scripts/Components/UserVariableComponent/):

```{{site.sbelang1}}
#[var myvar = $([System.Guid]::NewGuid())]
...
#[Func hash.SHA1("#[var myvar]")]
```

compact variant, may be:

```{{site.sbelang1}}
#[Func hash.SHA1("#[var _=$([System.Guid]::NewGuid())]#[var _]")]
```

and similar..

### Whitespaces from all script results

Use [variables](../../Scripts/SBE-Scripts/Components/UserVariableComponent/) as main container to avoid any spaces if needed.

```{{site.sbelang1}}
#[var name = 

    ... all of what you want ...
]
```

Example:

```{{site.sbelang}}
#[var nul = 

    #["
        Basic example
    "]
    #[var v = v1.2.3]
    #[var log = $(TMP)/v.txt]
    
    #[($(Configuration) ~= Deb || true)
    {
        #[var tStart    = $([System.DateTime]::Parse("2015/10/01").ToBinary())]
        #[var tNow      = $([System.DateTime]::UtcNow.Ticks)]
        #[var revBuild  = $([System.TimeSpan]::FromTicks($([MSBuild]::Subtract(#[var tNow], #[var tStart]))).TotalMinutes.ToString("0"))]
        #[var v         = #[var v].$([MSBuild]::Modulo(#[var revBuild], $([System.Math]::Pow(2, 14))))]
    }]
    
    #[var v = $([System.String]::Format("v{0}\r\n\t", $(v)))]
    #[File write("#[var log]"):> Example #[var v] Generated by vsSolutionBuildEvent]
    #[IO scall("notepad", "#[var log]")]
    
    $(n = $([System.Math]::Exp( $([MSBuild]::Multiply('$([System.Math]::Log(2))', 16).ToString().Replace(',', '.')) ).ToString("0")))

]$(n)
```

# References

* [MSBuild](../../Scripts/MSBuild/)
* [SBE-Scripts](../../Scripts/SBE-Scripts/)
* [Examples & Features](../../Examples/)

