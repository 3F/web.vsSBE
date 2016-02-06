---
layout: doc
title: DTEComponent
description: For work with EnvDTE.
permalink: /doc/Scripts/SBE-Scripts/Components/DTEComponent/
---
# DTEComponent

For work with EnvDTE (Assembly-wrapped COM library containing the objects and members for Visual Studio core automation. http://msdn.microsoft.com/en-us/library/EnvDTE.aspx)

## exec

Execute the available command.

Syntax:

```{{site.sbelang1}}
#[DTE exec: command(arg)]
```

Sample:

```{{site.sbelang1}}
#[DTE exec: Build.SolutionPlatforms(x86)] 
#[DTE exec: Build.SolutionConfigurations(Debug_Exclude_Plugins_All)]
#[DTE exec: Build.Cancel]
```

**Note:** Some commands should be available only for specific context of your environment. For example the `Build.Cancel`, etc.

## events

Operations with events.

### LastCommand

*available with v0.12+*

The last received command.

**Note:** Use our [Sniffer]({{site.docp}}/Events/CommandEvent/) to find any commands.

#### Guid

Scope of Command ID

Syntax:

```{{site.sbelang1}}
string #[DTE events.LastCommand.Guid]
```

#### Id

Command ID

Syntax:

```{{site.sbelang1}}
integer #[DTE events.LastCommand.Id]
```

#### CustomIn

Custom input parameters.

Syntax:

```{{site.sbelang1}}
object #[DTE events.LastCommand.CustomIn]
```

#### CustomOut

Custom output parameters.

Syntax:

```{{site.sbelang1}}
object #[DTE events.LastCommand.CustomOut]
```

#### Pre

Flag of execution of the command - Before / After

Syntax:

```{{site.sbelang1}}
boolean #[DTE events.LastCommand.Pre]
```