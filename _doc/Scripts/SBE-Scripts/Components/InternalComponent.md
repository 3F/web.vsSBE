---
layout: doc
title: InternalComponent
description: All internal operations with vsSBE.
permalink: /doc/Scripts/SBE-Scripts/Components/InternalComponent/
---
# InternalComponent

All internal operations with vsSolutionBuildEvent.

## Entry point for component

The vsSolutionBuildEvent requires the following name for all internal operations:

* `vsSBE` or alias `Core` (v0.12.5+)

Samples:

```{{site.sbelang1}}
#[vsSBE ...]
```

```{{site.sbelang1}}
#[Core ...]
```

## events

Available event types:

```text
Pre, Post, Cancel, CommandEvent, Warnings, Errors, OWP, SlnOpened, SlnClosed, Transmitter, Logging
```

Syntax:

```{{site.sbelang1}}
#[vsSBE events.Type.item(string name)]
```

```{{site.sbelang1}}
#[vsSBE events.Type.item(integer index)]
```

Arguments:

* name  - Full name of action.
* index - Index number of action from list. Range: 1 - n.

Sample:

```{{site.sbelang1}}
#[vsSBE events.Pre.item("Act1")]
#[vsSBE events.Pre.item(1)]
```

### Enabled

Gets or Sets 'Enabled' status for selected action.

Syntax:

```{{site.sbelang1}}
boolean events.Pre.item(index | name).Enabled [= boolean]
```

```{{site.sbelang1}}
#[vsSBE events.Pre.item("Act1").Enabled]
#[vsSBE events.Post.item(4).Enabled = false]
```

### run

To Execute Action with specific context. Returns true value if it was handled.

Syntax:

```{{site.sbelang}}
boolean events.Pre.item(index | name).run([enum context])
```

Where:

* *optional* **context** - Any available from [BuildType](https://github.com/3F/vsSolutionBuildEvent/blob/master/Bridge/BuildType.cs), like: `Common`, `Clean`, `After`, `Compile` ...
    * `Common` is used by default.

Sample:

```{{site.sbelang}}
#[Core events.Pre.item("SpecBuild").run()]
#[Core events.Pre.item(5).run(Build)]
```

### Status

Available states for selected action.

#### HasErrors

Checking of existence of errors after executed action for selected event.

Syntax:

```{{site.sbelang1}}
boolean #[vsSBE events.Pre.item("Act1").Status.HasErrors]
```

Sample:

```{{site.sbelang}}
#[( #[vsSBE events.Pre.item("Act1").Enabled] && !#[vsSBE events.Pre.item("Act1").Status.HasErrors] )
{
    #[Build projects.find("zlib").IsBuildable = false]
}]
```

### stdout

v0.12.7+

Get data from stdout for action which is executed asynchronously.

Syntax:

```{{site.sbelang1}}
string events.Pre.item(integer index | string name).stdout
```

Samples:

```{{site.sbelang}}
#[var sres = #[Core events.Pre.item(1).stdout]]
#[( $(sres.Length) > 0 ){
    #[OWP item("stdout").writeLine(true): #[var sres]]
}]
```
```{{site.sbelang}}
#[var sres = <#data>#[Core events.Cancel.item("ActData").stdout]</#data>]
#[( $(sres.Length) > 0 ){
    #[OWP item("stdout").writeLine(true): #[var sres]]
}]
```

### stderr

v0.12.7+

Get data from stderr for action which is executed asynchronously.

Syntax:

```{{site.sbelang1}}
string events.Pre.item(integer index | string name).stderr
```

Samples:

```{{site.sbelang}}
#[var res = $(res)#[Core events.Post.item(1).stderr]]
```

## StartUpProject

[v0.12.8+]

To get/set the project by default or "StartUp Project".

Syntax:

```{{site.sbelang1}}
string StartUpProject [= string]
```

**note:** use full string as it presented in .sln file, for example:

```xml
Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "ConsoleApplication1", "ConsoleApplication1\ConsoleApplication1.csproj", "{94C2EB4A-A5BF-4E78-8D2E-EE15A9D939BE}"
```

The correct value will be `ConsoleApplication1\ConsoleApplication1.csproj`

Samples:

```{{site.sbelang}}
#[Core StartUpProject = "ConsoleApplication1\ConsoleApplication1.csproj"]
#[Core StartUpProject = TestDllMain\TestDllMain.csproj]
```

```{{site.sbelang}}
#[( #[Core StartUpProject] ~= "DllMain" ){
    ...
}]
```

Examples:

```{{site.sbelang}}
$(pdir      = "$(ProjectDir)")              \ConsoleApplication1\ConsoleApplication1
$(pdirDM    = "$(ProjectDir:DllMain)")      \ConsoleApplication1\DllMain

...
#[Core StartUpProject = "DllMain\DllMain.csproj"]
...

$(pdir = "$(ProjectDir)")                   \ConsoleApplication1\DllMain
```

To reset behavior:

```{{site.sbelang}}
#[Core StartUpProject = ""]
or
#[Core StartUpProject =]
```