---
layout: doc
title: DTEComponent
description: For work with EnvDTE.
permalink: /doc/Scripts/SBE-Scripts/Components/DTEComponent/
---
# DTEComponent

For work with EnvDTE 
(is an assembly-wrapped COM library containing the objects and members for Visual Studio core automation http://msdn.microsoft.com/en-us/library/EnvDTE.aspx)

## exec

DTE-command to execution

Syntax:

```java 

#[DTE exec: command(arg)]
```

Sample:

```java 

#[DTE exec: Build.SolutionPlatforms(x86)] 
#[DTE exec: Build.SolutionConfigurations(Debug_Exclude_Plugins_All)]
```

Note: Some commands should be available only under certain conditions, for example - some stop before some begin... etc.

## events

Operations with events.

### LastCommand

*available with v0.12+*

Last received command.

**Note:** Use our [Sniffer]({{site.docp}}/Events/CommandEvent/) to find any commands.

#### Guid

Scope for Command ID

Syntax:

```java 

string #[DTE events.LastCommand.Guid]
```

#### Id

Command ID

Syntax:

```java 

integer #[DTE events.LastCommand.Id]
```

#### CustomIn

Custom input parameters.

Syntax:

```java 

string #[DTE events.LastCommand.CustomIn]
```

#### CustomOut

Custom output parameters.

Syntax:

```java 

string #[DTE events.LastCommand.CustomOut]
```

#### Pre

Flag of the execution command - Before / After

Syntax:

```java 

boolean #[DTE events.LastCommand.Pre]
```