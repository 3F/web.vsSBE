---
layout: doc
title: Tricks with strings
permalink: /doc/Features/Strings/Tricks/
---
## Tricks with strings

Some additional custom tricks of common operations with strings -> [Operations with strings](../)

{% assign infoData = "v0.12.6+ Allows evaluation of string arguments with MSBuild engine in File/Function/BuildComponent + some newer. You can also use the [MSBuildComponent](../../../Scripts/SBE-Scripts/Components/MSBuildComponent/) to force evaluation if still needed." %}

{% include elem/info %}

Did you know: v0.12.10+ has multiline support for MSBuild expressions via [MSBuildComponent]({{site.docp}}/Scripts/SBE-Scripts/Components/MSBuildComponent/):

```{{site.sbelang}}
#[$(
    [System.Math]::Exp('$(
        [MSBuild]::Multiply(
            $([System.Math]::Log(10)), 
            4
        ))'
    )
)]
```

Did you know: The [UserVariableComponent](../../../Scripts/SBE-Scripts/Components/UserVariableComponent/) allows the multiline mixed definition:

```{{site.sbelang}}
#[var arg = cd \"D:/tmp/\" 
dir
cd ..
dir]

#[var arg = $(arg.Replace("\r\n", " & "))]
```
The evaluated value of **arg** variable above will be as `cd \"D:/tmp/\"  & dir & cd .. & dir`

You can also automatically escape the `"` (double quotes), erase the first & last the newline symbols etc., for example:

```{{site.sbelang1}}
#[var arg = 
cd "D:/tmp/" 
dir
cd ..
dir
]
$(arg.Trim("\r\n").Replace('"', '\"').Replace("\r\n", " & "))
```

```{{site.sbelang1}}
#[var arg = 

cd "#[var pDir]bin/#[var cfg]/"
xcopy *.dll "#[var nupCIMdir]\bin" /Y/R/I
xcopy NLog.dll.nlog "#[var nupCIMdir]\bin" /Y/R/I

]

#[var arg = $(arg.Trim("\r\n").Replace('"', '\"').Replace("\r\n", " & "))]
#[File cmd("#[var arg]")]
```