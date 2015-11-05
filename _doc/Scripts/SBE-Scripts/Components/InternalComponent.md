---
layout: doc
title: InternalComponent
description: All internal operations with vsSBE.
permalink: /doc/Scripts/SBE-Scripts/Components/InternalComponent/
---
# InternalComponent

All internal operations with vsSolutionBuildEvent.

## Entry point for component

The vsSolutionBuildEvent requires the next name for all internal operations:

* `vsSBE` or alias `Core` (v0.12.5+)

Samples:

```java
#[vsSBE ...]
```

```java
#[Core ...]
```

## events

For work with events.

Available event types:

```text 

Pre, Post, Cancel, CommandEvent, Warnings, Errors, OWP, Transmitter, Logging
```

Syntax:

```java 

#[vsSBE events.Type.item(string name)]
```

```java 

#[vsSBE events.Type.item(integer index)]
```

Arguments:

* name  - Full name of action.
* index - Index number of action from list. Range: 1 - n.

Sample:

```java
 #[vsSBE events.Pre.item("Act1")]
 #[vsSBE events.Pre.item(1)]
```

### Enabled

Gets or Sets 'Enabled' status for selected event.

Syntax:

```java 

 boolean #[vsSBE events.Pre.item("Act1").Enabled = false|true|0|1]
```

```java
#[vsSBE events.Pre.item("Act1").Enabled]
#[vsSBE events.Pre.item("Act1").Enabled = false]
```

### Status ###

Available statuses for selected event.

#### HasErrors ####

Checking of existence of errors after executed action for selected event.

Syntax:

```java 

boolean #[vsSBE events.Pre.item("Act1").Status.HasErrors]
```

Sample:

```java 

#[( #[vsSBE events.Pre.item("Act1").Enabled] && !#[vsSBE events.Pre.item("Act1").Status.HasErrors] )
{
    #[Build projects.find("zlib").IsBuildable = false]
}]
```
